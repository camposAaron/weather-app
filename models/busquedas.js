'use strict';
const axios = require('axios');
const { throwError } = require('rxjs');

class Busqueda {

    historial = ['Tegucigalpa', 'Madrid', 'San José'];
    results = {};
    data = {};


    constructor() {
        //TODO: leer DB si existe.
    }

    get ParamsMapBox() {
        return {
            'access_token': process.env.MAPBOX,
            'limit': 5,
            'language': 'es'
        }
    }

    get ParamsWeather() {
        return {
            appid: process.env.OPENWEATHER,
            lang: 'es',
            units: 'metric'
        }
    }

    async ciudad(lugar = '') {
        //Peticion http.
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json `,
                params: this.ParamsMapBox
            });

            const results = await instance.get();

            this.results = results.data.features.map((data) => {
                return {
                    id: data.id,
                    city: data.place_name,
                    ltd: data.center[0],
                    lng: data.center[1]
                }
            });

            return this.results;

        } catch (err) {
            return [];
        }
    }

    async weather(lon = '', lat = '') {

        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.ParamsWeather, lat, lon},
                });

            const results = await instance.get();
            const {main , weather} =  results.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                tempMax: main.temp_max,
                tempMin: main.temp_min
            };

        } catch (err) {
            console.log('error: NO se encontraron datos para la ciudad seleccionada');
            return [];
        }
    }

}

module.exports = Busqueda;