const jwt = require('jsonwebtoken');
const { User } = require('../models');

const requireAuth = (req, res , next) =>{
    const token = req.cookies.jwt;

    // check and verify jwt

    if(token){
        jwt.verify(token ,  'birehClincJWT' , async (err, decodeToken)=>{
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodeToken);
                next();
            }
        }) 
    }else{
        res.redirect('/login');
    }
}

// check current user 

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token ,  'birehClincJWT' , async (err, decodeToken)=>{
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next()
            }else{
                console.log(decodeToken);
                let user = await User.findByPk(decodeToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next()
    }

}

const adminAuth = (req, res , next) =>{
    const token = req.cookies.jwt;
        if(token){
        jwt.verify(token ,  'birehClincJWT' , async (err, decodeToken)=>{
            if (err) {
                console.log(err.message);
                next()
            }else{
                console.log(decodeToken);
                let user = await User.findByPk(decodeToken.id);
                if(user && user.role == "admin"){
                    next()
                }else{
                    return res.status(403).json({meesage : "Access denied. Admin only. "});
                }
            }}
        )}
    }


module.exports = { requireAuth , checkUser , adminAuth}