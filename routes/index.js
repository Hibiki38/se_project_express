const router = require("express").Router();
const userRouter = require("./users");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");
const itemRouter = require("./clothingItem");

const { userLogin, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-err");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", validateAuthentication, userLogin);
router.post("/signup", validateUserBody, createUser);
router.use((req, res, next) => next(new NotFoundError("Resource Not Found")));

module.exports = router;
