module.exports = async (req, res) => {
    res.render('feed', { user: req.verifiedUser.user });
}