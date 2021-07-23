'use strict';

const { 
    leerInput,
    inquirerMenu,
    pausa,
    ResultadoBusqueda,
} = require("./helpers/inquirer");
const Busqueda = require("./models/Busquedas");
require('dotenv').config();

const main = async() => {
    const busqueda = new Busqueda();
    let opt = '';

    do{
      opt  =  await inquirerMenu();

      switch(opt){
        case 1:
            //Mostrar mensaje
            const lugar = await leerInput('Ciudad: '.yellow);
            console.log(lugar);
            const places = await busqueda.ciudad(lugar);
            const id =  await ResultadoBusqueda(places);
            const placeSelected = places.find( p => p.id === id);
            //clima
            const weatherdata = await busqueda.weather(placeSelected.ltd, placeSelected.ltd);
            
          
            //mostrar resultado
            console.log('\n Información de la ciudad:\n'.green);
            console.log('Ciudad:', placeSelected.city);
            console.log('Lat:', placeSelected.ltd);
            console.log('Lng:', placeSelected.lng);
            console.log('Temperatura:', weatherdata.temp);
            console.log('Mínima:', weatherdata.tempMin);
            console.log('Máxima:', weatherdata.tempMin);
            console.log('Descripión', weatherdata.desc);

            await pausa();
        break;

        case 2:

        break;

        case 3:
        
        break
      }
      
      if(opt === 0) await pausa();

    }while(opt !== 0)
}
main();