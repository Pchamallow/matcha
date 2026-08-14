import mariadb from 'mariadb';

export const pool = mariadb.createPool({host: '0.0.0.0', port: '3001', user:'root', password:'jesuisrootlol', database:'matcha'})
