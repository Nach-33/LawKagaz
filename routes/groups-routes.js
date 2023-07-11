const router = require("express").Router();

const { createGroup , findGroupById , findGroupByName , addMemberToGroup ,removeFromGroup, deleteGroup} = require("../controllers/groups-controller")

//    /createGroup/?groupName=
router.post("/createGroup/" , createGroup)

//    /findGroupById/:id
router.post("/findGroupById/:id" , findGroupById)

//    /findGroupByName/?groupName=
router.post("/findGroupByName/" , findGroupByName)

//    /addMemberToGroup/:id/?groupName=      
router.post("/addMemberToGroup/:id/" , addMemberToGroup)

//   /removeFromGroup/:idg/:idm
router.post("/removeFromGroup/:idg/:idm" , removeFromGroup)

//    /deleteGroup/:id/  
router.post("/deleteGroup/:id/" , deleteGroup)




module.exports = router