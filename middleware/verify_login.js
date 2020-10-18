// we want to combine verify_login && verify_registration --> can I find the route, so that I can base what it runs through on the endpoint? will always verify username and password bc they are always required, but if endpint is registration, it will keep verifying for email & permission?
// try req.url
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