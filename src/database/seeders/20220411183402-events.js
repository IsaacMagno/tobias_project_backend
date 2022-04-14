"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Events",
      [
        {
          title: "",
          date: "2022-04-11",
          display: "background",
          background_color: "green",
          calendar_id: 1,
        },
        {
          title: "",
          date: "2022-04-10",
          display: "background",
          background_color: "green",
          calendar_id: 1,
        },
        {
          title: "",
          date: "2022-04-09",
          display: "background",
          background_color: "green",
          calendar_id: 1,
        },
        {
          title: "",
          date: "2022-04-15",
          display: "background",
          background_color: "green",
          calendar_id: 2,
        },
        {
          title: "",
          date: "2022-04-16",
          display: "background",
          background_color: "green",
          calendar_id: 3,
        },
        {
          title: "",
          date: "2022-04-18",
          display: "background",
          background_color: "green",
          calendar_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Events", null, {});
  },
};
