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
                    requestsRecieved: user.id,
                },
            }
        );
        await User.findOneAndUpdate(
            { _id: user.id },
            {
                $push: {
                    requestsSent: associateId,
                },
            }
        );

        res.json({msg : "Request sent successfully "});

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
                    requestsRecieved: associateId,
                },
                $push: {
                    associates: associateId,
                },
            }
        );
        await User.findOneAndUpdate(
            { _id: associateId },
            {
                $pull: {
                    requestsSent: user.id,
                },
                $push: {
                    associates: user.id,
                },
            }
        );

        res.json({msg : "Request accepted successfully"})
    } catch (error) {
        handleError(res, error);
    }

}

module.exports = { getProfile, sendRequest, acceptRequest }