const {createUser,getUserbyUserId,getUsers,updateUser,deleteUser,login}=require("./usercontroller");
const router=require('express').Router();
const {checktoken}=require('../auth/token_validation');
router.post('/',checktoken,createUser);
router.get('/:id',checktoken,getUserbyUserId);
router.get('/',checktoken,getUsers);
router.patch('/',checktoken,updateUser);
router.delete('/',checktoken,deleteUser);
router.post('/login',login);
module.exports=router;