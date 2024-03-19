const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type : String,
    required : true,
  },
  salary: {
    type : Number,
    required : true
  }
});

const Employe = mongoose.model("Employe" , schema)

module.exports = Employe
