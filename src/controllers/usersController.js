const db = require('../../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let User = db.user;

// console.log('PROCESS ENV :', process.env)
const secretKey = process.env.SECRET_KEY;
console.log("secretKey",secretKey);


const auth = async (req, res) => {
    try {
    const {username,password} = req.body
    const user = await User.findOne({
      where: {
        username: username,
      }
    });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch || !user) {
        res.status(400).json({ success: false, message: 'Invalid username or password'});

    }

    const responseData = { ...user.get(), password: undefined ,isActive:undefined,id:undefined};
    const token = jwt.sign(responseData, secretKey, { expiresIn: '1h' });
    	res.status(200).json({ success: true, data:responseData,token });

    } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while logging in'});
    }
};

const createUser = async (req, res) => {
    try {
    const {name,username,password} = req.body
    const user = await User.findOne({
      where: {
        username: username,
      }
    });

    if(user){
        res.send({ message: "User is already registerd" });
    }else{

    const response = await User.create({name:name,username:userName,password:password,isActive:"0"})

	res.status(200).json("Account has been created!! Please Login");
    }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong'});
    }
};

const getDetails = async (req, res) => {
  let loginUserName = req?.user?.username

    try {

    const users= await User.findAll({
      attributes: { exclude: ['password','isActive'] }, 
    })

    if(!users){
        res.status(200).json("No users available");
    }

    let userExisted=users.some((value)=> value.username === loginUserName)

    if(userExisted){
          res.status(200).json({ success: true, data:users });
    }
    } catch (error) {
      console.log("error::",error);
        res.status(500).json({ success: false, message: 'Something went wrong'});
    }
};

module.exports={
    auth,
    createUser,
    getDetails
}