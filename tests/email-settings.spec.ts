import { test, expect, Page } from '@playwright/test';

test.describe('Gmail SMTP Notification Settings', () => {
  async function login(page: Page) {
    await page.goto('/authentication');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  }

  test('should access notification settings page', async ({ page }) => {
    await login(page);
    
    // ไปหน้าตั้งค่า notification
    await page.goto('/line-notify');
    
    // ตรวจสอบหน้าตั้งค่า
    await expect(page).toHaveTitle(/Next.js 15/);
    await expect(page.locator('h1')).toContainText('Gmail SMTP Notification Settings');
    await expect(page.locator('h2')).toContainText('สถานะการตั้งค่า');
  });

  test('should show Gmail SMTP setup guide', async ({ page }) => {
    await login(page);
    await page.goto('/line-notify');
    
    // ตรวจสอบคู่มือการตั้งค่า
    await expect(page.locator('h3:has-text("📚 วิธีการตั้งค่า Gmail SMTP")')).toBeVisible();
    await expect(page.locator('text=เปิดใช้งาน 2-Step Verification')).toBeVisible();
    await expect(page.locator('text=สร้าง App Password')).toBeVisible();
    await expect(page.locator('code:has-text("GMAIL_EMAIL")')).toBeVisible();
  });

  test('should have test connection button', async ({ page }) => {
    await login(page);
    await page.goto('/line-notify');
    
    // ตรวจสอบปุ่มทดสอบการเชื่อมต่อ
    await expect(page.locator('button:has-text("🧪 ทดสอบการเชื่อมต่อ")')).toBeVisible();
    await expect(page.locator('button:has-text("📧 ส่งอีเมลทดสอบ")')).toBeVisible();
  });

  test('should show features and links', async ({ page }) => {
    await login(page);
    await page.goto('/line-notify');
    
    // ตรวจสอบคุณสมบัติที่แสดง
    await expect(page.locator('h3:has-text("✨ คุณสมบัติ Email Notification")')).toBeVisible();
    await expect(page.locator('text=ส่งอีเมลแจ้งเตือนเมื่อเพิ่ม todo ใหม่')).toBeVisible();
    await expect(page.locator('text=รูปแบบอีเมล HTML สวยงาม')).toBeVisible();
    
    // ตรวจสอบลิงก์กลับไป todos
    await expect(page.locator('a:has-text("← กลับไปหน้า Todo List")')).toBeVisible();
  });

  test('should navigate back to todos page', async ({ page }) => {
    await login(page);
    await page.goto('/line-notify');
    
    // คลิกลิงก์กลับไป todos
    await page.click('a:has-text("← กลับไปหน้า Todo List")');
    
    // ตรวจสอบว่าไปหน้า todos
    await expect(page).toHaveURL('/todos');
    await expect(page.locator('h1')).toContainText('Todo List');
  });

  test('should redirect to authentication if not logged in', async ({ page }) => {
    // พยายามเข้าหน้าตั้งค่าโดยไม่ login
    await page.goto('/line-notify');
    
    // ควรถูก redirect ไปหน้า authentication
    await expect(page).toHaveURL('/authentication');
  });

  test('should show external links', async ({ page }) => {
    await login(page);
    await page.goto('/line-notify');
    
    // ตรวจสอบ external links
    await expect(page.locator('a[href="https://myaccount.google.com/security"]')).toBeVisible();
    await expect(page.locator('a[href="https://myaccount.google.com/apppasswords"]')).toBeVisible();
  });
});
