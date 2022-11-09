/*
   todo:
      *1. fetch the country api.
      *2. work with form
      *3. print data form country api to html.

*/
//! select html element 
const form = document.querySelector('#form');
const flagSection = document.querySelector('.flag');
const table = document.querySelector('.data-right');
const weatherTable = document.querySelector('.weather');
const loader = document.querySelector('.loader');
const appBody = document.querySelector('.apiProject');
const notFound = document.querySelector('.notfound');
const tryAgain = document.querySelector('.try');

//! fetchint deta form country api.
async function getCountry(countryName) {
   const apiUrl = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
   const countryaName = await apiUrl.json();
   return countryaName;
}

//! fetching data form openweatherapi.
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;

async function weather(city) {
   const weaUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
   const weatherOfCity = await weaUrl.json();
   return weatherOfCity;
}


//! passing country to api url form input.
form.addEventListener('submit', async (e) => {
   e.preventDefault();
   const inputVal = document.querySelector('#input').value;
   resetForm();
   loader.style.display = 'block';


   if (inputVal) {
      const result = await getCountry(inputVal);

      if (result.status === 404) {
         notFound.style.display = 'block';
      } else {
         showCountryData(result);
         const weatherResult = await weather(inputVal);
         ShowWeather(weatherResult, result);

         loader.style.display = 'none';
         appBody.style.display = 'block';
      }

   } else {
      alert('Please fill up the input field before submitting form.');
      loader.style.display = 'none';
   }
});


//! showing data for country in html.
function showCountryData(ctDetails) {
   const flagDet = `
      <h2 h2 > ${ctDetails[0].name.common}</h2 >
   <div class="country-flag">
      <img src="${ctDetails[0].flags.svg}" alt="Flag-of-Bangladesh-svg"
         border="0">
   </div>
   `

   //! function for pic up language.
   const langStore = ctDetails[0].languages;
   const langValue = Object.values(langStore);

   //! code for taking currency.
   const currency = ctDetails[0].currencies;

   const couTable = `
   <h2 class="text-center"> Country Info For <span class='text-green'> ${ctDetails[0].name.common}</span> </h2>
   <table class="table text-white">
      <tr>
         <td>Name</td>
         <td>Information</td>
      </tr>
      <tr>
         <td>Official Name</td>
         <td>${ctDetails[0].altSpellings[1]}</td>
      </tr>
      <tr>
         <td>Short Name</td>
         <td>${ctDetails[0].altSpellings[0]}</td>
      </tr>
      <tr>
         <td>Capital</td>
         <td>${ctDetails[0].capital[0]}</td>
      </tr>
      <tr>
         <td>Continents</td>
         <td>${ctDetails[0].continents[0]}</td>
      </tr>
      <tr>
         <td>Languages</td>
         <td>${langValue}</td>
      </tr>
      <tr>
         <td>Area</td>
         <td>${ctDetails[0].area} Squre K.M</td>
      </tr>
      <tr>
         <td>Borders</td>
         <td>${ctDetails[0].borders}</td>
      </tr>
      <tr>
         <td>Currencies</td>
         <td>
            <p>Name : ${Object.values(Object.values(currency)[0])[0]}</p>
            <p>Symble : ${Object.values(Object.values(currency)[0])[1]}</p>
         </td>
      </tr>

   </table>
   `
   flagSection.innerHTML = flagDet;
   table.innerHTML = couTable;
}

//! Showing weather report in html.
function ShowWeather(data, country) {
   const weatherHtml = `
      <h2>weather Details of ${country[0].name.common}</h2>
      <div class="condition text-center">
         <p>Sky Condition: <span class='text-info'>${data.weather[0].description}</span></p>
      </div>
      <div class="sky text-center">
         <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Screenshot-1" border="0">
         <h2>Current temp: <span class='text-info'>${data.main.temp}</span> <sup>°</sup></h2>
      </div>
   `

   weatherTable.innerHTML = weatherHtml;
}

//! function for try angain
tryAgain.addEventListener('click', () => {
   notFound.style.display = 'none';
   loader.style.display = 'none';
});

// function for reseting form.
function resetForm() {
   document.querySelector('#input').value = '';
}




