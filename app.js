const express=require('express')
const app=express()
app.use(express.json())
const userRouter=require('./users/userrouter')
app.use('/api/user',userRouter);
app.listen(4000,()=>
{
    console.log("server started")
})