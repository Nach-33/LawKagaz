const router = require("express").Router();
const User = require("../models/users-model");
const handleError = require("../functions/handleError");

router.get("/profile", (req, res) => {
  try {
    const user = req.user;
    res.json({ message: "successfully fetched user data", user });
  } catch (error) {
    handleError(res, error);
  }
});

router.post("/request/:id", async (req, res) => {
  try {
    const user = req.user;
    const associateId = req.params.id;
    await User.findOneAndUpdate(
      { _id: associateId },
      {
        $push: {
          requests: user.id,
        },
      }
    );
  } catch (error) {
    handleError(res,error);
  }
});
router.post("/accept/:id", async (req, res) => {
  try {
    const user = req.user;
    const associateId = req.params.id;
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
    handleError(res,error);
  }
});

module.exports = router;
