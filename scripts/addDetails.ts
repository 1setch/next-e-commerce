// scripts/addDetails.ts
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), '.env.local') });

import dbConnect from '../src/lib/db/mongoose';
import Product from '../src/lib/db/models/Product';

async function addDetails() {
  await dbConnect();

  const result = await Product.updateMany(
    { details: { $exists: false } },
    {
      $set: {
        details: [
          '100% высококачественный материал',
          'Машинная стирка при 30°C',
          'Стандартный крой',
          'Импортное производство',
          'Соответствует международным стандартам качества',
        ],
      },
    }
  );

  console.log(`Updated ${result.modifiedCount} products`);
  process.exit(0);
}

addDetails().catch((err) => {
  console.error(err);
  process.exit(1);
});