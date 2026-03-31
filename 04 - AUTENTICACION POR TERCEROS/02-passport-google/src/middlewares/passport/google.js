import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { userService } from "../../services/user-service.js";

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/users/oauth2/redirect/accounts.google.com',
    scope: ['profile', 'email'],
    state: true
}

const registerOrLogin = async(accesToken, refreshToken, profile, done) =>{
    try {
        // console.log(profile);
        const email = profile._json.email;
        const user = await userService.getByEmail(email);
        if(user) return done(null, user);
   
        const newUser = await userService.register({
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            email,
            password: ' ',
            //image: profile._json.picture,
            isGoogle: true
        })
        return done(null, newUser);
    } catch (error) {
        return done(error, false)
    }
}

passport.use('google', new Strategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done)=>{
    //req.session.passport.user  --> _id
    try {
        done(null, user._id);
    } catch (error) {
        done(error, false);
    }
})

passport.deserializeUser(async(id, done)=>{
    try {
        const user = await userService.getById(id);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
})