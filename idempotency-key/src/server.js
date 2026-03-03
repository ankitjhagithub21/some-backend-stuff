import express from "express";
import fs from "fs";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

const ORDERS_FILE = "./orders.json";

// helper function to read orders
const readOrders = () => {
  const data = fs.readFileSync(ORDERS_FILE);
  return JSON.parse(data);
};

// helper function to write orders
const writeOrders = (orders) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Api working." });
});

app.post("/order", (req, res) => {
  const idempotencyKey = req.headers["idempotency-key"];

  if (!idempotencyKey) {
    return res.status(400).json({
      message: "Idempotency-Key header is required",
    });
  }

  const orders = readOrders();

  // 🔍 check if key already exists
  const existing = orders.find(
    (order) => order.idempotencyKey === idempotencyKey
  );

  if (existing) {
    return res.status(200).json({
      message: "Duplicate request detected",
      order: existing,
    });
  }

  // 🆕 create new order
  const newOrder = {
    id: Date.now(),
    idempotencyKey,
    items: req.body.items,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  writeOrders(orders);

  return res.status(201).json({
    message: "Order created successfully",
    order: newOrder,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});