const User = require('../models/user');

function publicUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    roles: user.roles,
  };
}

exports.join = async (req, res) => {
  try {
    const { username, password, name, roles } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Username and password are required',
      });
    }

    const newUser = await User.create(username, password, name, roles);
    return res.status(201).json(publicUser(newUser));
  } catch (err) {
    console.error('Could not create user');
    return res.status(500).json({
      statusCode: 500,
      message: 'Could not create user',
    });
  }
};

exports.login = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    user: publicUser(req.user),
    message: 'Logged in successfully',
  });
};

exports.logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.error('Could not log out');
      return res.status(500).json({
        statusCode: 500,
        message: 'Error logging out',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Logged out successfully',
    });
  });
};
