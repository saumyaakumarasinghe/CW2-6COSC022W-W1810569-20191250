const {
  User,
  ApiKey,
  ApiKeyInteraction,
  sequelize,
} = require('../models/index');

async function createUser(firstName, lastName, email, mobile, password, role) {
  try {
    return User.create({
      firstName,
      lastName,
      email,
      mobile,
      password,
      role,
      lastActivateAt: Date.now(),
      status: true,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    return User.findAll();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    return User.findOne({
      where: { id: userId },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    return User.findOne({
      where: { email },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

async function updateUser(userId, userData) {
  try {
    console.log('userData', userData);

    await User.update(userData, { where: { id: userId } });

    return getUserById(userId);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(userId) {
  const transaction = await sequelize.transaction();
  try {
    // Find all API keys associated with this user
    const apiKeys = await ApiKey.findAll({
      where: { userId },
      transaction,
    });

    // For each API key, delete its interactions
    for (const apiKey of apiKeys) {
      await ApiKeyInteraction.destroy({
        where: { apiKeyId: apiKey.id },
        transaction,
      });
    }

    // Delete all API keys for this user
    await ApiKey.destroy({
      where: { userId },
      transaction,
    });

    // Delete the user
    const result = await User.destroy({
      where: { id: userId },
      transaction,
    });

    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
