const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(401).json({msg: 'Acesso negado!'});
    }

    try{
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);
        req.decodedToken = decoded;
        next();
    }catch(e){
        res.status(400).json({msg: 'Token inválido!'});
    }
}