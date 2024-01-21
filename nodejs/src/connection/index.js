const {Pool} = require ('pg')

const dbPool = new Pool ({
    user: 'postgres',
    database: 'personal-web',
    password: '0248451842',
    port: '5432'
})

module.exports = dbPool