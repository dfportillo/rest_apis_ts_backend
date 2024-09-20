import { connectDB } from '../server';
import db from '../config/db';
// ---------------------------------------------------------------------

jest.mock('../config/db')

describe('connect DB' , () =>{
    it('handle data base connection error ', async () =>{
        jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error('hay un error al conectar a la base de datos...'))
        const consoleSpy = jest.spyOn(console,'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('hay un error al conectar a la base de datos...'))
    })
})
