const User = require("../models/User")




module.exports = async(id) =>{
    try {
        const user = await User.findById(id);  
        return user;
    } catch (error) {
        console.error("Error in userById:", error);
        throw error;
    }
}