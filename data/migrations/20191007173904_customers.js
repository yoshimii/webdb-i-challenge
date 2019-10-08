
exports.up = function(knex, Promise) { //
    return knex.schema.createTable('customers', tbl => {// creates table customers: anonymous callback function
        tbl.increments()// defaults to primary key and ID
        tbl.string('name')//column names
            .notNullable();
        tbl.string('address')
           .notNullable();
        tbl.string('country')
            .notNullable();
        tbl.integer('postal code')
            .notNullable()
        tbl.string('phone number')
            .notNullable()            
    })
    .createTable('accounts', tbl => {
        tbl.increments();
        tbl.string('name')
            .notNullable()
            .unique();
        tbl.decimal('budget')
            .notNullable();
    });
}


exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('accounts');
    knex.schema.dropTableIfExists('customers');
};
