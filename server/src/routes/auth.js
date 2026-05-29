import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;