'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const champions = [{
        name: "Isaac",
        bornDate: "24-01-1998"
      },
      {
        name: "Esdras",
        bornDate: "01-07-2001"
      },
      {
        name: "Paulo",
        bornDate: "03-07-2000"
      }];

    return queryInterface.bulkInsert("Champions", champions, {});
  },

  down: async (queryInterface, _Sequelize) => {
    queryInterface.bulkDelete("Champions", null, {});
  }
};
