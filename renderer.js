// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("mongoose");

var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/my_database',{useMongoClient:true});

var Schema = mongoose.Schema,ObjectId = Schema.ObjectId;

var BlogPost = new Schema({
    author    : ObjectId,
    title     : String,
    body      : String,
    date      : Date
});


var MyModel = mongoose.model('BlogPost');

var instance = new MyModel();
instance.title = 'post001';
instance.save(function (err) {
  
});


MyModel.find({}, function (err, docs) {
  // docs.forEach 
  console.log(docs);
});
