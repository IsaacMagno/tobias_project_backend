'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert("Statistics", 
    [
      {
        strength: 10,
        agility: 10,
        inteligence: 10,
        vitality: 10,
        wisdow: 10,
        champion_id: 1,
      },
      {
        strength: 10,
        agility: 10,
        inteligence: 10,
        vitality: 10,
        wisdow: 10,
        champion_id: 2,
      },
      {
        strength: 10,
        agility: 10,
        inteligence: 10,
        vitality: 10,
        wisdow: 10,
        champion_id: 3,
      },
    ],
    {},
  );
},

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Statistics", null, {});
  }
};
