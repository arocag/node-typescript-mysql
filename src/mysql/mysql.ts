
import mysql = require('mysql');

export default class MySQL {

   private static _instance: MySQL;

   con: mysql.Connection;

   connected: boolean = false;

   constructor() {
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
    public static get instance() {
      return this._instance || ( this._instance = new this() );
    }
  
    static ejecutarQuery ( query: string, callback: Function ) {

        this.instance.con.query(query, (err, results: Object[], fields) =>  {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
           
            if (results.length === 0) {
                callback('El registro no existe');
            } else {
                callback('null', results);
            }

        })  
    }

    private conectarDB() {
        this.con.connect( ( err: mysql.MysqlError  ) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('Conectado a MySQL');
        });
    }

}