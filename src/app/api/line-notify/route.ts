import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { subject, message, todoData } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const {
      GMAIL_EMAIL,
      GMAIL_APP_PASSWORD,
      NOTIFICATION_EMAIL
    } = process.env
    
    if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
      console.warn('Gmail SMTP credentials not configured')
      return NextResponse.json(
        { error: 'Email notification not configured' },
        { status: 500 }
      )
    }

    // สร้าง transporter สำหรับ Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
    })

    // ปลายทางอีเมล (ถ้าไม่กำหนดใช้อีเมลเดียวกันกับผู้ส่ง)
    const recipientEmail = NOTIFICATION_EMAIL || GMAIL_EMAIL

    // สร้าง HTML template สำหรับอีเมล
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 15px; margin-bottom: 20px; }
          .content { color: #555; line-height: 1.6; }
          .todo-item { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px; padding: 15px; margin: 15px 0; }
          .priority-high { border-left: 4px solid #dc3545; }
          .priority-medium { border-left: 4px solid #ffc107; }
          .priority-low { border-left: 4px solid #28a745; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 Todo List Notification</h1>
          </div>
          <div class="content">
            <p>มีงานใหม่เพิ่มเข้ามาแล้ว!</p>
            ${todoData ? `
              <div class="todo-item priority-${todoData.priority}">
                <h3>📋 ${todoData.title}</h3>
                ${todoData.description ? `<p><strong>📄 คำอธิบาย:</strong> ${todoData.description}</p>` : ''}
                <p><strong>📂 หมวดหมู่:</strong> ${todoData.category}</p>
                <p><strong>⚡ ความสำคัญ:</strong> ${todoData.priority === 'high' ? '🔴 สูง' : todoData.priority === 'medium' ? '🟡 ปานกลาง' : '🟢 ต่ำ'}</p>
                ${todoData.dueDate ? `<p><strong>📅 กำหนดเสร็จ:</strong> ${new Date(todoData.dueDate).toLocaleDateString('th-TH')}</p>` : ''}
                <p><strong>🕐 เพิ่มเมื่อ:</strong> ${new Date().toLocaleString('th-TH')}</p>
              </div>
            ` : `<p>${message}</p>`}
          </div>
          <div class="footer">
            <p>📱 Todo List App Notification System</p>
            <p>✨ สู้ๆ นะครับ!</p>
          </div>
        </div>
      </body>
      </html>
    `

    // ส่งอีเมล
    const mailOptions = {
      from: `"Todo List App" <${GMAIL_EMAIL}>`,
      to: recipientEmail,
      subject: subject || '📝 งานใหม่เพิ่มแล้ว - Todo List',
      text: message,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json({ 
      success: true, 
      message: 'Email notification sent successfully',
      messageId: info.messageId
    })

  } catch (error) {
    console.error('Email notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send email notification' },
      { status: 500 }
    )
  }
}
