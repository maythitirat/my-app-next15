export interface Todo {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  category: string
  completed: boolean
  createdAt: string
}

export async function sendEmailNotification(todo: Todo): Promise<boolean> {
  try {
    const subject = '📝 งานใหม่เพิ่มแล้ว - Todo List'
    const message = formatTodoForEmailNotification(todo)
    
    const response = await fetch('/api/line-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        subject,
        message,
        todoData: todo
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Failed to send email notification:', error)
      return false
    }

    console.log('Email notification sent successfully')
    return true
  } catch (error) {
    console.error('Error sending email notification:', error)
    return false
  }
}

export function formatTodoForEmailNotification(todo: Todo): string {
  const priorityText = {
    high: '🔴 สูง',
    medium: '🟡 ปานกลาง', 
    low: '🟢 ต่ำ'
  }

  let message = `📝 งานใหม่เพิ่มแล้ว!\n\n`
  message += `📋 ${todo.title}\n`
  
  if (todo.description) {
    message += `📄 คำอธิบาย: ${todo.description}\n`
  }
  
  message += `📂 หมวดหมู่: ${todo.category}\n`
  message += `⚡ ความสำคัญ: ${priorityText[todo.priority]}\n`
  
  if (todo.dueDate) {
    const dueDateFormatted = new Date(todo.dueDate).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    message += `📅 กำหนดเสร็จ: ${dueDateFormatted}\n`
  }
  
  message += `🕐 เพิ่มเมื่อ: ${new Date().toLocaleString('th-TH')}\n`
  message += `\n✨ สู้ๆ นะครับ!`
  
  return message
}

// For backward compatibility (ถ้ามี code อื่นใช้อยู่)
export const sendLineNotification = sendEmailNotification
export const formatTodoForLineNotification = formatTodoForEmailNotification
