
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert([
        {name: 'Gandalf', country: 'Tower Land', 'postal code': 62738, address: '123 Wizardly Place', 'phone number': '555-444-3333'},
        {name: 'Gimli', country: 'Mines', 'postal code': 09867, address: '123 Moria', 'phone number': '235-513-5431'},
        {name: 'Smeagol', country: 'River Run', 'postal code': 76254, address: '678 Hobbit Hole', 'phone number': '415-516-2133'},
        {name: 'Gollum', country: 'Mt. Doom', 'postal code': 63428, address: '729 Tunnel', 'phone number': '753-326-2678'},
        {name: 'Frodo Baggins', country: 'Terebithia', 'postal code': 09135, address: '657 Hobbiton', 'phone number': '135-543-7535'},
        {name: 'Legolas', country: 'Mount Golluk', 'postal code': 74526, address: '25 Shady Lane', 'phone number': '495-613-6432'},
      ]);
    });
};
