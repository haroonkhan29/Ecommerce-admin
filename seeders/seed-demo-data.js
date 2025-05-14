const db = require("../models");

const seed = async () => {
  try {
    await db.sequelize.sync({ force: true }); // Drop and recreate tables

    // Create sample products
    const products = await db.Product.bulkCreate([
      { name: "Apple iPhone 14", category: "Electronics", price: 999.99 },
      { name: "Samsung TV", category: "Electronics", price: 499.99 },
      { name: "Nike Running Shoes", category: "Footwear", price: 120.00 },
      { name: "Levi's Jeans", category: "Clothing", price: 60.00 }
    ]);

    // Set inventory for each product
    await Promise.all(products.map(p =>
      db.Inventory.create({ productId: p.id, quantity: Math.floor(Math.random() * 100 + 1), lastUpdated: new Date() })
    ));

    // Create some sales
    await db.Sale.bulkCreate([
      {
        productId: products[0].id,
        quantity: 2,
        totalPrice: 2 * products[0].price,
        saleDate: new Date("2025-05-10")
      },
      {
        productId: products[1].id,
        quantity: 1,
        totalPrice: 1 * products[1].price,
        saleDate: new Date("2025-05-11")
      },
      {
        productId: products[2].id,
        quantity: 5,
        totalPrice: 5 * products[2].price,
        saleDate: new Date("2025-05-12")
      },
      {
        productId: products[3].id,
        quantity: 3,
        totalPrice: 3 * products[3].price,
        saleDate: new Date("2025-05-13")
      }
    ]);

    console.log("Demo data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seed();
