const { Client } = require('pg');

const client = new Client({
  host: "ec2-44-206-197-71.compute-1.amazonaws.com",
  user: "uynvdddqoeufnk",
  port: 5432,
  password: 'a28a9622fcc308537fdef1118188bc74fc0c59433b060e5ef323c84b28bd8516',
  database: 'd10i90k2edd3eq'
});

module.exports = client;