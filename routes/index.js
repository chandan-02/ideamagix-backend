const express = require("express");
const adminRoute = require("./admin/index");
const instructorRoute = require("./instructor/index");

const router = express.Router();

const defaultRoutes = [
	{
		path: "/admin",
		route: adminRoute,
	},
	{
		path: "/instructor",
		route: instructorRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
