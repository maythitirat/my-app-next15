// ตัวอย่างการใช้ API createResume
// URL: http://localhost:3000/api/resumes
// Method: POST

const sampleResumeData = {
  "full_name": "นายธนชัย วัฒนา",
  "email": "thanchai@example.com", 
  "phone": "087-654-3210",
  "summary": "Data Analyst ที่มีประสบการณ์ในการวิเคราะห์ข้อมูลเชิงธุรกิจ เชี่ยวชาญ Python, SQL, Power BI และ Machine Learning สามารถสื่อสารข้อมูลที่ซับซ้อนให้เข้าใจง่าย และมีประสบการณ์ในการนำเสนอผลงานต่อผู้บริหาร"
};

// ตัวอย่างการเรียกใช้ด้วย fetch
async function createResume() {
  try {
    const response = await fetch('http://localhost:3000/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleResumeData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Resume created successfully:', result);
    } else {
      const error = await response.json();
      console.error('Error creating resume:', error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// ตัวอย่างการเรียกใช้ด้วย curl
/*
curl -X POST http://localhost:3000/api/resumes \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "นายธนชัย วัฒนา",
    "email": "thanchai@example.com",
    "phone": "087-654-3210", 
    "summary": "Data Analyst ที่มีประสบการณ์ในการวิเคราะห์ข้อมูลเชิงธุรกิจ เชี่ยวชาญ Python, SQL, Power BI และ Machine Learning"
  }'
*/

export { createResume, sampleResumeData };
