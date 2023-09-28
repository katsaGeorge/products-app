const User  = require('../models/user.model');

const logger = require('../logger/logger');

exports.findAll = async(req,res) => {
    console.log("Find all users");

   try{
      const result = await User.find();  
      logger.info("Log info success in reading all users");
      //  logger.log("Logger Success in reading all users");
      res.status(200).json({status:true, data: result});
    }catch(err){
         res.status(400).json({status:false,data: err})
    }

    
}
//the sync method
// exports.findAll = function(req,res){
//     console.log("Find all users");

//     User.find((err,result)=> {
//         if (err){
//             res.status(400).json({status:false, data:err})
//             console.log("Problem is reading all users");
//         }else{
//             res.status(200).json({status:true, data:result});
//             console.log("Success in reading all users");
//            }
//     })
// } 





exports.findOne = async(req,res) => {
    const username = req.params.username;
    console.log("Find user with username", username);
    try{

        const result = await User.findOne({username: username});
        res.status(200).json({status: true, data: result});
        
    }catch(err){
        res.status(400).json({status:false, data: err})
        console.log("Problen us reading with username ", username);
    }
}

    exports.create = async(req,res) => {
            console.log(req.body);
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            products: req.body.products
        })

        console.log("Insert user with username: ", req.body.username);

        try{
            const result = await newUser.save();
            res.status(200).json({status: true, data:result});
            console.log("Succes in inserting user with username ", req.body.username);

        }catch(err){
            res.status(400).json({status:false, data: err})
            console.log("Problen in inserting user with username ", req.body.username);
        }

    }

    exports.update = async(req, res)=>{
        const username = req.body.username;

        console.log("Update user with username ", username);
        
        const updateUser = {
            name : req.body.name,
            surname : req.body.surname,
            email: req.body.email,
            address : req.body.address,
            phone: req.body.phone
        }

        try{
            const result = await User.findOneAndUpdate({username: username}, upadateUser, {new:true})
            res.status(200).json({status: true, data:result});
            console.log("Succes in updateing user with username ", req.body.username);


        }catch(err){
            res.status(400).json({status:false, data:err})
            console.log("Problem in update user with username " ,username);
        }
    }

    exports.delete = async(req,res) => {
        
        const username = req.params.username;

        console.log("Delete user with username: ", username);

        try{
            const result = await User.findOneAndRemove({username: username});
            res.status(200).json({status: true, data:result});
            console.log("Succes in deleting user with username ", req.body.username);

        }catch(err){
            res.status(400).json({status:false, data:err})
            console.log("Problem in deleting user with username " ,username);
        }

    }
    
