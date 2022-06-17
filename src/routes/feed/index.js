const MainDashboardRouter = require("express").Router()

MainDashboardRouter.route("/")
    .get(require("./feed.view.js"))

module.exports = MainDashboardRouter