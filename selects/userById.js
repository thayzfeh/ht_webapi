const User = require("../models/User")




module.exports = async(id) =>{
    try {
        console.log("userByID id", id);
        
        const user = await User.findById(id);
        
        console.log('userByID user', user);
        
        return user;
    } catch (error) {
        console.error("Error in userById:", error);
        throw error;
    }
}