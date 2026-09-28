import fs from 'fs';
import path from 'path';
import DodoPayments from 'dodopayments';

// Load .env manually if process.env.DODO_PAYMENTS_API_KEY is not already set
if (!process.env.DODO_PAYMENTS_API_KEY) {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const apiKey = process.env.DODO_PAYMENTS_API_KEY;

if (!apiKey) {
  console.error("❌ Error: DODO_PAYMENTS_API_KEY is not set in environment or .env file.");
  console.log("Usage:");
  console.log("  DODO_PAYMENTS_API_KEY=your_key node create_dodo_package.js");
  process.exit(1);
}

const isLive = process.argv.includes('--live') || process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode';
const environment = isLive ? 'live_mode' : 'test_mode';

console.log(`🚀 Initializing Dodo Payments package creator in [${environment}]...`);

const client = new DodoPayments({
  bearerToken: apiKey,
  environment: environment,
});

async function createDodoPackages() {
  try {
    console.log("🔍 Checking existing products...");
    const existingList = await client.products.list();
    const existingItems = existingList.items || existingList.data || [];

    let monthlyProduct = existingItems.find(p => p.name === 'PureScan AI Pro - Monthly');
    let annualProduct = existingItems.find(p => p.name === 'PureScan AI Pro - Annual');

    // 1. Monthly Product ($9.99/month)
    if (monthlyProduct) {
      console.log(`ℹ️ Monthly product already exists: ${monthlyProduct.product_id}`);
    } else {
      console.log("⏳ Creating 'PureScan AI Pro - Monthly' ($9.99/month)...");
      monthlyProduct = await client.products.create({
        name: 'PureScan AI Pro - Monthly',
        description: 'PureScan AI Pro Monthly Plan - Unlimited scans, hidden toxin detection, personalized health risk assessments.',
        tax_category: 'saas',
        price: {
          type: 'recurring_price',
          currency: 'USD',
          price: 999, // $9.99 in cents
          discount: 0,
          payment_frequency_count: 1,
          payment_frequency_interval: 'Month',
          subscription_period_count: 1,
          subscription_period_interval: 'Month',
          purchasing_power_parity: false,
        },
      });
      console.log(`✅ Created Monthly product: ${monthlyProduct.product_id}`);
    }

    // 2. Annual Product ($29.99/year)
    if (annualProduct) {
      console.log(`ℹ️ Annual product already exists: ${annualProduct.product_id}`);
    } else {
      console.log("⏳ Creating 'PureScan AI Pro - Annual' ($29.99/year)...");
      annualProduct = await client.products.create({
        name: 'PureScan AI Pro - Annual',
        description: 'PureScan AI Pro Annual Plan - Best value, unlimited scans, hidden toxin detection, personalized health risk assessments.',
        tax_category: 'saas',
        price: {
          type: 'recurring_price',
          currency: 'USD',
          price: 2999, // $29.99 in cents
          discount: 0,
          payment_frequency_count: 1,
          payment_frequency_interval: 'Year',
          subscription_period_count: 1,
          subscription_period_interval: 'Year',
          purchasing_power_parity: false,
        },
      });
      console.log(`✅ Created Annual product: ${annualProduct.product_id}`);
    }

    console.log("\n========================================================");
    console.log("🎉 Dodo Payments products setup completed successfully!");
    console.log("========================================================");
    console.log(`PUBLIC_DODO_PRODUCT_MONTHLY=${monthlyProduct.product_id}`);
    console.log(`PUBLIC_DODO_PRODUCT_ANNUAL=${annualProduct.product_id}`);
    console.log("\nAdd these variables to your .env and Vercel project settings.");

  } catch (err) {
    console.error("❌ Failed to create Dodo Payments products:", err.message || err);
    if (err.response) {
      console.error("Response details:", JSON.stringify(err.response, null, 2));
    }
  }
}

createDodoPackages();
