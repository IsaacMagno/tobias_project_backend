router = require("express").Router();
const championsController = require("../controllers/championsController");
const statisticsController = require("../controllers/statisticsController");
const activitiesController = require("../controllers/activitiesController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");

router.get("/", championsController.getAll);

router.put("/stats/:id", statisticsController.updateStatistics);

router.put("/activities/:id", activitiesController.updateActivities);

router.get("/uploads", filesController.getAllFiles);

router.post("/uploads", uploadImage.single("file"), filesController.uploadFile);

module.exports = router;
