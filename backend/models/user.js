const bcrypt = require('bcrypt');
const pool = require('../db');

class User {
  static async create(username, password, name, roles) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, password, name, roles) VALUES($1, $2, $3, $4) RETURNING id, username, name, roles',
      [username, hashedPassword, name, roles]
    );
    return newUser.rows[0];
  }

  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0] || null;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, username, name, roles FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static verifyPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
}

module.exports = User;
