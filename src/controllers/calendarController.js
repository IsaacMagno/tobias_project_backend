const calendarService = require("../services/calendarService");

const getCalendar = async (_req, res) => {
  try {
    const calendars = await calendarService.getCalendar();

    return res.status(200).json({ calendars });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const evData = req.body;

    const newEvent = await calendarService.createEvent(evData, id);

    return res.status(200).json({ newEvent });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventDate = req.body;

    const deleteEvent = await calendarService.deleteEvent(eventDate, id);

    return res.status(200).json({ deleteEvent });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getCalendar,
  createEvent,
  deleteEvent,
};
