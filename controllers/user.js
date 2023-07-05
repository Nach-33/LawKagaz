const User = require("../models/users-model");
const handleError = require("../functions/handleError");

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.json({ message: "successfully fetched user data", user });
    } catch (error) {
        handleError(res, error);
    }
}

const sendRequest = async (req, res) => {
    const user = req.user;
    const associateId = req.params.id;
    try {
        await User.findOneAndUpdate(
            { _id: associateId },
            {
                $push: {
                    requests: user.id,
                },
            }
        );
    } catch (error) {
        handleError(res, error);
    }
}

const acceptRequest = async (req, res) => {
    const user = req.user;
    const associateId = req.params.id;
    try {
        await User.findOneAndUpdate(
            { _id: user.id },
            {
                $pull: {
                    requests: associateId,
                },
                $push: {
                    associates: associateId,
                },
            }
        );
    } catch (error) {
        handleError(res, error);
    }

}

module.exports = { getProfile, sendRequest, acceptRequest }