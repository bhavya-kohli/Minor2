const mongoose =require('mongoose');

const CoPoSchema=new mongoose.Schema({
   course_ref:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Course"
   },
   po_pso_table:{
       type:[{co:{type:String},pos:[{type:String}],attainment:{type:String}}]
   }
});

module.exports=mongoose.model('CoPo',CoPoSchema);