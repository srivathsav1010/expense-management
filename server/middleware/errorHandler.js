/**
 * errorHandler — global Express error middleware.
 * Must be registered LAST with app.use().
 */
const errorHandler = (err, _req, res, _next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
