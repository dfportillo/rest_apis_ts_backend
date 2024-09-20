import db from '../config/db';
//------------------------------------------------------------------------
import {exit} from 'node:process';

const clearDB = async () =>{
    try{
        await db.sync({force:true})
        console.log('datos eliminados correctamente')
        exit() //* exito
    }catch(error){
        console.log(error);
        exit(1) //! error
    }
} 

if(process.argv[2] === '--clear'){
    clearDB()
}
