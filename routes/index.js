const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItem");
const { NOt_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res) =>
  res.status(NOt_FOUND).send({ message: "Requested resource not found" })
);

module.exports = router;
