const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { Not_Found } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res) =>
  res.status(Not_Found).send({ message: "Requested resource not found" })
);

module.exports = router;
