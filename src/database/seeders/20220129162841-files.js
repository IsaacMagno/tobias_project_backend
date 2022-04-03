"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Files",
      [
        {
          image: "1648670739094-isaac.png",
          champion_id: 1,
        },
        {
          image: "1648670768095-paulo.png",
          champion_id: 2,
        },
        {
          image: "1648670797651-esdras.png",
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
