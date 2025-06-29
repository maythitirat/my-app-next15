# การตั้งค่า Google OAuth สำหรับ NextAuth.js

## สร้าง Google OAuth Credentials

1. **ไปที่ Google Cloud Console**
   - เข้าไป [Google Cloud Console](https://console.cloud.google.com/)
   - สร้างโปรเจกต์ใหม่หรือเลือกโปรเจกต์ที่มีอยู่

2. **เปิดใช้งาน Google+ API**
   - ไปที่ "APIs & Services" > "Library"
   - ค้นหา "Google+ API" และเปิดใช้งาน

3. **สร้าง OAuth 2.0 Credentials**
   - ไปที่ "APIs & Services" > "Credentials"
   - คลิก "Create Credentials" > "OAuth 2.0 Client ID"
   - เลือก "Web application"
   - ตั้งชื่อ เช่น "Resume Management App"

4. **ตั้งค่า Authorized redirect URIs**
   ```
   http://localhost:3000/api/auth/callback/google
   ```

5. **คัดลอก Client ID และ Client Secret**
   - คัดลอก Client ID และ Client Secret
   - ใส่ลงในไฟล์ `.env.local`:

   ```bash
   GOOGLE_CLIENT_ID=your-actual-client-id-here
   GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
   ```

## สำหรับ GitHub OAuth (ถ้าต้องการ)

1. **ไปที่ GitHub Settings**
   - GitHub > Settings > Developer settings > OAuth Apps

2. **สร้าง New OAuth App**
   - Application name: "Resume Management App"
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

3. **คัดลอก Client ID และ Client Secret**
   ```bash
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

## การทดสอบ

หลังจากตั้งค่าแล้ว:
1. รีสตาร์ท dev server: `npm run dev`
2. ไปที่ `/authentication`
3. คลิก "Continue with Google" หรือ "Continue with GitHub"

## หมายเหตุ

- หากไม่ตั้งค่า credentials ระบบจะแสดงเฉพาะ Credentials login เท่านั้น
- สำหรับ Credentials login ใช้:
  - Email: `admin@example.com`
  - Password: `password`
