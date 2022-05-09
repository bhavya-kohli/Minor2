const mongoose =require('mongoose');

const FacultySchema=new mongoose.Schema({
   faculty_name:{
       type:String
   },
   faculty_subject:{
       type:String
   },
   faculty_id:{
    type:String,
   },
   department:{
    type:String
   }
});

module.exports=mongoose.model('Faculty',FacultySchema);