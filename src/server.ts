import db from './config/db';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
// --------------------------------------------------------
import colors from 'colors';
import SwaggerUi from 'swagger-ui-express';
import express from 'express';
import router from './routes';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan'

// conectar a base de datos 

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        // console.log(colors.bgGreen.white('conexion exitosa...local server'))

    } catch (error) {
        // console.error(error);
        console.log(colors.bgRed.white('hay un error al conectar a la base de datos...'))
    }
};

connectDB();

// instancia de express
const server = express();

// habilitar cors para permitir conexiones entre cliente / servidor 

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null,true) 
        }else{
            callback(new Error('error de cors'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos De forumlarios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// documentacion

server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server