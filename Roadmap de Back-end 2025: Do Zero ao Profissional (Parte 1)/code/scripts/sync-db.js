const { sequelize } = require("../src/config/db");
require("../src/models/User");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DB synced successfully.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
