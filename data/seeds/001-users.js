exports.seed = function(knex, Promise) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        { username: 'Andy', password: 'aaaa' },
        { username: 'Bob', password: '1111' },
        { username: 'Carly', password: 'bbbb' },
        { username: 'Danny', password: '2222' },
      ])
    })
}