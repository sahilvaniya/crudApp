const mongoose = require('mongoose');
 
const connectDB = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
             useNewUrlParser: true,
            //  useUnfiedToplogy: true,
            // useFindAndModify: false,
            // useCreateIndex: true             
        })
        console.log(`mongoDB connected:${con.connection.host}`)
    }catch(err){
       console.log(err)
    }

}
module.exports=connectDB