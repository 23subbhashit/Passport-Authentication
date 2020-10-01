const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport){

    const userAuthentication = (email,password,done)=>{
        const user = getUserByEmail(email);
        if(user==null){
            return done(null,false,{messeage : "No user with that email"});
        }
        try{
            if( await bcrypt.compare(password,user.password)){
                done(null,user);
            }
            else{
                return done(null,false,{messeage : "Password Incorrect"});
            }
        }
        catch(e){
            return done(e);
        }
    }; 
    passport.use( new localStrategy({ usernameField : 'email' }) , userAuthentication );
    passport.serializeUse((user,done) =>{

    });
    passport.deserializeUse((id,done) =>{

    });

}

module.exports =initialize