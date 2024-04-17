const User = require("../models/User")




module.exports = async(id, exclude = "") =>{
    try {
        const user = await User.findById(id, exclude);  
        return user;
    } catch (error) {
        console.error("Error in userById:", error);
        throw error;
    }
}