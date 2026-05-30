import db from '../db/db.js';

export async function getAllUsers (req, res) {
  try {
    const [users] = await db.query(
      'SELECT id, name, email, role, created_at FROM users'
    );

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const [users] = await db.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}


export async function createUser(req, res) {
    const { name, email, password, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
      [name, email, password, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const [result] = await db.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }   
}