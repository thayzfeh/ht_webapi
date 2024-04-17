const userById = require("../selects/userById");

module.exports = async(req, res) =>{
    try {
        const senderPromises = req.sender.map(async (x) => {
            return await userById(x.receptor_id, "-_id -cpf -password -__v");
        });
        const receptorPromises = req.receptor.map(async(x) =>{
            return await userById(x.sender_id);
        })
        const sender = await Promise.all(senderPromises);
        const receptor = await Promise.all(receptorPromises);

        res.status(200).json({ sender, receptor});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}