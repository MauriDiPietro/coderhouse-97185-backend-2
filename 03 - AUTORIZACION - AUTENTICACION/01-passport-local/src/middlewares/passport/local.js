import passport from "passport";
import { Strategy } from "passport-local";
import { userService } from "../../services/user-service.js";

const strategyConfig = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}

const register = async(req, email, password, done) =>{
    try {
        const newUser = await userService.register(req.body);
        return done(null, newUser);
    } catch (error) {
        return done(error, false)
    }
}

const login = async(req, email, password, done) =>{
    try {
        const user = await userService.login(email, password);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}

const registerStrategy = new Strategy(strategyConfig, register);
const loginStrategy = new Strategy(strategyConfig, login);

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

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