import { test, expect, Page } from '@playwright/test';

test.describe('Home Page', () => {
  async function login(page: Page) {
    await page.goto('/authentication');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  }

  test('should redirect to authentication when not logged in', async ({ page }) => {
    await page.goto('/');
    
    // ควรถูก redirect ไปหน้า authentication
    await expect(page).toHaveURL('/authentication');
  });

  test('should show home page after login', async ({ page }) => {
    await login(page);
    
    // ตรวจสอบหน้า home
    await expect(page).toHaveTitle(/Next.js 15/);
    await expect(page.locator('button:has-text("Log out")')).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    await login(page);
    
    // คลิกปุ่ม hamburger menu
    await page.click('button[aria-label="Open menu"]');
    
    // ตรวจสอบ navigation menu (ถ้ามี)
    // Note: ขึ้นอยู่กับการ implement ใน home page
  });

  test('should logout from home page', async ({ page }) => {
    await login(page);
    
    // คลิกปุ่ม logout
    await page.click('button:has-text("Log out")');
    
    // ตรวจสอบว่าถูก redirect ไปหน้า authentication
    await expect(page).toHaveURL('/authentication');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await login(page);
    
    // เปลี่ยน viewport เป็น mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // ตรวจสอบว่าหน้าแสดงผลได้ดีบน mobile
    await expect(page.locator('button:has-text("Log out")')).toBeVisible();
  });
});

test.describe('API Endpoints', () => {
  test('should return session data when authenticated', async ({ page, request }) => {
    // Login ก่อน
    await page.goto('/authentication');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
    
    // ดึง cookies จาก browser context
    const cookies = await page.context().cookies();
    
    // เรียก API session endpoint
    const response = await request.get('/api/auth/session', {
      headers: {
        cookie: cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
      }
    });
    
    expect(response.status()).toBe(200);
    const session = await response.json();
    expect(session.user.email).toBe('admin@example.com');
  });

  test('should return providers data', async ({ request }) => {
    const response = await request.get('/api/auth/providers');
    
    expect(response.status()).toBe(200);
    const providers = await response.json();
    expect(providers).toHaveProperty('credentials');
  });
});
