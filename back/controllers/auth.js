import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await UserModel.create({ email, password: hashedPassword });

    res.status(201).json({ message: 'User created.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong...' });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Wrong password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ token, user, message: 'User logged in.' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong...' });
  }
};
