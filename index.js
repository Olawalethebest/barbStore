require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/database");
const app = express();
const port = process.env.PORT;
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
const checkoutRoute = require("./routes/checkout.route");
const { welcomeMessage, resourceNotFound } = require("./constants/messages");
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "true",
    message: welcomeMessage,
  });
});

app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);
app.use("/checkout", checkoutRoute);

app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server is running on port http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).json({
    status: "false",
    message: resourceNotFound,
  });
});
