import { test, expect, Page } from '@playwright/test';

test.describe('Todo List', () => {
  // Helper function สำหรับ login
  async function login(page: Page) {
    await page.goto('/authentication');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  }

  test('should access todos page after login', async ({ page }) => {
    await login(page);
    
    // ไปหน้า todos
    await page.goto('/todos');
    
    // ตรวจสอบหน้า todos
    await expect(page).toHaveTitle(/Next.js 15/);
    await expect(page.locator('h1')).toContainText('Todo List');
    await expect(page.locator('h2:has-text("➕ เพิ่มงานใหม่")')).toBeVisible();
    await expect(page.locator('h2:has-text("📝 รายการงาน")')).toBeVisible();
  });

  test('should redirect to authentication if not logged in', async ({ page }) => {
    // พยายามเข้า todos โดยไม่ login
    await page.goto('/todos');
    
    // ควรถูก redirect ไปหน้า authentication
    await expect(page).toHaveURL('/authentication');
  });

  test('should add a new todo', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // เติมข้อมูล todo ใหม่
    await page.fill('input[placeholder="ชื่องาน..."]', 'ทดสอบเพิ่ม Todo ใหม่');
    await page.fill('textarea[placeholder="คำอธิบายเพิ่มเติม..."]', 'นี่คือการทดสอบระบบ Todo List');
    
    // เลือกหมวดหมู่
    await page.selectOption('select', 'งานทั่วไป');
    
    // เลือกความสำคัญ
    await page.click('input[value="high"]');
    
    // ใส่วันที่กำหนด
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    await page.fill('input[type="date"]', tomorrowString);
    
    // คลิกปุ่มเพิ่มงาน
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    // ตรวจสอบว่างานใหม่ถูกเพิ่ม
    await expect(page.locator('text=ทดสอบเพิ่ม Todo ใหม่')).toBeVisible();
    await expect(page.locator('text=นี่คือการทดสอบระบบ Todo List')).toBeVisible();
    await expect(page.locator('text=งานทั่วไป')).toBeVisible();
  });

  test('should toggle todo completion', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // เพิ่ม todo ใหม่
    await page.fill('input[placeholder="ชื่องาน..."]', 'งานทดสอบ Toggle');
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    // หา checkbox ของงานที่เพิ่ม
    const todoItem = page.locator('text=งานทดสอบ Toggle').locator('..');
    const checkbox = todoItem.locator('input[type="checkbox"]');
    
    // ตรวจสอบว่างานยังไม่เสร็จ
    await expect(checkbox).not.toBeChecked();
    
    // คลิก checkbox เพื่อทำเครื่องหมายเสร็จ
    await checkbox.click();
    
    // ตรวจสอบว่างานถูกทำเครื่องหมายเสร็จแล้ว
    await expect(checkbox).toBeChecked();
    
    // คลิกอีกครั้งเพื่อยกเลิกการทำเครื่องหมาย
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('should delete todo', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // เพิ่ม todo ใหม่
    await page.fill('input[placeholder="ชื่องาน..."]', 'งานทดสอบ Delete');
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    // ตรวจสอบว่างานถูกเพิ่ม
    await expect(page.locator('text=งานทดสอบ Delete')).toBeVisible();
    
    // หาปุ่มลบ
    const todoItem = page.locator('text=งานทดสอบ Delete').locator('..');
    const deleteButton = todoItem.locator('button:has-text("🗑️")');
    
    // คลิกปุ่มลบ
    await deleteButton.click();
    
    // ตรวจสอบว่างานถูกลบแล้ว
    await expect(page.locator('text=งานทดสอบ Delete')).not.toBeVisible();
  });

  test('should filter todos by status', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // เพิ่ม todo 2 รายการ
    await page.fill('input[placeholder="ชื่องาน..."]', 'งานที่ยังไม่เสร็จ');
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    await page.fill('input[placeholder="ชื่องาน..."]', 'งานที่จะทำเครื่องหมายเสร็จ');
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    // ทำเครื่องหมายงานที่ 2 เสร็จ
    const completedTodo = page.locator('text=งานที่จะทำเครื่องหมายเสร็จ').locator('..');
    await completedTodo.locator('input[type="checkbox"]').click();
    
    // กรองแสดงเฉพาะงานที่เสร็จแล้ว
    await page.selectOption('select:has-text("ทั้งหมด")', 'completed');
    
    // ตรวจสอบว่าแสดงเฉพาะงานที่เสร็จแล้ว
    await expect(page.locator('text=งานที่จะทำเครื่องหมายเสร็จ')).toBeVisible();
    await expect(page.locator('text=งานที่ยังไม่เสร็จ')).not.toBeVisible();
    
    // กรองแสดงเฉพาะงานที่ยังไม่เสร็จ
    await page.selectOption('select:has-text("เสร็จแล้ว")', 'active');
    
    // ตรวจสอบว่าแสดงเฉพาะงานที่ยังไม่เสร็จ
    await expect(page.locator('text=งานที่ยังไม่เสร็จ')).toBeVisible();
    await expect(page.locator('text=งานที่จะทำเครื่องหมายเสร็จ')).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // พยายามส่งฟอร์มโดยไม่ใส่ชื่องาน
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    // ตรวจสอบ alert หรือ validation message
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('กรุณาใส่ชื่องาน');
      await dialog.accept();
    });
  });

  test('should access email notification settings', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // คลิกลิงก์ไปหน้าตั้งค่า email notification
    await page.click('a:has-text("📧 ตั้งค่า Email Notification")');
    
    // ตรวจสอบว่าไปหน้าตั้งค่าถูกต้อง
    await expect(page).toHaveURL('/line-notify');
    await expect(page.locator('h1')).toContainText('Gmail SMTP Notification Settings');
  });

  test('should persist todos in localStorage', async ({ page }) => {
    await login(page);
    await page.goto('/todos');
    
    // เพิ่ม todo
    await page.fill('input[placeholder="ชื่องาน..."]', 'งานทดสอบ Persistence');
    await page.click('button:has-text("➕ เพิ่มงาน")');
    
    // Refresh หน้า
    await page.reload();
    
    // ตรวจสอบว่างานยังอยู่
    await expect(page.locator('text=งานทดสอบ Persistence')).toBeVisible();
  });
});
