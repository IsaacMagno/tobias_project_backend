const { Calendar, Event } = require("../database/models");

const getCalendar = async () => {
  const calendars = await Calendar.findAll({
    include: { all: true },
  });

  return calendars;
};

const createEvent = async ({ newEvent }, id) => {
  newEvent.CalendarId = parseInt(id);

  const cEvent = await Event.create(newEvent);

  return cEvent;
};

const deleteEvent = async ({ date }, id) => {
  const eventDelete = await Event.destroy({ where: { calendar_id: id, date } });

  return eventDelete;
};

module.exports = {
  getCalendar,
  createEvent,
  deleteEvent,
};
