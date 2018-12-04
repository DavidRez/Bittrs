exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('herbs', table => {
            table.increments('id')
            table.string('name')
            table.string('type')
            table.string('benefits')
        }),
        knex.schema.createTable('benefits', (table) => {
            table.increments('id')
            table.string('type')
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('herbs'),
        knex.schema.dropTable('benefits')
      ]);
};
