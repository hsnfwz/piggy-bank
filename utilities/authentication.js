const isAuthenticated = (req, res, next) => {
  const isAuthenticated = req.session && req.session.user;
  if (!isAuthenticated) return res.json({ message: 'Not authenticated.', user: undefined });
  next();
}

module.exports = {
  isAuthenticated,
};