const mongoose =require('mongoose');

const CourseDescriptionSchema=new mongoose.Schema({
   course_ref:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Course"
   },
   Module_table:{
       type:[{module_no:{
           type:Number
       },
       title:{
           type:String
       },
       topic:{
        type:String
       },
       no_of_lectures:{
        type:Number
    }
    }]
   },
   text_Book_table:{
       type:[{
           text_book:{
               type:String
           }
       }]
   },
   reference_books_table:{
       type:[{
        text_book:{
            type:String
        }
       }]
   },
   semester:{
       type:String
   }
});

module.exports=mongoose.model('CourseDescription',CourseDescriptionSchema);