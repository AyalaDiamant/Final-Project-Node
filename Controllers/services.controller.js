const serviceModel = require('../models/service.model');
let id = 1;

const getServices = ('', async (req, res) => {
  try {
    const services = await serviceModel.find();
    console.log(serviceModel);
    res.status(200).send(services);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving serviceings');
  }
});

const getServiceId = ('', async (req, res) => {
  try {
    const idParams = req.params.id;
    const service = await serviceModel.findById(idParams);
    if (!service) {
      res.status(404).send('service not found');
      return;
    };
    res.send(service);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving serviceings');
  }
});

const addService = ('', async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const newService = new serviceModel({
      _id: id++,
      price: data.price,
      description: data.description,
    });
    await newService.save();
    res.send('Data saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving service');
  }
});

const deleteService = ('', async (req, res) => {
  try {
    const idParams = req.params.id;
    const service = await serviceModel.findByIdAndDelete(idParams);
    if (!service) {
      res.status(404).send('service not found');
      return;
    }
    res.send('service deleted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting service');
  }
});

const updatedService = ('', async (req, res) => {
  try {
    const idParams = req.params.id;
    const { description, price } = req.body;
    const updatedService = await serviceModel.findByIdAndUpdate(
      idParams,
      { description, price },
      { new: true },
    );
    if (!updatedService) {
      res.status(404).send('service not found...');
      return;
    }
    res.status(200).send(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating service');
  }
});

module.exports = {
  getServices,
  getServiceId,
  addService,
  deleteService,
  updatedService
};