import CreateResumeForm from '@/app/components/CreateResumeForm';
import BackToHomeButton from '@/app/components/BackToHomeButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Resume | Resume Manager',
  description: 'Create a new professional resume with our easy-to-use form',
};

// Next.js 15 - Server Component with Client Component integration
export default function CreateResumePage() {
  return (
    <div className="min-h-screen bg-[#fffbe7] py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-6">
          <BackToHomeButton />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Create New Resume</h1>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">ตัวอย่างข้อมูลสำหรับทดสอบ:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <strong>ชื่อ-นามสกุล:</strong> สมชาย ใจดี<br/>
                <strong>อีเมล:</strong> somchai@example.com<br/>
                <strong>เบอร์โทร:</strong> 081-234-5678
              </div>
              <div>
                <strong>สรุปประสบการณ์:</strong><br/>
                นักพัฒนา Full Stack Developer ที่มีประสบการณ์ 3 ปี เชี่ยวชาญใน React, Node.js และ PostgreSQL มีประสบการณ์ในการพัฒนาระบบ web application ตั้งแต่ frontend จนถึง backend
              </div>
            </div>
          </div>
        </div>
        
        <CreateResumeForm />
      </div>
    </div>
  );
}
