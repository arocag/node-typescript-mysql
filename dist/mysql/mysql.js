"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log('Clase MySQL inicializada');
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'node_user2',
            password: '1234',
            database: 'node_db'
        });
        this.conectarDB();
    }
    // get instance solo usa una instancia.
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.con.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback('null', results);
            }
        });
    }
    conectarDB() {
        this.con.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Conectado a MySQL');
        });
    }
}
exports.default = MySQL;
