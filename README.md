# Next.js 15 Resume Management App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **Resume Management**: Create, view, update, and delete resumes
- **User Authentication**: Secure authentication with NextAuth.js (Google, GitHub, Credentials)
- **Next.js 15 Features**: Server Actions, Suspense, Streaming, Enhanced Caching
- **API Integration**: AWS API Gateway integration

## API Endpoints

### Resume API

#### Create Resume
```bash
POST /api/resumes
Content-Type: application/json

{
  "full_name": "นายธนชัย วัฒนา",
  "email": "thanchai@example.com",
  "phone": "087-654-3210",
  "summary": "Data Analyst ที่มีประสบการณ์ในการวิเคราะห์ข้อมูลเชิงธุรกิจ เชี่ยวชาญ Python, SQL, Power BI และ Machine Learning"
}
```

#### Get All Resumes
```bash
GET /api/resumes
```

#### Get Resume by ID
```bash
GET /api/resumes/[id]
```

#### Update Resume
```bash
PUT /api/resumes/[id]
Content-Type: application/json

{
  "full_name": "นายธนชัย วัฒนา",
  "email": "thanchai@example.com",
  "phone": "087-654-3210",
  "summary": "Updated summary..."
}
```

#### Delete Resume
```bash
DELETE /api/resumes/[id]
```

## Getting Started

1. Copy `.env.local.example` to `.env.local` and configure your environment variables:
```bash
API_BASE_URL=https://m23bxip04j.execute-api.ap-southeast-1.amazonaws.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Pages

- `/` - Home page with navigation
- `/resume` - Resume list page
- `/resume/create` - Create new resume
- `/resume/[id]` - View specific resume
- `/authentication` - User authentication
- `/search` - Search resumes

## Technologies Used

- **Next.js 15** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Server Actions** for form handling
- **Suspense & Streaming** for better UX
- **Enhanced Caching** with unstable_cache

## Build & Test

```bash
# Build the project
npm run build

# Run tests  
npm test

# Type checking
npm run type-check
```
