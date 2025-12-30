const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

require("./models/User"); // ensure model is registered

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Basic error fallback (avoid leaking stack traces)
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
