module.exports = (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).json({
      err: "Please provide username"
    })
    throw new Error("Please provide username")
  }
  if (!password) {
    res.status(400).json({
      err: "Please provide password"
    })
    throw new Error("Please provide password")
  }

  return next();
};