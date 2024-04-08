const User = require("../models/User")




module.exports = async(id) =>{
    const select = new Promise(async(resolve, reject) =>{
        const user = await User.findById(id);
        resolve(user)
    })
    return select.then((x) => x.data)
}