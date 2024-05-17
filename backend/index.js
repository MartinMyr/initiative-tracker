const express = require('express');
const mongoose = require('mongoose');
const Initiative = require('./models/initiative.model');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

require('dotenv').config()

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: "eu",
  useTLS: true
});

var app = express();
app.use(bodyParser.json());
app.use(cors());

const uri=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

function triggerEvent() {
  pusher.trigger("tracker-channel", "update-initiative", {
    message: "updated initiative"
  });
}

async function connect() {
  try {
    await mongoose.connect(uri, {dbName: "gloomhaven"});
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
}

app.get('/initiatives', async(req, res) => {
  try {
    const initiative = await Initiative.find({}).sort({'initiative': 1});
    res.status(200).json(initiative)
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.post('/initiative', async(req, res) => {
  try {
    var obj = req.body;
    var id = obj._id ?? new mongoose.Types.ObjectId();
    delete obj._id;

    await Initiative.updateOne({_id: id}, obj, {upsert: true});

    const updatedInitiative = await Initiative.findById(id);
    
    triggerEvent();

    res.status(200).json(updatedInitiative);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

app.delete('/initiatives', async(req,res) => {
  try {
    const initiative = await Initiative.deleteMany({});

    res.status(200).json({message: 'Successfullt deleted all'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

app.delete('/initiative/:id', async(req,res) => {
  try {
    const initiative = await Initiative.deleteOne({_id: req.params.id});

    res.status(200).json({message: 'Successfullt deleted'});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

connect();



app.listen(3000, () => {
   console.log("Server started");
});