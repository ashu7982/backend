
const express=require('express');
const app=express();
const cors=require('cors')
const {connection}=require('./db');
const {userRouter}= require('./routes/userRoute')
const {empRouter}=require('./routes/employeeRoute')




app.use(cors());
app.use(express.json());

app.use('/users',userRouter);
app.use('/employees',empRouter);



app.listen(8000,async()=>{
    try{
          await connection;
          console.log('connected to db');
          console.log('running at port 8000');
    }
    catch(err){
        console.log(err);
    }
})