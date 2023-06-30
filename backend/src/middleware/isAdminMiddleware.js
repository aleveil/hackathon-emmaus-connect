function isAdminMiddleware(req, res, next) {
  if (!req.payload.user.isAdmin) {
    return res.status(401).json("Unauthorized access");
  }
  return next();
}

module.exports = isAdminMiddleware;
