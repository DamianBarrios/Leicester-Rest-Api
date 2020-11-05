import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import './database';


const port = app.get('port')

function main(){
    app.listen(port);
    console.log(`Server on port ${port}`)

}

main();