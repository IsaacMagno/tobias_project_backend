"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      "Champions",
      [
        {
          name: "Isaac",
          bornDate: "24-01-1998",
          googleId: "112937303302660014677",
        },
        {
          name: "Paulo",
          bornDate: "03-07-2000",
          googleId: "106938448670788032095",
        },
        {
          name: "Esdras",
          bornDate: "01-07-2001",
          googleId: "115276437144232801054",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.bulkDelete("Champions", null, {});
  },
};
