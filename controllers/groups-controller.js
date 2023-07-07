const User = require("../models/users-model");
const Group = require("../models/groups-model");
const handleError = require("../functions/handleError");


//    /createGroup/?groupName=
const createGroup = async (req, res) => {
    const user = req.user
    const adminId = user.id
    const groupName = req.query.groupName

    try {

        const newGroup = await Group.create({ name: groupName })

        // add the current user to the created group as the admin
        const groupAdmin = await Group.findOneAndUpdate({ _id: newGroup.id },
            {
                $push: {
                    users: {
                        user: adminId,
                        admin: true
                    }
                }
            }
        )

        // add the created group's id to user's group array
        await User.findOneAndUpdate(
            { _id: adminId },
            {
                $push: {
                    groups: newGroup._id,
                },
            }
        );

        res.json({ msg: "Group created successfully" })

    }
    catch (error) {
        handleError(res, error);
    }
}

//    /findGroupById/:id
const findGroupById = async (req, res) => {
    // const user = req.user
    const groupId = req.params.id

    try {
        const thisGroup = await Group.findById({ _id: groupId })

        res.json({ thisGroup })

    }
    catch (error) {
        handleError(res, error);
    }
}

//    /findGroupByName/?groupName=
const findGroupByName = async (req, res) => {
    const groupName = req.query.groupName

    try {
        const thisGroup = await Group.findOne({ name: groupName })
        res.json({ thisGroup })

    }
    catch (error) {
        handleError(res, error);
    }
}

//    /addMemberToGroup/:id/?groupName=
const addMemberToGroup = async (req, res) => {
    const memberId = req.params.id
    const groupName = req.query.groupName

    try {
        // add this member to the group's users array
        const thisGroup = await Group.findOneAndUpdate({ name: groupName },
            {
                $push: {
                    users: {
                        user: memberId,
                    }
                }
            }
        )
        if (!thisGroup) {
            res.json({ msg: " Invalid group name " })
        }

        // add the group id to the user's group array
        const newMember = await User.findOneAndUpdate(
            { _id: memberId },
            {
                $push: {
                    groups: thisGroup._id,
                },
            }
        );

        if (!newMember) {
            res.json({ msg: " Invalid member " })
        }

        res.json({ msg: " Member added successfully" })

    }
    catch (error) {
        handleError(res, error);
    }

}

//   /removeFromGroup/:idg/:idm
const removeFromGroup = async (req, res) => {
    const groupId = req.params.idg
    const memberId = req.params.idm

    // console.log(groupId)
    // console.log(memberId)

    // const groupId =  mongoose.Types.ObjectId(req.query.idg)
    // const memberId = mongoose.Types.ObjectId(req.query.idm)

    try {
        const thisGroup = await Group.findOne({ _id: groupId })

        // remove member from groups user array 
        for (var j = 0; j < thisGroup.users.length; j++) {
            const thisMemberId = thisGroup.users[j].user
            // console.log(thisMemberId)
            if (thisMemberId == memberId) {
                await Group.findOneAndUpdate(
                    { _id: groupId },
                    {
                        $pull: {
                            users: {
                                user: memberId,
                            }
                        }
                    }
                )
            }
        }
        // remove group from user's groups array 
        await User.findOneAndUpdate(
            { _id: memberId },
            {
                $pull: {
                    groups: groupId,
                }
            }
        )

        res.json({ msg: " Member removed successfully " })
    }
    catch (error) {
        handleError(res, error);
    }

}

//   /deleteGroup/:id
const deleteGroup = async (req, res) => {
    const groupId = req.params.id

    try {
        const thisGroup = await Group.findOne({ _id: groupId })
        // console.log(thisGroup)
        
        // first traverse group's user array and delete groups id from thier groups array 
        for (var j = 0; j < thisGroup.users.length; j++) {

            const thisMemberId = thisGroup.users[j].user;
            console.log(thisMemberId)

            await User.findOneAndUpdate(
                { _id: thisMemberId },
                {
                    $pull: {
                        groups: thisGroup._id,
                    },
                }
            );
        }
        // now delete group from the group schema
        const endGroup = await Group.findByIdAndRemove({ _id: thisGroup.id })

        res.json({ msg: " Group deleted successfully " })

    }
    catch (error) {
        handleError(res, error);
    }

}



module.exports = { createGroup, findGroupById, findGroupByName, addMemberToGroup, removeFromGroup, deleteGroup }