const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-Error");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => next(err));
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user.userId })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    next(new BadRequestError("Invalid item ID"));
  }
  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user.userId.toString()) {
        throw new Error("Permission denied");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Inavlid data"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Inavlid data"));
      }
      if (err.message === "Permission denied") {
        return next(new ForbiddenError("Permission Error"));
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    next(new BadRequestError("Invalid item ID"));
  }
  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user.userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Inavlid data"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Inavlid data"));
      }
      return next(err);
    });
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    next(new BadRequestError("Invalid item ID"));
  }
  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user.userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Inavlid data"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Inavlid data"));
      }
      return next(err);
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
