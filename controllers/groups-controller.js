const User = require("../models/users-model");
const Group = require("../models/groups-model");
const handleError = require("../functions/handleError");

//    /createGroup/?groupName=
const createGroup = async (req, res) => {
    const user = req.user;
    const adminId = user.id;
    const { groupName } = req.body;

    try {
        const newGroup = await Group.create({ name: groupName });

        // add the current user to the created group as the admin
        const groupAdmin = await Group.findOneAndUpdate(
            { _id: newGroup.id },
            {
                $push: {
                    users: {
                        user: adminId,
                        admin: true,
                    },
                },
            }
        );

        // add the created group's id to user's group array
        await User.findOneAndUpdate(
            { _id: adminId },
            {
                $push: {
                    groups: newGroup._id,
                },
            }
        );

        res.json({ message: "Group created successfully" });
    } catch (error) {
        handleError(res, error);
    }
};

//    /findGroupById/:id
const findGroupById = async (req, res) => {
    // const user = req.user
    const groupId = req.params.id;

    try {
        const thisGroup = await Group.findById({ _id: groupId });

        res.json({ thisGroup });
    } catch (error) {
        handleError(res, error);
    }
};

//    /findGroupByName/?groupName=
const findGroupByName = async (req, res) => {
    const groupName = req.params.name;

    try {
        const thisGroup = await Group.findOne({ name: groupName });
        res.json({ thisGroup });
    } catch (error) {
        handleError(res, error);
    }
};

//    /addMemberToGroup/:id/?groupName=
const addMemberToGroup = async (req, res) => {
    const userId = req.user.id
    const { memberId, groupId } = req.body;

    try {
        // add this member to the group's users array
        const thisGroup = await Group.findOne({ _id: groupId });

        function checkAdmin(user) {
            return (user.user == userId && user.admin == true)
        }

        const result = thisGroup.users.filter(checkAdmin);

        console.log(result)

        if (result.length) {
            await Group.findOneAndUpdate(
                { _id: groupId },
                {
                    $push: {
                        users: {
                            user: memberId,
                            admin: false
                        },
                    },
                }
            )
        }
        else {
            res.json({ message: " User isn't admin " });
        }

        if (!thisGroup) {
            res.json({ message: " Invalid group name " });
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
            res.json({ message: " Invalid member " });
        }

        res.json({ message: " Member added successfully" });
    } catch (error) {
        handleError(res, error);
    }
};

const makeAdmin = async (req, res) => {
    const userId = req.user.id
    const { memberId, groupId } = req.body;

    try {
        // add this member to the group's users array
        const thisGroup = await Group.findOne({ _id: groupId });

        function checkAdmin(user) {
            return (user.user == userId && user.admin == true)
        }

        const result = thisGroup.users.filter(checkAdmin);

        if (result.length) {
            let newArray = thisGroup.users.map( (item)=> {
                if (item.user=== memberId)
                {
                    return {
                        user: memberId,
                        admin: true
                    }
                }  
                else{
                    return item
                }              
            })
            thisGroup.users = newArray

            await thisGroup.save()
            console.log(thisGroup)
        }
        else {
            res.json({ message: " User isn't admin " });
        }

        if (!thisGroup) {
           return  res.json({ message: " Invalid group name " })
        }

        res.json({ message: "Member made admin successfully" })
    } catch (error) {
        handleError(res, error);
    }

}

//   /removeFromGroup/:idg/:idm
const removeFromGroup = async (req, res) => {
    const userId = req.user.id
    const { memberId, groupId } = req.body;

    try {
        const thisGroup = await Group.findOne({ _id: groupId });

        function checkAdmin(user) {
            return (user.user == userId && user.admin == true)
        }

        const result = thisGroup.users.filter(checkAdmin);
        // console.log(result)

        // remove member from groups user array
        if (result.length) {
            await Group.findOneAndUpdate(
                { _id: groupId },
                {
                    $pull: {
                        users: {
                            user: memberId,
                        },
                    },
                }
            );
        }
        else {
            res.json({ message: " User isn't admin " });
        }

        if (!thisGroup) {
            res.json({ message: " Invalid group name " });
        }


        // remove group from user's groups array
        await User.findOneAndUpdate(
            { _id: memberId },
            {
                $pull: {
                    groups: groupId,
                },
            }
        );

        res.json({ message: " Member removed successfully " });
    } catch (error) {
        handleError(res, error);
    }
};

//   /deleteGroup/:id
const deleteGroup = async (req, res) => {
    const groupId = req.params.id;

    try {
        const thisGroup = await Group.findOne({ _id: groupId });
        // console.log(thisGroup)

        // first traverse group's user array and delete groups id from thier groups array
        for (var j = 0; j < thisGroup.users.length; j++) {
            const thisMemberId = thisGroup.users[j].user;
            console.log(thisMemberId);

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
        const endGroup = await Group.findByIdAndRemove({ _id: thisGroup.id });

        res.json({ message: " Group deleted successfully " });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    createGroup,
    findGroupById,
    findGroupByName,
    addMemberToGroup,
    makeAdmin,
    removeFromGroup,
    deleteGroup,
};
