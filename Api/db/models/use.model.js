const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto  =require('crypto')
// jwt secret key

const jwtSecret  ='89343215007523674ffsfsds3223234242'
const UserScehma  = new mongoose.Schema({
        email:{
            type:String,
            required:true,
            minlength:1,
            trim:true,
            unique:true
        },
        password:{
                type:String,
                required:true,
        },
        sessions:[{
            token:{
                type:String,
                require:true,
            },
            expiresAt:{
                type:Number,
                required:true
            }
        }]
})

// Instance method 

UserScehma.methods.toJSON = function () {
        const user = this;
        const userObject  = user.toObject();
        //  return  the document excepts the password  and session (these should be made available)

    return _.omit(userObject,['password','sessions']);
}

UserScehma.methods.generateAccessAuthToken  = function(){
    const user  = this;
    return new Promise((resolve,reject)=>{
        // return jwt token 
        jwt.sign({_id:user._id.toHexString()},jwtSecret,{expiresIn:'15m'},(err,token)=>{
            if (!err) {
                resolve(token);
            } else {
                // when error
                reject();
            }
        })
    })
}

UserScehma.methods.generateRefreshAuthToken = function () {
    // this function genrate 64 bytes hex string it doesnot save it to the database savesessiondatabase() doing that
        return new Promise((resolve,reject)=>{
                crypto.randomBytes(64,(err,buff)=>{
                        if (!err) {
                                let token  = buff.toString('hex');
                                return resolve(token);
                        } else {
                            
                        }
                })
        })
}

UserScehma.methods.createSession  = function(){
    let user  = this;

    return user.generateRefreshAuthToken().then((refreshToken)=>{
        return savesessiondatabase(user,refreshToken);
    }).then((refreshToken)=>{
            // saved to database succesfully
            // now return the refresh  token
            return refreshToken;
    }).catch((e)=>{
        return Promise.reject("failed to save session to database \n",e);   
    })
}


//  model  method( static method)
UserScehma.statics.findByIdAndToken =  function (id,token) {
    // finds user by id and token 
    // used in auth middleware (verify session)
    const User = this;
        return User.findOne({
            _id,
            'session.token':token
        });
}

UserScehma.statics.findByCredentials= function (email,password) {
    let User = this;
}

let savesessiondatabase  = (user,refreshToken )=>{
    return new Promise((resolve,reject)=>{
        let expiresAt  = generateRefreshTokenExpiryTime();
        user.sessions.push({token:refreshToken,expiresAt});

        user.save().then(()=>{
            // save session successfully
                return resolve(refreshToken);
        }).catch((e)=>{
            reject(e);
        })
    })
}

let generateRefreshTokenExpiryTime = ()=>{
    let dayuntilExpire  =  "10";
    let secondsUnitExpire  =((dayuntilExpire*24)*60)*60;
    return ((Date.now()/1000)+secondsUnitExpire);
}