const {create,
    getUser,
    getUserbyId,
    updateUser,
    deleteUser,
    getUserbyUseremail}= require('./userservice');
const {genSaltSync,hashSync,compareSync}=require("bcrypt");
const {sign}=require("jsonwebtoken")
module.exports={
    createUser:(req,res)=>
    {
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connenction error"
                });
            }
            return res.status(200).json({
                success:1,
                data:result
            });
        });
    },
    getUserbyUserId:(req,res)=>{
        const id=req.params.id;
        getUserbyId(id,(err,result)=>
            {
                if(err)
                {
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:"Database connenction error"
                    });
                }
                if(!result)
                {
                    return res.json({
                        success:0,
                        message:"Record not found"
                    });
                }
                return res.status(200).json({
                    success:1,
                    data:result
                });
            });
        
    },
    getUsers:(req,res)=>
    {
        getUser((err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connenction error"
                });
            }
            return res.status(200).json({
                success:1,
                data:result
            });
        });
    },
    updateUser:(req,res)=>
    {
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUser(body,(err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connenction error"
                });
            }
            return res.json({
                success:1,
                message:"Successfully updated"
            });
        }); 
    },
    deleteUser:(req,res)=>
    {
        const data=req.body;
        deleteUser(data,(err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connenction error"
                });
            }
            return res.status(200).json({
                success:1,
                message:"Deleted successfully"
            });
        });
    },
    login:(req,res)=>
    {
        const body=req.body
        getUserbyUseremail(body.email,(err,results)=>
        {
            if(err)
            {
                console.log(err);
            }
        if(!results)
        {
            return res.json({
                success:0,
                data:"inavlid email"
            });
        }
        const result=compareSync(body.password,results.password)
        if(result)
        {
            results.password=undefined;
            const jsontoken=sign({result:results},"qwe1234",{expiresIn:"300s"});
            return res.json({
                success:1,
                message:"login sucessfully",
                token:jsontoken       
            });
        }
        else
        {
            return res.json({
                success:0,
                data:"invalid email or password"
            });
        }
        });
    }
};