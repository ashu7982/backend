

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel} = require('../models/register');


const userRouter = express.Router();


userRouter.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await userModel.create({ email, password: hashedPassword });
    console.log(user);
    res.status(200).send('Account created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


userRouter.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ Id: user._id }, 'secretkey');
        res.send({ message: 'Login successful', token: token });
      } else {
        res.status(401).send({ message: 'Invalid credentials' });
      }
    } else {
      res.status(404).send({ message: 'Email not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(err);
  }
});

module.exports = { userRouter };