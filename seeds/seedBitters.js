const herbs = require('../database/herbs.js');
const benefits = require('../database/benefits.js');

exports.seed = function(knex, Promise) {
  return knex('herbs').truncate()
    .catch(() => {
      console.log('error deleting herbs');
    })
    .then(() => {
      return knex('benefits').truncate()
    })
    .catch(() => {
      console.log('error deleting benefits');
    })
    .then(() => {
      return knex('herbs').insert(herbs)
    })
    .catch(() => {
      console.log('error inserting herbs');
    })
    .then(() => {
      return knex('benefits').insert(benefits)
    })
    .catch(() => {
      console.log('error inserting benefits');
    });
};
