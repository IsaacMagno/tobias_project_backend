router = require("express").Router();
const championsController = require("../controllers/championsController");
const statisticsController = require("../controllers/statisticsController");
const activitiesController = require("../controllers/activitiesController");
const filesController = require("../controllers/filesController");
const uploadImage = require("../middlewares/uploadImage");
const uploadPractice = require("../middlewares/uploadPractice");
const phrasesController = require("../controllers/phrasesController");
const calendarController = require("../controllers/calendarController");
const taskController = require("../controllers/taskController");

router.get("/task", taskController.readTask);
router.get("/task/:id", taskController.readTask);
router.post("/task", taskController.createTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

router.get("/champions", championsController.getChampions);
router.get("/champions/:id", championsController.getChampions);
router.post("/create-new-champion", championsController.createChampion);
router.post("/champion-login", championsController.championLogin);
router.put("/champion/bio/:id", championsController.updateChampionBiography);
router.put("/champion/xp/:id", championsController.updateChampionExp);
router.put(
  "/champion/daystreak/:id",
  championsController.updateChampionDaystreak
);

router.get("/calendars", calendarController.getCalendar);
router.post("/calendars/:id", calendarController.createEvent);
router.delete("/calendars/:id", calendarController.deleteEvent);

router.get("/uploads", filesController.getAllFiles);
router.get("/practice/:id", filesController.getPractice);
router.post("/uploads", uploadImage.single("file"), filesController.uploadFile);
router.post(
  "/practice/:id",
  uploadPractice.single("file"),
  filesController.uploadPractice
);

router.put("/stats/:id", statisticsController.updateStatistics);

router.put("/activities/:id", activitiesController.updateActivities);

router.get("/phrases", phrasesController.getPhrases);

module.exports = router;
