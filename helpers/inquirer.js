const inquirer = require('inquirer');


require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.green } Historial`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];



const inquirerMenu = async() => {

    console.clear();
    console.log('=========================='.green);
    console.log('  CLIMA CLI APP'.white );
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const ResultadoBusqueda = async( places = [] ) => {

    const choices = places.map( (place, i) => {

        const idx = `${i + 1}.`.green;
        return {
            value: place.id,
            name:  `${ idx } ${ place.city }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar >>',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   




module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    ResultadoBusqueda,
    confirmar
}
