const router = require("express").Router();

const { createGroup , findGroupById , findGroupByName , addMemberToGroup ,removeFromGroup, deleteGroup} = require("../controllers/groups-controller")

//    /
router.post("/" , createGroup)

//    /findGroupById/:id
router.get("/id/:id" , findGroupById)

//    /findGroupByName/?groupName=
router.get("/name/:name" , findGroupByName)

//    /addMemberToGroup/
router.post("/member" , addMemberToGroup)

//   /removeFromGroup/
router.delete("/member" , removeFromGroup)

//    /deleteGroup/:id/  
router.delete("/:id" , deleteGroup)




module.exports = router