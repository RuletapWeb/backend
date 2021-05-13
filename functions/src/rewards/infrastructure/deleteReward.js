const { db } = require('../../../utils/firestore');

const { deleteRewardById } = require('../application/rewardFeatures');

const deleteReward = async (req, res) => {
    const { id } = req.params;
    const user = deleteRewardById(id);

    if(user){
        try {
            const result = await db.collection("users")
                .doc(user)
                .delete();
    
            res.status(200).json({
                result
            });
    
        } catch (error) {
            res.status(500).json({
                error
            });
        }
    }
    res.status(400).json({error: "Id inválido"})
};

module.exports = {
    deleteReward
}