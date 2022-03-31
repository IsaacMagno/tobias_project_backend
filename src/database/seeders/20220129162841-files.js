"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Files",
      [
        {
          image: "algo",
          champion_id: 1,
        },
        {
          image: "algo",
          champion_id: 2,
        },
        {
          image: "algo",
          champion_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Files", null, {});
  },
};
