'use strict';

const TABLE_NAME = 'answers';

exports.up = (knex) => {

  function table(t) {

    t.increments().primary();
    t.string('value').notNull();
    t.string('result');
    t.integer('assessmentId').unsigned().references('assessments.id');
    t.string('challengeId').notNull();
    t.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    t.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
  }

  return knex.schema
    .createTable(TABLE_NAME, table)
    .then(() => {
      console.log(`${TABLE_NAME} table is created!`);
    });
};

exports.down = (knex) => {

  return knex.schema
    .dropTable(TABLE_NAME)
    .then(() => {
      console.log(`${TABLE_NAME} table was dropped!`);
    });
};
