'use strict';

const { 
    leerInput,
    inquirerMenu,
    pausa
} = require("./helpers/inquirer");
const Busqueda = require("./models/Busquedas");

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
            //Buscar los lugares
            busqueda.ciudad(lugar);
            //seleccionar el lugar

            //clima

            //mostrar resultado
            console.log('\n Información de la ciudad:\n'.green);
            console.log('Ciudad:', );
            console.log('Lat:', );
            console.log('Lng:', );
            console.log('Temperatura:', );
            console.log('Mínima:', );
            console.log('Máxima:', );


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