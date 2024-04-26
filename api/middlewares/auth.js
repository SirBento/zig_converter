const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/index');


// verify if User is logged in
function verify(req,res,next){
  const authHeader = req.headers.authorization;

  try {
    if(authHeader){
      const token = authHeader.split(" ")[1];

      jwt.verify(token, JWT_SECRET, (err, user) => {
          if(err){
            return res.status(403)
          }
          req.user = user
          next();
      })
  }else{
      return res.status(401).json("Not authenticated!")
  }
  } catch (error) {
    console.log(error);
  }
}

// Allow other system users that are not registered as Clients or Transporters
function verifyAndAllow(req, res, next){
    verify(req, res, () => {
        if(req.user.role){
            next();
        }else{
          return res.status(403).json({msg:"You are restricted to perform this action"})
        }
    })
}

module.exports = { verify, verifyAndAllow };