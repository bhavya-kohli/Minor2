const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://appdev:bhavya25@cluster0.6ifcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected");
}).catch((e)=>{
    console.log("error");
    throw new Error(e);
})