"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Practice",
      [
        {
          image: "1651184116998-flower6.jpeg",
          champion_id: 1,
        },
        {
          image: "1651184117005-flower5.jpeg",
          champion_id: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Practices", null, {});
  },
};
