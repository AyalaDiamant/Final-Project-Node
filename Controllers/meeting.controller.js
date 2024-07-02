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

const getMeetbyUserId = ('', async (req, res) => {
  try {
    const userId = req.params.id;
    const meetings = await meetModel.find({ userId }); 
    // console.log(meetings);
    if (!meetings.length) {
      res.status(404).send('meet not found');
      return;
    };
    res.send(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving meetings');
  }
});

const addMeet = ('', async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const newMeet = new meetModel({
      _id: id++,
      userId: req.user._id,
      time: data.time,
      date: data.date,
      place: data.place,
      common: data.common
    });
    const selectedDateTime = new Date(`${data.date} ${data.time}`); // יצירת אובייקט תאריך ושעה
    if(selectedDateTime < new Date())
      return res.status(201).send('The time has passed, choose another time.');
    const existingMeet = await meetModel.findOne({ time: data.time, date: data.date });
    if (existingMeet) {
      return res.status(201).send('Please choose another time.');
    }
    await newMeet.save();
    res.status(200).send('Data saved successfully!');
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
  getMeetbyUserId,
  addMeet,
  deleteMeet,
  updatedMeet
};
