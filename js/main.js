
var SearchCity = document.querySelector("#searchid");



  async function search(city){
    var apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8e8d491efda74ebfa58162855223005&q=${city}}&days=3`, {method:'GET'});
    if(apiResponse.ok && apiResponse.status != 400){
        var finalRes = await apiResponse.json();
        displayCurrent(finalRes.location, finalRes.current);
        displayAnother(finalRes.forecast.forecastday);  
    }
  }

SearchCity = addEventListener('keyup',  (eInfo)=>{
//    console.log(eInfo.target.value)
    search(eInfo.target.value);

});

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


function displayCurrent(locat,c){
    if(c != null){
      var day = new Date(c.last_updated);

        document.querySelector(".top").innerHTML = `
            <p>${days[day.getDay()]}</p>
            <p>${day.getDate() + monthNames[day.getMonth()]}</p>
        
        `

        document.querySelector(".mid").innerHTML = `
            <p>${locat.name}</p>
            <p class="temp">${c.temp_c}<sup>o</sup>c</p>
            <img src="${c.condition.icon}" alt="">
            <div class="mod">
                <p>${c.condition.text}</p>
            </div>
        `


        document.querySelector(".buttom").innerHTML = `
        <div class="sec">
          <img src="image/icon-umberella.png" alt="">
          <p>20%</p>
        </div>
        <div class="sec">
          <img src="image/icon-wind.png" alt="">
          <p>${c.wind_kph + " Km/h"}</p>
        </div>
        <div class="sec">
          <img src="image/icon-compass.png" alt="">
          <p>${c.wind_dir}</p>
        </div>
    `

    }
}


function displayAnother(locat){

  var day = new Date(locat[1].date);
  var day2 = new Date(locat[2].date);
  // console.log(days[day.getDay()])
  document.querySelector(".nextDay").innerHTML =`
    <div class="top w-100">
    <p>${days[day.getDay()]}</p>
  </div>
  <div class="mid">
    <img src="${locat[1].day.condition.icon}" alt="">
    <p>${locat[1].day.maxtemp_c}<sup>o</sup>c</p>
    <p class="fa-2xs">${locat[1].day.mintemp_c}<sup>o</sup>c</p>
    <div class="mod">
        <p>${locat[1].day.condition.text}</p>
    </div>
  </div>
  
  `
  document.querySelector(".after").innerHTML =`
      <div class="top w-100">
      <p>${days[day2.getDay()]}</p>
    </div>
    <div class="mid">
      <img src="${locat[2].day.condition.icon}" alt="">
      <p>${locat[2].day.maxtemp_c}<sup>o</sup>c</p>
      <p class="fa-2xs">${locat[2].day.mintemp_c}<sup>o</sup>c</p>

      <div class="mod">
      <p>${locat[2].day.condition.text}</p>
      </div>
    </div>

`


}


search("cairo");



