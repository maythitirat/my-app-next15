# 🎉 Todo List + Gmail SMTP Email Notification Integration

ระบบ Todo List ที่มีการแจ้งเตือนผ่าน Gmail email พร้อมใช้งานแล้ว!

## ✨ คุณสมบัติ

### 📋 Todo List
- ✅ เพิ่ม/ลบ/แก้ไข/ทำเครื่องหมายเสร็จสิ้น
- 🏷️ หมวดหมู่งาน (งานทั่วไป, งานบ้าน, การเรียน, ฯลฯ)
- ⚡ ระดับความสำคัญ (สูง, ปานกลาง, ต่ำ)
- 📅 กำหนดวันที่เสร็จ
- 🔍 กรอง/จัดเรียงงาน
- 💾 บันทึกข้อมูลใน localStorage

### � Gmail SMTP Email Notification (ฟรี!)
- � ส่งอีเมลแจ้งเตือนไปที่ Gmail เมื่อเพิ่มงานใหม่
- 🎨 รูปแบบอีเมล HTML สวยงาม พร้อมรายละเอียดงานครบถ้วน
- 📱 รองรับการแสดงผลใน mobile
- 🆓 ใช้งานฟรี 100% (ผ่าน Gmail SMTP)
- ⚙️ หน้าตั้งค่าและทดสอบการเชื่อมต่อ
- 📊 500 อีเมลต่อวันสำหรับ Gmail ฟรี

### 🔐 Authentication
- 🔑 NextAuth.js สำหรับ login/logout
- 👤 Mock users สำหรับทดสอบ
- 🔒 Protected routes ด้วย middleware

## 🚀 วิธีใช้งาน

### 1. เริ่มต้นใช้งาน
```bash
npm run dev
```

### 2. เข้าสู่ระบบ
- ไปที่ http://localhost:3000/authentication
- ใช้ demo credentials:
  - Admin: admin@example.com / password
  - User: user@example.com / password
  - Test: test@test.com / test

### 3. ใช้งาน Todo List
- ไปที่ http://localhost:3000/todos
- เพิ่มงานใหม่ได้ทันที (บันทึกใน localStorage)

### 4. ตั้งค่า Gmail SMTP (เพื่อรับแจ้งเตือน)
- ไปที่ http://localhost:3000/line-notify
- ทำตามคู่มือในหน้านั้น:
  1. เปิดใช้งาน 2-Step Verification ใน Google Account
  2. สร้าง App Password ที่ https://myaccount.google.com/apppasswords
  3. Copy App Password (16 ตัวอักษร) ใส่ในไฟล์ .env.local:
     ```
     GMAIL_EMAIL=your_email@gmail.com
     GMAIL_APP_PASSWORD=your_16_character_app_password
     NOTIFICATION_EMAIL=recipient@gmail.com
     ```
  4. Restart server และทดสอบการเชื่อมต่อ

## 📁 ไฟล์สำคัญ

### Email Notification System
- `/src/app/api/line-notify/route.ts` - API endpoint สำหรับส่งอีเมล (ใช้ nodemailer)
- `/src/app/_utils/lineNotify.ts` - Utility functions และ email formatting
- `/src/app/line-notify/page.tsx` - หน้าตั้งค่าและทดสอบ Gmail SMTP

### Todo System  
- `/src/app/todos/page.tsx` - หน้าหลัก Todo List
- `/src/app/components/TodoForm.tsx` - Form สำหรับเพิ่มงานใหม่
- `/src/app/components/TodoList.tsx` - แสดงรายการงาน
- `/src/app/components/TodoItem.tsx` - แสดงงานแต่ละรายการ
- `/src/app/_logic/TodoContext.tsx` - State management สำหรับ todos

### Auth System
- `/auth.ts` - NextAuth configuration
- `/middleware.ts` - Route protection
- `/src/app/authentication/page.tsx` - หน้า login

## 🔧 Configuration Files
- `.env.local` - Environment variables
- `GMAIL_SMTP_SETUP.md` - คู่มือตั้งค่า Gmail SMTP
- `OAUTH_SETUP.md` - คู่มือตั้งค่า OAuth (Google/GitHub)

## 🎯 การทำงานของ Gmail SMTP Notification

เมื่อเพิ่ม todo ใหม่:
1. TodoForm ส่งข้อมูลไปที่ TodoContext
2. TodoContext เรียกใช้ `addTodo()` function
3. ระบบสร้าง HTML email template แบบสวยงาม
4. ส่งอีเมลผ่าน Gmail SMTP (async, ไม่ blocking UI)
5. User ได้รับอีเมลแจ้งเตือนใน Gmail

## � ตัวอย่าง Email Notification

**Subject:** 📝 งานใหม่เพิ่มแล้ว - Todo List

**HTML Email Content:**
```
📝 งานใหม่เพิ่มแล้ว!

� ทำการบ้านคณิตศาสตร์
📄 คำอธิบาย: แบบฝึกหัดบทที่ 5 หน้า 25-30
📂 หมวดหมู่: การเรียน
⚡ ความสำคัญ: 🟡 ปานกลาง
📅 กำหนดเสร็จ: 25 ธันวาคม 2567
🕐 เพิ่มเมื่อ: 29 มิถุนายน 2568, 14:30:00

✨ สู้ๆ นะครับ!
```

## 🔍 Troubleshooting

- ไม่ได้รับอีเมล → ตรวจสอบ Spam folder และ Gmail credentials ใน .env.local
- Error "Invalid login" → App Password ไม่ถูกต้อง ลองสร้างใหม่
- Error "Less secure app" → ต้องใช้ App Password ไม่ใช่รหัสผ่าน Gmail ปกติ
- ตรวจสอบ console logs ใน browser และ server

## 🎊 สำเร็จแล้ว!

ตอนนี้คุณมี Todo List ที่สามารถส่งอีเมลแจ้งเตือนไปที่ Gmail ได้แล้ว! 
ลองเพิ่มงานใหม่ดูแล้วตรวจสอบ Gmail ของคุณ �✨

## 💡 ข้อดีของ Gmail SMTP
- ✅ ฟรี 100% และมั่นคง
- ✅ รองรับ HTML email สวยงาม
- ✅ ไม่ต้องพึ่งพา third-party service ที่อาจปิดตัว
- ✅ ทุกคนมี Gmail account อยู่แล้ว
- ✅ มีความปลอดภัยสูง (App Password)
