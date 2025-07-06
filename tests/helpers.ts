import { Page, expect } from '@playwright/test';

export class AuthHelper {
  constructor(private page: Page) {}

  async login(email = 'admin@example.com', password = 'password') {
    await this.page.goto('/authentication');
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
    await expect(this.page).toHaveURL('/');
  }

  async logout() {
    await this.page.click('button:has-text("Log out")');
    await expect(this.page).toHaveURL('/authentication');
  }

  async expectLoggedIn() {
    await expect(this.page.locator('button:has-text("Log out")')).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.page).toHaveURL('/authentication');
    await expect(this.page.locator('h2')).toContainText('Welcome Back!');
  }
}

export class TodoHelper {
  constructor(private page: Page) {}

  async addTodo(options: {
    title: string;
    description?: string;
    category?: string;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
  }) {
    await this.page.goto('/todos');
    
    // เติมข้อมูลพื้นฐาน
    await this.page.fill('input[placeholder="ชื่องาน..."]', options.title);
    
    if (options.description) {
      await this.page.fill('textarea[placeholder="คำอธิบายเพิ่มเติม..."]', options.description);
    }
    
    if (options.category) {
      await this.page.selectOption('select', options.category);
    }
    
    if (options.priority) {
      await this.page.click(`input[value="${options.priority}"]`);
    }
    
    if (options.dueDate) {
      await this.page.fill('input[type="date"]', options.dueDate);
    }
    
    // คลิกปุ่มเพิ่มงาน
    await this.page.click('button:has-text("➕ เพิ่มงาน")');
    
    // รอให้งานถูกเพิ่ม
    await expect(this.page.locator(`text=${options.title}`)).toBeVisible();
  }

  async toggleTodo(title: string) {
    const todoItem = this.page.locator(`text=${title}`).locator('..');
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
  }

  async deleteTodo(title: string) {
    const todoItem = this.page.locator(`text=${title}`).locator('..');
    const deleteButton = todoItem.locator('button:has-text("🗑️")');
    await deleteButton.click();
    
    // รอให้งานถูกลบ
    await expect(this.page.locator(`text=${title}`)).not.toBeVisible();
  }

  async filterTodos(filter: 'all' | 'active' | 'completed') {
    // หา select element ที่มี option filter
    const select = this.page.locator('select').first();
    await select.selectOption(filter);
  }

  async expectTodoVisible(title: string, visible = true) {
    if (visible) {
      await expect(this.page.locator(`text=${title}`)).toBeVisible();
    } else {
      await expect(this.page.locator(`text=${title}`)).not.toBeVisible();
    }
  }

  async expectTodoCompleted(title: string, completed = true) {
    const todoItem = this.page.locator(`text=${title}`).locator('..');
    const checkbox = todoItem.locator('input[type="checkbox"]');
    
    if (completed) {
      await expect(checkbox).toBeChecked();
    } else {
      await expect(checkbox).not.toBeChecked();
    }
  }

  getTomorrowDateString(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  getYesterdayDateString(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }
}

export class EmailSettingsHelper {
  constructor(private page: Page) {}

  async goToSettings() {
    await this.page.goto('/line-notify');
    await expect(this.page.locator('h1')).toContainText('Gmail SMTP Notification Settings');
  }

  async testConnection() {
    await this.page.click('button:has-text("🧪 ทดสอบการเชื่อมต่อ")');
    
    // รอผลลัพธ์
    await this.page.waitForSelector('[class*="bg-green-50"], [class*="bg-red-50"]', { 
      timeout: 10000 
    });
  }

  async sendTestEmail() {
    await this.page.click('button:has-text("📧 ส่งอีเมลทดสอบ")');
    
    // รอ alert หรือผลลัพธ์
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

  async expectSuccessMessage() {
    await expect(this.page.locator('text=✅')).toBeVisible();
  }

  async expectErrorMessage() {
    await expect(this.page.locator('text=❌')).toBeVisible();
  }
}
