const router = require("express").Router();

const { getProfile, sendRequest, acceptRequest } = require("../controllers/user")

router.get("/profile", getProfile);

router.post("/request/:id", sendRequest);

router.post("/accept/:id", acceptRequest);

module.exports = router;
