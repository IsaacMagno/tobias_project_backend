router = require("express").Router();
const championsController = require("../controllers/championsController");
const statisticsController = require("../controllers/statisticsController");
const activitiesController = require("../controllers/activitiesController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");
const phrasesController = require("../controllers/phrasesController");
const calendarController = require("../controllers/calendarController");

router.get("/", championsController.getAll);

router.get("/phrases", phrasesController.getPhrases);

router.get("/calendars", calendarController.getCalendar);

router.get("/uploads", filesController.getAllFiles);

router.put("/stats/:id", statisticsController.updateStatistics);

router.put("/activities/:id", activitiesController.updateActivities);

router.post("/calendars/:id", calendarController.createEvent);

router.post("/uploads", uploadImage.single("file"), filesController.uploadFile);

module.exports = router;
