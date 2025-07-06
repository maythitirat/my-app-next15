import { test, expect } from '@playwright/test';
import { AuthHelper, TodoHelper, EmailSettingsHelper } from './helpers';

test.describe('Integration Tests', () => {
  test('complete todo workflow', async ({ page }) => {
    const auth = new AuthHelper(page);
    const todo = new TodoHelper(page);
    
    // 1. Login
    await auth.login();
    await auth.expectLoggedIn();
    
    // 2. เพิ่ม todos หลายรายการ
    await todo.addTodo({
      title: 'งานสำคัญ',
      description: 'งานที่ต้องทำให้เสร็จวันนี้',
      category: 'งานเร่งด่วน',
      priority: 'high',
      dueDate: todo.getTomorrowDateString()
    });
    
    await todo.addTodo({
      title: 'งานทั่วไป',
      description: 'งานประจำวัน',
      category: 'งานทั่วไป',
      priority: 'medium'
    });
    
    await todo.addTodo({
      title: 'งานเล็กน้อย',
      category: 'อื่นๆ',
      priority: 'low'
    });
    
    // 3. ทำเครื่องหมายงานบางรายการเสร็จ
    await todo.toggleTodo('งานทั่วไป');
    await todo.expectTodoCompleted('งานทั่วไป', true);
    
    // 4. ทดสอบ filter
    await todo.filterTodos('completed');
    await todo.expectTodoVisible('งานทั่วไป', true);
    await todo.expectTodoVisible('งานสำคัญ', false);
    
    await todo.filterTodos('active');
    await todo.expectTodoVisible('งานสำคัญ', true);
    await todo.expectTodoVisible('งานทั่วไป', false);
    
    await todo.filterTodos('all');
    await todo.expectTodoVisible('งานสำคัญ', true);
    await todo.expectTodoVisible('งานทั่วไป', true);
    
    // 5. ลบงาน
    await todo.deleteTodo('งานเล็กน้อย');
    
    // 6. ไปหน้าตั้งค่า email
    await page.click('a:has-text("📧 ตั้งค่า Email Notification")');
    await expect(page).toHaveURL('/line-notify');
    
    // 7. กลับไปหน้า todos
    await page.click('a:has-text("← กลับไปหน้า Todo List")');
    await expect(page).toHaveURL('/todos');
    
    // 8. ตรวจสอบ persistence
    await page.reload();
    await todo.expectTodoVisible('งานสำคัญ', true);
    await todo.expectTodoVisible('งานทั่วไป', true);
    await todo.expectTodoCompleted('งานทั่วไป', true);
    
    // 9. Logout
    await auth.logout();
    await auth.expectLoggedOut();
  });

  test('email notification settings workflow', async ({ page }) => {
    const auth = new AuthHelper(page);
    const emailSettings = new EmailSettingsHelper(page);
    
    // 1. Login และไปหน้าตั้งค่า
    await auth.login();
    await emailSettings.goToSettings();
    
    // 2. ตรวจสอบองค์ประกอบต่างๆ
    await expect(page.locator('h3:has-text("📚 วิธีการตั้งค่า Gmail SMTP")')).toBeVisible();
    await expect(page.locator('h3:has-text("✨ คุณสมบัติ Email Notification")')).toBeVisible();
    
    // 3. ตรวจสอบปุ่มทดสอบ
    await expect(page.locator('button:has-text("🧪 ทดสอบการเชื่อมต่อ")')).toBeVisible();
    await expect(page.locator('button:has-text("📧 ส่งอีเมลทดสอบ")')).toBeVisible();
    
    // 4. ตรวจสอบลิงก์ external
    await expect(page.locator('a[href*="myaccount.google.com"]')).toHaveCount(2);
    
    // 5. กลับไปหน้า todos
    await page.click('a:has-text("← กลับไปหน้า Todo List")');
    await expect(page).toHaveURL('/todos');
  });

  test('authentication flow edge cases', async ({ page }) => {
    const auth = new AuthHelper(page);
    
    // 1. พยายามเข้า protected route โดยไม่ login
    await page.goto('/todos');
    await expect(page).toHaveURL('/authentication');
    
    // 2. Login แล้วพยายามเข้าหน้า auth อีกครั้ง
    await auth.login();
    await page.goto('/authentication');
    await expect(page).toHaveURL('/');
    
    // 3. Logout แล้วพยายามเข้า protected route
    await auth.logout();
    await page.goto('/todos');
    await expect(page).toHaveURL('/authentication');
    
    // 4. ทดสอบ invalid credentials
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrong');
    
    // รอ alert dialog
    let alertShown = false;
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('เข้าสู่ระบบไม่สำเร็จ');
      alertShown = true;
      await dialog.accept();
    });
    
    await page.click('button[type="submit"]');
    
    // ตรวจสอบว่ายังอยู่ที่หน้า authentication
    await expect(page).toHaveURL('/authentication');
    
    // 5. ทดสอบ Auto-fill และ login สำเร็จ
    await page.click('button:has-text("🔸 Auto-fill Admin")');
    await expect(page.locator('#email')).toHaveValue('admin@example.com');
    await expect(page.locator('#password')).toHaveValue('password');
    
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');
  });

  test('responsive design on mobile', async ({ page }) => {
    // เปลี่ยนเป็น mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const auth = new AuthHelper(page);
    const todo = new TodoHelper(page);
    
    // 1. Login on mobile
    await auth.login();
    await auth.expectLoggedIn();
    
    // 2. ใช้งาน todo list บน mobile
    await todo.addTodo({
      title: 'งานบน Mobile',
      description: 'ทดสอบการใช้งานบนมือถือ',
      priority: 'medium'
    });
    
    await todo.expectTodoVisible('งานบน Mobile', true);
    
    // 3. ทดสอบการ toggle บน mobile
    await todo.toggleTodo('งานบน Mobile');
    await todo.expectTodoCompleted('งานบน Mobile', true);
    
    // 4. ไปหน้าตั้งค่าบน mobile
    await page.click('a:has-text("📧 ตั้งค่า Email Notification")');
    await expect(page).toHaveURL('/line-notify');
    
    // ตรวจสอบว่าหน้าแสดงผลได้ดีบน mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button:has-text("🧪 ทดสอบการเชื่อมต่อ")')).toBeVisible();
  });

  test('localStorage persistence across sessions', async ({ page }) => {
    const auth = new AuthHelper(page);
    const todo = new TodoHelper(page);
    
    // Session 1: เพิ่ม todos
    await auth.login();
    await todo.addTodo({ title: 'งานที่ 1', priority: 'high' });
    await todo.addTodo({ title: 'งานที่ 2', priority: 'low' });
    await todo.toggleTodo('งานที่ 1');
    
    // Logout
    await auth.logout();
    
    // Session 2: Login อีกครั้ง
    await auth.login();
    await page.goto('/todos');
    
    // ตรวจสอบว่า todos ยังอยู่
    await todo.expectTodoVisible('งานที่ 1', true);
    await todo.expectTodoVisible('งานที่ 2', true);
    await todo.expectTodoCompleted('งานที่ 1', true);
    await todo.expectTodoCompleted('งานที่ 2', false);
    
    // เพิ่มงานใหม่
    await todo.addTodo({ title: 'งานที่ 3', priority: 'medium' });
    
    // Refresh page
    await page.reload();
    
    // ตรวจสอบว่างานทั้งหมดยังอยู่
    await todo.expectTodoVisible('งานที่ 1', true);
    await todo.expectTodoVisible('งานที่ 2', true);
    await todo.expectTodoVisible('งานที่ 3', true);
  });
});
