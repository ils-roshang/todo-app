const mysql = require('@google-cloud/sqlcommenter-sequelize').mysql;
const { Connector } = require('@google-cloud/cloud-sql-connector');
require('dotenv').config();

const connector = new Connector();

async function getPool() {
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: 'PUBLIC'
  });

  const pool = mysql.createPool({
    ...clientOpts,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  return pool;
}

module.exports = getPool;
