// scripts/createAdmin.ts
import { config } from 'dotenv';
import { resolve } from 'path';

// Загружаем ДО всех остальных импортов
config({ path: resolve(__dirname, '../.env.local') });

// Проверка
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'NOT FOUND');

// Теперь импортируем остальное
import dbConnect from '../src/lib/db/mongoose';
import User from '../src/lib/db/models/User';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  await dbConnect();

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    name: 'Admin',
  });
  console.log('Admin created: admin@example.com / admin123');
  process.exit(0);
}

createAdmin();