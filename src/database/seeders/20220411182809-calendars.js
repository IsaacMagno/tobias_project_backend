"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Calendars",
      [
        {
          // googleId: "112937303302660014677",
          champion_id: 1,
          red_day: 0,
          yellow_day: 0,
          green_day: 0,
        },
        {
          // googleId: "106938448670788032095",
          champion_id: 2,
          red_day: 0,
          yellow_day: 0,
          green_day: 0,
        },
        {
          // googleId: "115276437144232801054",
          champion_id: 3,
          red_day: 0,
          yellow_day: 0,
          green_day: 0,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Calendars", null, {});
  },
};
