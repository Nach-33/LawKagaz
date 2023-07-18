const router = require("express").Router();

const { createGroup , findGroupById , findGroupByName , addMemberToGroup , makeAdmin,removeFromGroup, deleteGroup} = require("../controllers/groups-controller")

//    /
router.post("/" , createGroup)

//    /findGroupById/:id
router.get("/id/:id" , findGroupById)

//    /findGroupByName/?groupName=
router.get("/name/:name" , findGroupByName)

//    /addMemberToGroup/
router.post("/member" , addMemberToGroup)

//    /admin/         makes the member into admin
router.put("/admin" , makeAdmin)

//   /removeFromGroup/
router.delete("/member" , removeFromGroup)

//    /deleteGroup/:id/  
router.delete("/:id" , deleteGroup)




module.exports = router