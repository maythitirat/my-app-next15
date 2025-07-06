'use client'

import { useState } from 'react'
import { useTodos } from '@/app/_logic/TodoContext'

export default function TodoForm() {
  const { addTodo } = useTodos()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('งานทั่วไป')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('กรุณาใส่ชื่องาน')
      return
    }

    setIsSubmitting(true)

    try {
      await addTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        category,
        completed: false,
      })

      // Reset form
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
      setCategory('งานทั่วไป')
    } catch (error) {
      console.error('Error adding todo:', error)
      alert('เกิดข้อผิดพลาดในการเพิ่มงาน')
    } finally {
      setIsSubmitting(false)
    }
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

  const priorityColors = {
    low: 'text-gray-600 border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300',
    medium: 'text-gray-800 border-gray-400 bg-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200',
    high: 'text-black border-gray-500 bg-gray-300 dark:bg-gray-500 dark:border-gray-400 dark:text-white'
  }

  const priorityLabels = {
    low: '⚪ ต่ำ',
    medium: '⚫ ปานกลาง',
    high: '⬛ สูง'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ชื่องาน *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="เช่น: ทำรายงานประจำเดือน"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          รายละเอียด
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          หมวดหมู่
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          ความสำคัญ
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(priorityLabels) as [keyof typeof priorityLabels, string][]).map(([value, label]) => (
            <label
              key={value}
              className={`cursor-pointer p-2 text-center text-sm font-medium border-2 rounded-lg transition-all ${
                priority === value
                  ? priorityColors[value]
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-600 dark:text-gray-400'
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={value}
                checked={priority === value}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          กำหนดเสร็จ
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
            : 'bg-gray-800 hover:bg-black text-white dark:bg-gray-600 dark:hover:bg-gray-500'
        }`}
      >
        {isSubmitting ? '⏳ กำลังเพิ่ม...' : '➕ เพิ่มงาน'}
      </button>
    </form>
  )
}
