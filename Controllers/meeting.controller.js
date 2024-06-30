const meetModel = require('../models/meet.model');
let id = 0;

const getMeetings = ('', async (req, res) => {
  try {
    const meetings = await meetModel.find();
    console.log(meetModel);
    res.status(200).send(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving meetings');
  }
});

const getMeetId = ('', async (req, res) => {
  try {
    const idParams = req.params.id;
    const meet = await meetModel.findById(idParams);
    if (!meet) {
      res.status(404).send('meet not found');
      return;
    };
    res.send(meet);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving meetings');
  }
});

const addMeet = ('', async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const newMeet = new meetModel({
      _id: id++,
      time: data.time,
      date: data.date,
      place: data.place,
    });

    const existingMeet = await meetModel.findOne({ time: data.time, date: data.date });
    if (existingMeet) {
      return res.status(400).send('Please choose another time.');
    }

    await newMeet.save();
    res.send('Data saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving meet');
  }
});

const deleteMeet = ('', async (req, res) => {
  try {
    const idParams = req.params.id;
    const meet = await meetModel.findByIdAndDelete(idParams);
    if (!meet) {
      res.status(404).send('meet not found');
      return;
    }
    res.send('meet deleted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting meet');
  }
});

const updatedMeet = ('', async (req, res) => {
  try {
    const idParams = req.params.id;
    const { time, date, place } = req.body;

    const updatedMeet = await meetModel.findByIdAndUpdate(
      idParams,
      { time, date, place },
      { new: true },
    );
    if (!updatedMeet) {
      res.status(404).send('meet not found...');
      return;
    }
    res.status(200).send(updatedMeet);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating meet');
  }
});

module.exports = {
  getMeetings,
  getMeetId,
  addMeet,
  deleteMeet,
  updatedMeet
};
