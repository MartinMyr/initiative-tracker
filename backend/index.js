const express = require('express');
const mongoose = require('mongoose');
const Initiative = require('./models/initiative.model');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

const uri="mongodb+srv://martin:bzEzDdPmUwJWKboD@cluster0.ytaqflz.mongodb.net/?retryWrites=true&w=majority";

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

    res.status(200).json(updatedInitiative);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

app.delete('/initiative/:id', async(req,res) => {
  try {
    const {id} = req.params;
    const initiative = await Initiative.findByIdAndDelete(id);

    if(!initiative){
      return res.status(404).json({message: `Cannot find initiative for id ${id}`})
    }

    res.status(200).json({message: `Deleted initiative: ${id}`});
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

connect();



app.listen(8000, () => {
   console.log("Server started");
});