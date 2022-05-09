const mongoose =require('mongoose');

const ClosingReportSchema=new mongoose.Schema({
   course_ref:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Course"
   },
   co_po_mapping_ref:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CoPo"
   },
   Summary_of_result_analysis:{
       no_of_students:[],
       percentage_of_student:[]
   },
   innovation_teaching_and_learning:{
       type:String
   },
   Innovation_evaluation_strategy:{
    type:String
    },
    suggestion_table:[{
        sno:{
            type:Number
        },
        Suggestion:{type:String},
        Relevance_to_co:{
            type:String
        },
        Relevance_to_po:{
            type:String
        }
    }]
});

module.exports=mongoose.model('ClosingReport',ClosingReportSchema);