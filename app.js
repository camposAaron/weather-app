'use strict';

const { 
    leerInput,
    inquirerMenu,
    pausa,
    ResultadoBusqueda,
} = require("./helpers/inquirer");
const { saveInDB, readInDB } = require("./helpers/manageHistory");
const Busqueda = require("./models/Busquedas");
require('dotenv').config();


const showResults = (placeSelected, weatherdata) => {
  console.clear();
            console.log('\n Información de la ciudad:\n'.green);
            console.log('Ciudad:', placeSelected.city);
            console.log('Lat:', placeSelected.ltd);
            console.log('Lng:', placeSelected.lng);
            console.log('Temperatura:', weatherdata.temp);
            console.log('Mínima:', weatherdata.tempMin);
            console.log('Máxima:', weatherdata.tempMin);
            console.log('Descripión', `${weatherdata.desc}`.green);
}

const main = async() => {
    const busqueda = new Busqueda();
    let opt = '';

    do{
      
      const history = readInDB();
      busqueda.historial = history;

      opt  =  await inquirerMenu();
      switch(opt){
        case 1:
            const lugar = await leerInput('Ciudad: '.yellow);
            console.log(lugar);
            const places = await busqueda.ciudad(lugar);
            const id =  await ResultadoBusqueda(places);
            const placeSelected = places.find( p => p.id === id);
            //Guardar en historial
            busqueda.inHistory(placeSelected);
            //clima
            const weatherdata = await busqueda.weather(placeSelected.ltd, placeSelected.ltd);   
            //mostrar resultado
            showResults(placeSelected, weatherdata);
            await pausa();
        break;

        case 2:
          //Mostrar historial
           const placeid = await ResultadoBusqueda(history);
           if(placeid !== '0'){
                const placeHistory = history.find( p => p.id === placeid);
                const weatherHistory = await busqueda.weather(placeHistory.ltd, placeHistory.ltd);  
                showResults(placeHistory,weatherHistory);
                await pausa();
           }
        break;
      }
      //guardar el historial en db
      saveInDB(busqueda.History);
      if(opt === 0) await pausa();
    }while(opt !== 0)
}
main();