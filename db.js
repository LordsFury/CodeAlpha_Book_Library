const mongoose=require('mongoose');
var url = "mongodb://localhost:27017/bookslibrary?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo=()=>{
    mongoose.connect(url);
};

module.exports = connectToMongo;