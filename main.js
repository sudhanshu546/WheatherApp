// import fetch from 'node-fetch';

const fetch = require('axios');
const readline = require('readline-sync');

const API_KEY = 'b6907d289e10d714a6e88b30761fae22';
const API_URL = 'https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=' + API_KEY;

function printMenu() {
  console.log("\nChoose an option:");
  console.log("1. Get weather");
  console.log("2. Get Wind Speed");
  console.log("3. Get Pressure");
  console.log("0. Exit");
}

// async function getWeatherData(date, parameter) {
//   try {

//     // Rest of your code to extract the data based on the "date" and "parameter" provided...
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

async function getWeatherData(date, parameter) {
  try {

    const response = await axios.get(API_URL);
    const data = response.data;

    // console.log(data); // Log the actual response to check its structure

    // Extract the data based on the "date" and "parameter" provided.
    const forecast = data.list.find(item => item.dt_txt === date);
    if (!forecast) {
      return null; // Data not found for the provided date
    }
    switch (parameter) {
      case 'temp':
        return forecast.main.temp;
      case 'wind.speed':
        return forecast.wind.speed;
      case 'main.pressure':
        return forecast.main.pressure;
      default:
        return null; // Invalid parameter
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  // finally {
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch data. Response code: ' + response.status);
  //   }
  // }

}

function getUserInput() {
  return readline.question('Enter the date (YYYY-MM-DD HH:mm:ss): ');
}

const axios = require('axios');

async function main() {

  const response = await axios.get(API_URL);
  const data = response.data;

  let option;
  do {
    printMenu();
    option = parseInt(readline.question('Enter your choice: '));

    switch (option) {
      case 1:
        const dateWeather = getUserInput();
        const temperature = await getWeatherData(dateWeather, 'temp');
        if (temperature !== null) {
          console.log(`Temperature on ${dateWeather}: ${temperature}°C`);
        } else {
          console.log('Data not found for the provided date.');
        }
        break;
      case 2:
        const dateWindSpeed = getUserInput();
        const windSpeed = await getWeatherData(dateWindSpeed, 'wind.speed');
        if (windSpeed !== null) {
          console.log(`Wind speed on ${dateWindSpeed}: ${windSpeed} m/s`);
        } else {
          console.log('Data not found for the provided date.');
        }
        break;
      case 3:
        const datePressure = getUserInput();
        const pressure = await getWeatherData(datePressure, 'main.pressure');
        if (pressure !== null) {
          console.log(`Pressure on ${datePressure}: ${pressure} hPa`);
        } else {
          console.log('Data not found for the provided date.');
        }
        break;
      case 0:
        console.log('Terminating the program...');
        break;
      default:
        console.log('Invalid option. Please try again.');
    }
  } while (option !== 0);
}

main();
