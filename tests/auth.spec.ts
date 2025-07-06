import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/authentication');
    
    // ตรวจสอบว่าอยู่ในหน้า login
    await expect(page).toHaveTitle(/Next.js 15/);
    await expect(page.locator('h2')).toContainText('Welcome Back!');
    
    // ใส่ email และ password
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    
    // คลิกปุ่ม login
    await page.click('button[type="submit"]');
    
    // รอให้ redirect และตรวจสอบว่าไปหน้า home
    await expect(page).toHaveURL('/');
    
    // ตรวจสอบว่ามีปุ่ม logout
    await expect(page.locator('button:has-text("Log out")')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/authentication');
    
    // ใส่ข้อมูลผิด
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpassword');
    
    // คลิกปุ่ม login
    await page.click('button[type="submit"]');
    
    // รอ alert และตรวจสอบข้อความ error
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('เข้าสู่ระบบไม่สำเร็จ');
      await dialog.accept();
    });
  });

  test('should auto-fill admin credentials', async ({ page }) => {
    await page.goto('/authentication');
    
    // คลิกปุ่ม Auto-fill Admin
    await page.click('button:has-text("🔸 Auto-fill Admin")');
    
    // ตรวจสอบว่า fields ถูกเติมข้อมูล
    await expect(page.locator('#email')).toHaveValue('admin@example.com');
    await expect(page.locator('#password')).toHaveValue('password');
  });

  test('should redirect to home if already logged in', async ({ page }) => {
    // Login ก่อน
    await page.goto('/authentication');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    
    // พยายามไปหน้า authentication อีกครั้ง
    await page.goto('/authentication');
    
    // ควรถูก redirect กลับไปหน้า home
    await expect(page).toHaveURL('/');
  });

  test('should logout successfully', async ({ page }) => {
    // Login ก่อน
    await page.goto('/authentication');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    
    // คลิกปุ่ม logout
    await page.click('button:has-text("Log out")');
    
    // ตรวจสอบว่าถูก redirect ไปหน้า authentication
    await expect(page).toHaveURL('/authentication');
    await expect(page.locator('h2')).toContainText('Welcome Back!');
  });
});
