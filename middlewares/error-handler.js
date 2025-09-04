const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);

  return res
    .status(err.status || 500)
    .json({ message: err.message || "An error occurred on the server" });
};

module.exports = errorHandler;
