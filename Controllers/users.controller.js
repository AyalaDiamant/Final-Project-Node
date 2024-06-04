const userModel = require('../Models/user.model');
let id = 0;

const getUsers = ('', async (req, res) => {
    try {
      const users = await userModel.find();
      console.log(userModel);
      res.status(200).send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving userings');
    }
  });
  
  const getUserId = ('', async (req, res) => {
    try {
      const idParams = req.params.id;
      const user = await userModel.findById(idParams);
      if (!user) {
        res.status(404).send('user not found');
        return;
      };
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving userings');
    }
  });
  
  const addUser = ('', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const newUser = new userModel({
        _id: id++,
        name: data.name,
        password: data.password,
        email: data.email,
      });
      await newUser.save();
      res.send('Data saved successfully!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving user');
    }
  });
  
  const deleteUser = ('', async (req, res) => {
    try {
      const idParams = req.params.id;
      const user = await userModel.findByIdAndDelete(idParams);
      if (!user) {
        res.status(404).send('user not found');
        return;
      }
      res.send('user deleted successfully!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
    }
  });
  
  const updatedUser = ('', async (req, res) => {
    try {
      const idParams = req.params.id;
      const  {name, password, email} = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(
        idParams,
        {name, password, email},
        {new: true},
      );
      if (!updatedUser) {
        res.status(404).send('user not found...');
        return;
      }
      res.status(200).send(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating user');
    }
  });
  
  module.exports = {
    getUsers,
    getUserId,
    addUser,
    deleteUser,
    updatedUser
  };