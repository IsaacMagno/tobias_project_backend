router = require("express").Router();
const championsController = require("../controllers/championsController");
const statisticsController = require("../controllers/statisticsController");
const activitiesController = require("../controllers/activitiesController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");
const uploadPractice = require("../middlewares/uploadPractice");
const phrasesController = require("../controllers/phrasesController");
const calendarController = require("../controllers/calendarController");

router.get("/", championsController.getAll);

router.get("/phrases", phrasesController.getPhrases);

router.get("/calendars", calendarController.getCalendar);

router.get("/uploads", filesController.getAllFiles);

router.get("/practice/:id", filesController.getPractice);

router.put("/stats/:id", statisticsController.updateStatistics);

router.put("/activities/:id", activitiesController.updateActivities);

router.post("/calendars/:id", calendarController.createEvent);

router.post("/uploads", uploadImage.single("file"), filesController.uploadFile);

router.post(
  "/practice/:id",
  uploadPractice.single("file"),
  filesController.uploadPractice
);

router.post("/create-new-champion", championsController.createChampion);
router.post("/champion-login", championsController.championLogin);

router.delete("/calendars/:id", calendarController.deleteEvent);

module.exports = router;
