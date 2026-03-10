export const validateLogin = (req, res, next) => {
    if(req.session.user?.loggedIn) return next();
    return res.status(401).json({ message: 'Unauthorized' });
    // res.render('error')
}