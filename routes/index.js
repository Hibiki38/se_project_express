const router = require("express").Router();
const userRouter = require("./users");
const { validateCardBody } = require("../middlewares/validation");
const itemRouter = require("./clothingItem");

const { userLogin, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-err");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signin", userLogin, validateCardBody);
router.post("/signup", createUser, validateCardBody);
router.use((req, res, next) => next(new NotFoundError("Resource Not Found")));

module.exports = router;
