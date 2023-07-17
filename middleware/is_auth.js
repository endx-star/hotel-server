const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    isAuth = false;
    return next();
  }
  // try {
  //   const decodedToken = jwt.verify(token, "supersecretkey");
  // } catch (err) {
  //   isAuth = false;
  //   return next();
  // }
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  if (!decodedToken) {
    isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.hotelId = decodedToken.hotelId;
  next();
};
