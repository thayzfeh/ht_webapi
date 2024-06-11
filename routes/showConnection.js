const userById = require("../selects/userById");

module.exports = async(req, res) =>{
    try {
        const senderPromises = req.sender.map(async (x) => {
            return await userById(x.receptor_id, "-_id -cpf -password -__v");
        });
        const pendingSenderPromisses = req.pendingSender.map(async (x) => {
            return await userById(x.receptor_id, "-_id -cpf -password -__v");
        });

        const pendingReceptorPromisses = req.pendingReceptor.map(async(x) =>{
            return {
                id: x._id,
                sender: await userById(x.sender_id, "-_id -cpf -password -__v")};
        });
        const receptorPromises = req.receptor.map(async(x) =>{
            return await userById(x.sender_id, "-_id -cpf -password -__v");
        });
        const sender = await Promise.all(senderPromises);
        const pendingSender = await Promise.all(pendingSenderPromisses);

        const receptor = await Promise.all(receptorPromises);
        const pendingReceptor = await Promise.all(pendingReceptorPromisses);

        res.status(200).json({ pending: {
            pendingSender, pendingReceptor
        },active: {
            sender, receptor
        }});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}