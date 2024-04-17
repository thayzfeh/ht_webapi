const User = require("../models/User")




module.exports = async(id) =>{
    const select = new Promise(async(resolve, reject) =>{
        
        console.log("userByID id", id);
        
        const user = await User.findById(id);
        
        console.log('userByID user', user);
        
        resolve(user)

        console.log('userByID resolve promise ', resolve(user));
    })
    return await select.then((x) => x.data)
}