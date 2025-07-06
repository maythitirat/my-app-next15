'use client'

import { useState } from 'react'
import { useTodos, Todo } from '@/app/_logic/TodoContext'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, editTodo } = useTodos()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '')
  const [editCategory, setEditCategory] = useState(todo.category)

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert('กรุณาใส่ชื่องาน')
      return
    }

    editTodo(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: editDueDate || undefined,
      category: editCategory,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate || '')
    setEditCategory(todo.category)
    setIsEditing(false)
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    medium: 'bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500',
    high: 'bg-gray-300 text-black border-gray-400 dark:bg-gray-500 dark:text-white dark:border-gray-400'
  }

  const priorityLabels = {
    low: '⚪ ต่ำ',
    medium: '⚫ ปานกลาง',
    high: '⬛ สูง'
  }

  const categories = [
    'งานทั่วไป',
    'งานบ้าน',
    'งานเร่งด่วน',
    'การเรียน',
    'สุขภาพ',
    'การออกกำลังกาย',
    'ครอบครัว',
    'งานอดิเรก',
    'อื่นๆ'
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const diffTime = todoDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'วันนี้'
    if (diffDays === 1) return 'พรุ่งนี้'
    if (diffDays === -1) return 'เมื่อวาน'
    if (diffDays < 0) return `เลยมา ${Math.abs(diffDays)} วัน`
    if (diffDays <= 7) return `อีก ${diffDays} วัน`

    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="space-y-3">
          {/* Edit Title */}
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="ชื่องาน"
          />

          {/* Edit Description */}
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
            placeholder="รายละเอียด"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Edit Category */}
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Edit Priority */}
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {Object.entries(priorityLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {/* Edit Due Date */}
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
            >
              ✅ บันทึก
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
            >
              ❌ ยกเลิก
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border ${
      isOverdue ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
    } p-4 shadow-sm transition-all hover:shadow-md ${
      todo.completed ? 'opacity-70' : ''
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400 dark:border-gray-600'
          }`}
        >
          {todo.completed && '✓'}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Actions */}
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium ${
              todo.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {todo.title}
            </h3>

            {/* Action Buttons */}
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="แก้ไข"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  if (confirm('ต้องการลบงานนี้หรือไม่?')) {
                    deleteTodo(todo.id)
                  }
                }}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="ลบ"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* Description */}
          {todo.description && (
            <p className={`text-sm mt-1 ${
              todo.completed
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {todo.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Category */}
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300">
              📁 {todo.category}
            </span>

            {/* Priority */}
            <span className={`inline-block px-2 py-1 text-xs rounded-full border ${priorityColors[todo.priority]}`}>
              {priorityLabels[todo.priority]}
            </span>

            {/* Due Date */}
            {todo.dueDate && (
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                isOverdue
                  ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
              }`}>
                📅 {formatDate(todo.dueDate)}
                {isOverdue && ' ⚠️'}
              </span>
            )}

            {/* Created Date */}
            <span className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-full dark:bg-gray-800 dark:text-gray-400">
              สร้าง: {new Date(todo.createdAt).toLocaleDateString('th-TH')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
