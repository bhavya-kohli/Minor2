const mongoose =require('mongoose');

const CourseSchema=new mongoose.Schema({
    course_code:{
        type:String,
        required:true
    },
    course_name:{
        type:String,
        
    },
    course_credits:{
        type:Number,
        
    },
    contact_hours:{
        type:Number,
        
    },
    Branch:{
        type:String,
        
    },
    course_outcome:{
        type:[{
            index:{
                type:String
            },
            Description:{
                type:String
            },
            cognitive_level:{
                type:String
            }
        }]
    },
    co_po_table_ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CoPo',
    },
    faculty_table:{
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
    }
});

module.exports=mongoose.model('Course',CourseSchema);