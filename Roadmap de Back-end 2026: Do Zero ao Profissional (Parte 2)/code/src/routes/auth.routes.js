const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Create a user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Erackson" }
 *               email: { type: string, example: "e@e.com" }
 *               phone: { type: string, example: "9999" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       201: { description: Created }
 *       400: { description: Validation error }
 *       409: { description: Email already in use }
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "e@e.com" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       200: { description: OK }
 *       400: { description: Validation error }
 *       401: { description: Invalid credentials }
 */
router.post("/login", login);

module.exports = router;
