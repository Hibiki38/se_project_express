const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", () => {
  console.log("Get userId");
});
router.post("/", () => {
  console.log("create a new user");
});

module.exports = router;
