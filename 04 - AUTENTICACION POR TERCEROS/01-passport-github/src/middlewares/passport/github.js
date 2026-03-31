import passport from "passport";
import { Strategy } from "passport-github2";
import { userService } from "../../services/user-service.js";

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/users/profile'
}

const registerOrLogin = async(accesToken, refreshToken, profile, done) =>{
    try {
        // console.log(profile);
        const email = profile._json.email;
        const user = await userService.getByEmail(email);
        if(user) return done(null, user);
        const name = profile._json.name
        const newUser = await userService.register({
            first_name: name.split(' ')[0],
            last_name: name.split(' ').length > 2 ? `${name.split(' ')[1]} ${name.split(' ')[2]}` : name.split(' ')[1],
            email,
            password: ' ',
            isGithub: true
        })
        return done(null, newUser);
    } catch (error) {
        return done(error, false)
    }
}

passport.use('github', new Strategy(strategyConfig, registerOrLogin));

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