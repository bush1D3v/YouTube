const app = require("./app");
const { sequelize } = require("./config/db");
const { PORT } = require("./config/env");

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
      console.log(`Swagger on http://localhost:${PORT}/docs`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
