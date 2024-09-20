import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config()


const db = new Sequelize(process.env.DATA_BASE_CONNECTION!,{
    models:[__dirname + '/../models/**/*'],
    logging:false // para cancelar los console.log que vienen con sequelize 
});


export default db; 
