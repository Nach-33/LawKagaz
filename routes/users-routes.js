const router = require("express").Router();

const { getProfile, sendRequest, acceptRequest } = require("../controllers/users-controllers")

router.get("/", getProfile);

router.post("/request/:id", sendRequest);

router.post("/accept/:id", acceptRequest);

module.exports = router;
