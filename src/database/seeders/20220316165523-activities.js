"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Activities",
      [
        {
          km_run: 0,
          jump_rope: 0,
          km_bike: 0,
          upper_limb: 0,
          abs: 0,
          lower_limb: 0,
          meals: 0,
          drinks: 0,
          study: 0,
          meditation: 0,
          reading: 0,
          champion_id: 1,
        },
        {
          km_run: 0,
          jump_rope: 0,
          km_bike: 0,
          upper_limb: 0,
          abs: 0,
          lower_limb: 0,
          meals: 0,
          drinks: 0,
          study: 0,
          meditation: 0,
          reading: 0,
          champion_id: 2,
        },
        {
          km_run: 0,
          jump_rope: 0,
          km_bike: 0,
          upper_limb: 0,
          abs: 0,
          lower_limb: 0,
          meals: 0,
          drinks: 0,
          study: 0,
          meditation: 0,
          reading: 0,
          champion_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete("Activities", null, {});
  },
};
