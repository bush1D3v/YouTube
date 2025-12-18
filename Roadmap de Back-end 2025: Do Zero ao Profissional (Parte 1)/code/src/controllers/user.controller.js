const bcrypt = require("bcrypt");
const User = require("../models/User");
const { BCRYPT_SALT_ROUNDS } = require("../config/env");

function isOwner(requesterId, targetId) {
  return String(requesterId) === String(targetId);
}

async function getUser(req, res) {
  const { id } = req.params;
  const requesterId = req.user.sub;

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (isOwner(requesterId, id)) {
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    });
  }

  return res.json({ name: user.name });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const requesterId = req.user.sub;

  if (!isOwner(requesterId, id)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, email, phone, password } = req.body;

  if (email && email !== user.email) {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: "Email already in use" });
  }

  if (typeof name === "string") user.name = name;
  if (typeof email === "string") user.email = email;
  if (typeof phone !== "undefined") user.phone = phone;

  if (typeof password === "string" && password.length > 0) {
    user.passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  }

  await user.save();

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const requesterId = req.user.sub;

  if (!isOwner(requesterId, id)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.destroy();
  return res.status(204).send();
}

module.exports = { getUser, updateUser, deleteUser };
