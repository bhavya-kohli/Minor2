const mongoose =require('mongoose');

const OpeningReportSchema=new mongoose.Schema({

    course_ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    semester:{
        type:Number
    },
    Program_name:{
        type:String
    },
    Year:{
        type:String
    },
    co_po_ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CoPo"
    },
    gap_table:{
        type:[{
            topic:{
                type:String
            },
            strengthen_cos:[{type:String}],
            strengthen_pos:[{type:String}],
            method:{
                type:String,
            }
        }]
    },
    modification_table:[{
        details:{
            type:String
        },
        Justification:{
            type:String
        },
        strengthen_pos:String
    }],
    innovation_teching_and_methods_to_be_used:{
        type:String
    },
    Actions_for_improving_Co_table:[{
        cos:{
            type:String
        },
        attainments:{type:String},
        actions_to_be_taken:{
            type:string
        }

    }],
    strategies_for:[{type:String}],
    innovation_evaluation_strategy:{
        type:String
    },
    Module_coordinator:{
        type:String
    },
    Signature:{
        type:String
    }
  
});

module.exports=mongoose.model('OpeningReport',OpeningReportSchema);