const apiKey = process.env.paddle_key;

if (!apiKey) {
  console.error("paddle_key not found in environment variables. Make sure to run with --env-file=.env");
  process.exit(1);
}

const PADDLE_API_URL = "https://api.paddle.com";

async function createPaddlePackage() {
  try {
    // 1. Create a Product
    console.log("Creating Paddle Product...");
    const productResponse = await fetch(`${PADDLE_API_URL}/products`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "PureScan AI Pro",
        tax_category: "saas", // Standard for software-as-a-service
        description: "Access to all Pro features of PureScan AI",
        image_url: "https://purescan.ai/favicon.svg"
      })
    });

    const productData = await productResponse.json();
    if (!productResponse.ok) {
      throw new Error(`Failed to create product: ${JSON.stringify(productData)}`);
    }

    const productId = productData.data.id;
    console.log(`✅ Product created successfully. Product ID: ${productId}`);

    // 2. Create the monthly_base Price
    console.log("\nCreating monthly_base Price...");
    const monthlyResponse = await fetch(`${PADDLE_API_URL}/prices`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: "monthly_base",
        product_id: productId,
        unit_price: {
          amount: "999", // $9.99
          currency_code: "USD"
        },
        billing_cycle: {
          interval: "month",
          frequency: 1
        },
        tax_mode: "location" // Calculates and displays tax based on customer country
      })
    });

    const monthlyData = await monthlyResponse.json();
    if (!monthlyResponse.ok) {
      throw new Error(`Failed to create monthly price: ${JSON.stringify(monthlyData)}`);
    }
    const monthlyPriceId = monthlyData.data.id;
    console.log(`✅ monthly_base Price created successfully. Price ID: ${monthlyPriceId}`);

    // 3. Create the annual_base Price
    console.log("\nCreating annual_base Price...");
    const annualResponse = await fetch(`${PADDLE_API_URL}/prices`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: "annual_base",
        product_id: productId,
        unit_price: {
          amount: "2999", // $29.99
          currency_code: "USD"
        },
        billing_cycle: {
          interval: "year",
          frequency: 1
        },
        tax_mode: "location" // Calculates and displays tax based on customer country
      })
    });

    const annualData = await annualResponse.json();
    if (!annualResponse.ok) {
      throw new Error(`Failed to create annual price: ${JSON.stringify(annualData)}`);
    }
    const annualPriceId = annualData.data.id;
    console.log(`✅ annual_base Price created successfully. Price ID: ${annualPriceId}`);

    console.log("\n🎉 Package setup complete!");
    console.log("Save these IDs for your RevenueCat or client-side integration:");
    console.log(`- Product ID: ${productId}`);
    console.log(`- Monthly Price ID: ${monthlyPriceId}`);
    console.log(`- Annual Price ID: ${annualPriceId}`);

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

createPaddlePackage();
