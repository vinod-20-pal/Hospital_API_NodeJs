
const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

// Creating Doctor
module.exports.create = async function(req,res){
    try {
    
        console.log("request===========r",req.body);
        let user = await Doctor.findOne({username:req.body.username}).catch((error) => {
            console.log("===================error===========--------", error);
        });

        if(user){
            return res.status(409).json({
                message: 'Doctor Already Exists',
            });
        }

        user = await Doctor.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
        });

        return res.status(201).json({
            message: 'Doctor created successfully',
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Login Doctor
module.exports.createSession = async function (req, res) {

    try {
        let user = await Doctor.findOne({ username: req.body.username });

        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: "Invalid UserName or Password"
            });
        }

        console.log("user data===", user.toJSON());
        return res.status(200).json({
            message: "Sign in successful. Here is your token, please keep it safe",
            data: {
                    token: jwt.sign(user.toJSON(),'vinodpal',{expiresIn:'1000000'})
                }
            }
        )
    } 
    catch (error) {

        console.log('Error', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
