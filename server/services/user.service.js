const { users: Users, sequelize } = require('../models/index');

async function createUser(userName, email, mobile, password, firstName, lastName) {
  try {
    return Users.create({
      userName,
      firstName,
      lastName,
      email,
      mobile,
      password,
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
    return Users.findAll();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    console.log(userId);

    return Users.findOne({
      where: { id: userId },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    return Users.findOne({
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

    await Users.update(userData, { where: { id: userId } });

    return getUserById(userId);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    // Delete the user
    const result = await Users.destroy({
      where: { id: userId },
    });

    return result;
  } catch (error) {
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
