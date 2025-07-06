'use client'

import { useState } from 'react'
import { useTodos } from '@/app/_logic/TodoContext'
import TodoItem from '@/app/components/TodoItem'

export default function TodoList() {
  const { state, filteredTodos, setFilter, setSortBy } = useTodos()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter todos by search term
  const searchFilteredTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    todo.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalTodos = state.todos.length
  const completedTodos = state.todos.filter(todo => todo.completed).length
  const activeTodos = totalTodos - completedTodos

  const filterButtons = [
    { key: 'all', label: 'ทั้งหมด', count: totalTodos },
    { key: 'active', label: 'รอทำ', count: activeTodos },
    { key: 'completed', label: 'เสร็จแล้ว', count: completedTodos },
  ] as const

  const sortOptions = [
    { key: 'dueDate', label: 'กำหนดเสร็จ' },
    { key: 'priority', label: 'ความสำคัญ' },
    { key: 'createdAt', label: 'วันที่สร้าง' },
  ] as const

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder="ค้นหางาน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {filterButtons.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  state.filter === key
                    ? 'bg-gray-800 text-white dark:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">เรียงตาม:</span>
            <select
              value={state.sortBy}
              onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority' | 'createdAt')}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {sortOptions.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      {totalTodos > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">📊</span>
              <span className="text-gray-700 dark:text-gray-300">
                ความคืบหน้า: {completedTodos}/{totalTodos} ({Math.round((completedTodos / totalTodos) * 100)}%)
              </span>
            </div>
            {activeTodos > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">⏰</span>
                <span className="text-gray-700 dark:text-gray-300">
                  เหลือ {activeTodos} งาน
                </span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-gray-800 dark:bg-gray-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-2">
        {searchFilteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {totalTodos === 0 ? (
              <div>
                <div className="text-4xl mb-2">📝</div>
                <p>ยังไม่มีงานในรายการ</p>
                <p className="text-sm mt-1">เริ่มต้นโดยการเพิ่มงานใหม่</p>
              </div>
            ) : searchTerm ? (
              <div>
                <div className="text-4xl mb-2">🔍</div>
                <p>ไม่พบงานที่ตรงกับการค้นหา &quot;{searchTerm}&quot;</p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">✅</div>
                <p>ไม่มีงานในหมวดหมู่นี้</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {searchFilteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {totalTodos > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p>
            แสดง {searchFilteredTodos.length} จาก {totalTodos} งาน
            {searchTerm && ` • ค้นหา: "${searchTerm}"`}
          </p>
        </div>
      )}
    </div>
  )
}
