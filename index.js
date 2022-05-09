const express=require('express');
const app=express();
require('dotenv').config();
const db=require('./db');
const bodyParser = require('body-parser');
const Course=require('./models/Course');
const Faculty=require('./models/faculty');
const CourseDescription=require('./models/CourseDescription');
const OpeningReport=require('./models/OpeningReport');
const CoPo=require('./models/Co_Po');
var courses_dict={
    "123456":{
        course_code:"123456",
        course_name:"software eng.",
        course_credits:"4",
        contact_hours:"4",
        Branch:"CSE/IT",
        course_outcome:[
            {index:"1",Description:"its a co1",cognitive_level:"co1"},
            {index:"2",Description:"its a co2",cognitive_level:"co2"},
            {index:"3",Description:"its a co3",cognitive_level:"co3"},
            {index:"4",Description:"its a co4",cognitive_level:"co4"},
        ],
        faculty_table:[
            {faculty_name:"bhawna",faculty_subject:"software eng.",faculty_id:"123",department:"CSE/IT"},
            {faculty_name:"amit",faculty_subject:"software eng.",faculty_id:"124",department:"CSE/IT"},
            {faculty_name:"seema",faculty_subject:"software developement",faculty_id:"125",department:"CSE/IT"},
            {faculty_name:"aneeta",faculty_subject:"software fundamentals",faculty_id:"126",department:"CSE/IT"},
            {faculty_name:"gautam",faculty_subject:"software developemnt",faculty_id:"127",department:"CSE/IT"},
        ]
    },

    "123457":{
        course_code:"123457",
        course_name:"cn/iot",
        course_credits:"4",
        contact_hours:"4",
        Branch:"CSE/IT",
        course_outcome:[
            {index:"1",Description:"its a co1",cognitive_level:"co1"},
            {index:"2",Description:"its a co2",cognitive_level:"co2"},
            {index:"3",Description:"its a co3",cognitive_level:"co3"},
            {index:"4",Description:"its a co4",cognitive_level:"co4"},
        ],
        faculty_table:[
            {faculty_name:"bhawna",faculty_subject:"software eng.",faculty_id:"123",department:"CSE/IT"},
            {faculty_name:"amit",faculty_subject:"software eng.",faculty_id:"124",department:"CSE/IT"},
            {faculty_name:"seema",faculty_subject:"software developement",faculty_id:"125",department:"CSE/IT"},
            {faculty_name:"aneeta",faculty_subject:"software fundamentals",faculty_id:"126",department:"CSE/IT"},
            {faculty_name:"gautam",faculty_subject:"software developemnt",faculty_id:"127",department:"CSE/IT"},
        ]
    },
    "123458":{
        course_code:"123458",
        course_name:"VLSI",
        course_credits:"4",
        contact_hours:"4",
        Branch:"ECE",
        course_outcome:[
            {index:"1",Description:"its a co1",cognitive_level:"co1"},
            {index:"2",Description:"its a co2",cognitive_level:"co2"},
            {index:"3",Description:"its a co3",cognitive_level:"co3"},
            {index:"4",Description:"its a co4",cognitive_level:"co4"},
        ],
        faculty_table:[
            {faculty_name:"bhawna",faculty_subject:"Electrical",faculty_id:"128",department:"ECE"},
            {faculty_name:"amit",faculty_subject:"Electrical",faculty_id:"124",department:"ECE"},
            {faculty_name:"seema",faculty_subject:"Electrical",faculty_id:"125",department:"ECE"},
            {faculty_name:"aneeta",faculty_subject:"Electrical",faculty_id:"126",department:"ECE"},
            {faculty_name:"gautam",faculty_subject:"Electrical",faculty_id:"127",department:"ECE"},
        ]
    },
}


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post('/api/enterCourseCode',async(req,res)=>{
    const course=await Course(req.body);
    await course.save().then((course)=>{
        res.status(201).send({"message":"success"});
    }).catch(err=>{
        res.status(400).send({"error":"success"});
    })
})

app.post('/api/enterCourseDescription',async(req,res)=>{
    var obj1={
        "Module_table":req.body.Module_table,
        // "text_Book_table":req.text_Book_table,
        "semester":req.body.semester,
        // "reference_books_table":req.body.reference_books_table
    }
    var Coursedescription=await CourseDescription(obj1);
    var obj={
        "course_code":req.body?.course_code,
        "course_name":req.body?.course_name,
        "contact_hours":req.body?.course_hours,
        "course_credits":req.body?.course_credits,
        "Branch":req.body?.Branch,
        "course_outcome":req.body.course_outcome,
        "faculty_table":req.body.faculty_table
    }
    var course=await Course(obj);
    await course.save().then(course=>{
        console.log("course step success");
        Coursedescription.course_ref=course._id;
    }).catch(err=>{
        throw new Error(err.message);
    })
    await Coursedescription.save().then((course)=>{
        res.status(201).send({"message":"success"});
    }).catch(err=>{
        res.status(400).send({"error":err.message});
    })
})

app.get('/api/getCourseDescription/:id',async(req,res)=>{
    await CourseDescription.findById({_id:req.params.id}).populate('course_ref').exec()
    .then(cd=>{
        console.log(cd);
        res.status(200).send({"message":cd});
    }).catch(err=>{
        res.status(404).send({"error":err,message});
    })
})

app.post('/api/postOpeningreport',async(req,res)=>{
    const openingreport=await OpeningReport(req.body);
    await Course.findOne({course_code:req.body.course_code}).exec()
    .then(async (course)=>{
        openingreport.course_ref=course._id;
        const co_po=await CoPo({po_pso_table:req.body.co_po_ref});
        co_po.course_ref=course._id;
        await co_po.save().then(instance=>{
            console.log(instance);
            openingreport.co_po_ref=instance._id;
        }).catch(err=>{
            throw new Error("problem at co_poEnd");
        })
        await openingreport.save().then((or)=>{
            console.log(or);
            res.status(201).send({"message":"success"})
        })
    }).catch(err=>{
        console.log(err.message);
        res.status(404).send({"error":err.message});
    })

})

app.get('/api/getOpeingReport/:id',async(req,res)=>{
    await OpeningReport.findById({_id:req.params.id}).populate('co_po_ref').populate("course_ref").exec()
    .then(or=>{
        res.status(200).send({"message":or});
    }).catch(err=>{
        console.log(err.message)
        res.status(404).send({"err":err.message});
    })
})

app.listen(3000,()=>{
    console.log("Connected at port 3000");
})