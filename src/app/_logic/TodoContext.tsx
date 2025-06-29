'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { sendEmailNotification } from '@/app/_utils/lineNotify'

// Types
export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  category: string
}

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  sortBy: 'dueDate' | 'priority' | 'createdAt'
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_SORT'; payload: 'dueDate' | 'priority' | 'createdAt' }
  | { type: 'LOAD_TODOS'; payload: Todo[] }

interface TodoContextType {
  state: TodoState
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  editTodo: (id: string, updates: Partial<Todo>) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  setSortBy: (sortBy: 'dueDate' | 'priority' | 'createdAt') => void
  filteredTodos: Todo[]
}

// Reducer
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      return {
        ...state,
        todos: [...state.todos, newTodo],
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates }
            : todo
        ),
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload,
      }
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload,
      }
    default:
      return state
  }
}

// Initial state
const initialState: TodoState = {
  todos: [],
  filter: 'all',
  sortBy: 'dueDate',
}

// Context
const TodoContext = createContext<TodoContextType | undefined>(undefined)

// Provider
export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        const todos = JSON.parse(savedTodos)
        dispatch({ type: 'LOAD_TODOS', payload: todos })
      } catch (error) {
        console.error('Error loading todos from localStorage:', error)
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state.todos])

  // Actions
  const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_TODO', payload: todo })
    
    // สร้าง Todo object สำหรับ email notification
    const newTodoForNotification: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    
    // ส่ง email notification (ไม่รอผลลัพธ์เพื่อไม่ให้ UI หน่วง)
    try {
      sendEmailNotification(newTodoForNotification).catch((error: unknown) => {
        console.warn('Failed to send email notification:', error)
      })
    } catch (error) {
      console.warn('Error preparing email notification:', error)
    }
  }

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const editTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, updates } })
  }

  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  const setSortBy = (sortBy: 'dueDate' | 'priority' | 'createdAt') => {
    dispatch({ type: 'SET_SORT', payload: sortBy })
  }

  // Filtered and sorted todos
  const filteredTodos = React.useMemo(() => {
    let filtered = state.todos
    
    // Apply filter
    switch (state.filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed)
        break
      case 'completed':
        filtered = filtered.filter(todo => todo.completed)
        break
      default:
        break
    }

    // Apply sort
    return filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })
  }, [state.todos, state.filter, state.sortBy])

  const value: TodoContextType = {
    state,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    setSortBy,
    filteredTodos,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

// Hook
export function useTodos() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}
