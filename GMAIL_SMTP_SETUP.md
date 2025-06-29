# Gmail SMTP Setup Guide

Gmail SMTP เป็นบริการฟรีที่ให้เราส่ง email notification ได้

## วิธีการตั้งค่า Gmail SMTP

### 1. เปิดใช้งาน 2-Step Verification
- ไปที่: https://myaccount.google.com/security
- เปิดใช้งาน "2-Step Verification" ก่อน

### 2. สร้าง App Password
- ไปที่: https://myaccount.google.com/apppasswords
- เลือก "Mail" และ "Other (custom name)"
- ใส่ชื่อ app เช่น "Todo App"
- คลิก "Generate"
- **สำคัญ**: Copy รหัส 16 ตัวอักษรทันที (จะแสดงครั้งเดียว)

### 3. เพิ่มข้อมูลลงใน .env.local
```bash
# Gmail SMTP Configuration
GMAIL_EMAIL=your_email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop  # 16 ตัวอักษรจาก App Password
NOTIFICATION_EMAIL=recipient@gmail.com  # (optional - หากไม่กำหนดจะส่งไปที่ GMAIL_EMAIL)
```

### 4. Restart Development Server
```bash
npm run dev
```

## การทดสอบ

1. เพิ่ม todo ใหม่ในแอป
2. ตรวจสอบ Gmail ว่าได้รับอีเมลหรือไม่
3. หากไม่ได้รับ ให้ตรวจสอบ:
   - App Password ถูกต้องหรือไม่
   - 2-Step Verification เปิดใช้งานแล้วหรือไม่
   - Console log ใน browser developer tools
   - Server logs ใน terminal

## ข้อมูลเพิ่มเติม

- Gmail SMTP ฟรี 100%
- สามารถส่งได้ 500 อีเมลต่อวัน (Gmail free account)
- รองรับ HTML และ plain text
- Reliable และมีความปลอดภัยสูง

## Format ของ Email Notification

เมื่อเพิ่ม todo ใหม่ จะได้รับอีเมลแบบนี้:

**Subject:** 📝 งานใหม่เพิ่มแล้ว - Todo List

**Content:**
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

## Troubleshooting

### ไม่ได้รับอีเมล
1. ตรวจสอบ Spam/Junk folder
2. ตรวจสอบ App Password ถูกต้องหรือไม่
3. ตรวจสอบ 2-Step Verification เปิดใช้งานแล้วหรือไม่

### Error "Invalid login"
- App Password ไม่ถูกต้อง
- ลองสร้าง App Password ใหม่

### Error "Less secure app access"
- ใช้ App Password แทนการใช้รหัสผ่าน Gmail ปกติ
- Gmail ไม่อนุญาตให้ใช้รหัสผ่านปกติสำหรับ SMTP อีกต่อไป

### จำกัดการส่ง
- Gmail ฟรี: 500 อีเมลต่อวัน
- Gmail Workspace: 2,000 อีเมลต่อวัน
