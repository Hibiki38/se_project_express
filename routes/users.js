const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");
const { getCurrentUser, updateProfile } = require("../controllers/users");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdate, updateProfile);

module.exports = router;
