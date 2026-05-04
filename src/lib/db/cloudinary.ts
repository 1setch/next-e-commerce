// lib/db/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: 'ecommerce',
  });

  return result.secure_url;
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = url.split('/').pop()?.split('.')[0];
  if (publicId) {
    await cloudinary.uploader.destroy(`ecommerce/${publicId}`);
  }
}

export default cloudinary;