"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Statistics",
      [
        {
          strength: 0,
          agility: 0,
          inteligence: 0,
          vitality: 0,
          wisdow: 0,
          champion_id: 1,
        },
        {
          strength: 0,
          agility: 0,
          inteligence: 0,
          vitality: 0,
          wisdow: 0,
          champion_id: 2,
        },
        {
          strength: 0,
          agility: 0,
          inteligence: 0,
          vitality: 0,
          wisdow: 0,
          champion_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Statistics", null, {});
  },
};
