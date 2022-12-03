/******************************************************************* 
    Authorization middleware - JSON web token - https://jwt.io/ 
********************************************************************/

const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    // Token in header request
    const authHeader = req.headers.authorization;

//  If the user has permission,
//  we declare the token and we check it, 
//  if there is not error --> next() 
//  otherwise we return a 403 status
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'secret_token_dev', (err, user) => {
            if (err) {
                return res.status(403);
            }
            next();
        });
    }
    // Otherwise, we return the status 401 - Unauthorized
    else {
        res.status(401).json({error:"Unauthorized!"});
    }
};