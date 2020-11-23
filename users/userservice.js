const pool=require('../config/database')
module.exports={
    create:(data,callback)=>
    {
        pool.query(`insert into registration(firstname,lastname,gender,email,password,number)
        values(?,?,?,?,?,?)`,
        [
            
            data.firstname,
            data.lastname,
            data.gender,
            data.email,
            data.password,
            data.number
        ],(error,result,fields)=>
        {
            if(error)
            {
                return callback(error);
            }
            return callback(null,result);
        });
    },
    getUser: callback =>
    {
        pool.query(`select * from registration`,[],
        (err,result,fields)=>
        {
            if(err)
            {
                return callback(err)
            }
            return callback(null,result);
        });
    },
    getUserbyId:(id,callback) =>
    {
        pool.query(`select * from registration where id=?`,[id],
        (err,result,fields)=>
        {
            if(err)
            {
                return callback(err)
            }
            return callback(null,result[0]);
        });
    },
    updateUser:(data,callback) =>
    {
        pool.query(`update registration set firstname=?, lastname=?,gender=?,email=?,password=?,number=? where id=?`,
         [
            data.firstname,
            data.lastname,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],(err,result,fields)=>
        {
            if(err)
            {
                return callback(err);
            }
            return callback(null,result[0]);
        });
    },
    deleteUser:(data,callback) =>
    {
        pool.query(`delete from registration where id=?`,
        [data.id],(err,result,fields)=>
        {
            if(err)
            {
                return callback(err)
            }
            return callback(null,result[0]);
        });
    },
    getUserbyUseremail:(email,callback)=>
    {
        pool.query(`select * from registration where email=?`,[email],(err,results,fields)=>
        {
            if(err)
            {
                return callback(err)
            }
            return callback(null,results[0])
        })
    }
};