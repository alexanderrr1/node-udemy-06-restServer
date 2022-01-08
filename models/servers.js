const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const app = express();

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = "/api/usuarios";

        // Conectar a base de datos
        this.conectarDB();
     
        //Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use( this.usuariosRoutePath, require('../routes/usuarios') );

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;