const weatherAPI = {
    key: "d2193829b32cff54600ba9543d14fcb5",
    baseURL: "https://api.openweathermap.org/data/2.5/weather",
  }
  
  const aqiAPI = {
    key: "0425c33d0ba8400cd843da78b97926281e2bd7cd",
    baseURL: "https://api.waqi.info/feed",
  }
  
  const monthAPI = {
  key: "74de36ba15754ebd91d92057211004",
  baseURL : "http://api.weatherapi.com/v1/forecast.json",
  }
  
  
  const searchInputBox = document.getElementById('city-name');
  //console.log(searchInputBox.value);
  // event listener function on keypress
  searchInputBox.addEventListener('keypress' , (event) => {
    if(event.keyCode ===13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
        document.querySelector('.suggestion').style.display = "block";
        document.querySelector('.week-container').style.display = "block";
    
  
    }
  });
  
  //get weather report
  /*function getWeatherReport(city){
    fetch(`${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then(weather => weather.json())
    .then((weather) => {
        console.log(weather)
        fetch(`${aqiAPI.baseURL}/${city}/?token=${aqiAPI.key}`)
        .then(aqi => aqi.json())
        .then((aqi) => {
            console.log(weather)
            console.log(aqi)
            console.log(`${aqiAPI.baseURL}/${city}/?token=${aqiAPI.key}`)
            showWeatherReport(weather, aqi)
        })
        
    });
  }*/
  
  
  function getWeatherReport(city){
  fetch(`${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
  .then(weather => weather.json())
  .then((weather) => {
      console.log(weather)
      fetch(`${aqiAPI.baseURL}/${city}/?token=${aqiAPI.key}`)
      .then(aqi => aqi.json())
      .then((aqi) => {
          console.log(weather)
          console.log(aqi)
          console.log(`${aqiAPI.baseURL}/${city}/?token=${aqiAPI.key}`)
          fetch(`${monthAPI.baseURL}?key=${monthAPI.key}&q=${city}&days=10&aqi=no&alerts=no`)
          .then(monthForecast => monthForecast.json())
          .then((monthForecast) =>{
            console.log(monthForecast)
            showWeatherReport(weather, aqi , monthForecast)
          })
          
      })
      
  });
  }
  
  
  
  //show weather report
  function showWeatherReport(weather,aqi,monthForecast){
    console.log(weather);
    console.log(aqi);
     
     
  
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;
  
    let temperature=document.getElementById('temp');
    temperature.innerHTML = `TEMPERATURE ${Math.round(weather.main.temp)}&degC`;
  
    let feels = document.getElementById('feels');
    feels.innerHTML = `FEELS LIKE ${Math.round(weather.main.feels_like)}&degC`;
  
    let wind=document.getElementById('wind');
    wind.innerHTML = `WIND SPEED ${Math.round(weather.wind.speed)} km/h`;
  
    let clouds=document.getElementById('clouds');
    clouds.innerHTML = `CLOUDS ${(weather.clouds.all)} %`;
  
    let humidity = document.getElementById('humidity');
    humidity.innerHTML = ` HUMIDITY ${Math.round(weather.main.humidity)} %`;
  
  
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&degC (min)/${Math.ceil(weather.main.temp_max)}&degC (max)`;
  
    let currentAqi = document.getElementById('aqi');
    currentAqi.innerHTML = `AQI ${aqi.data.aqi}`;
  
    let sunrise = document.getElementById('sunrise');
    sunrise.innerHTML = `SUNRISE ${monthForecast.forecast.forecastday[0].astro.sunrise}`;
  
    let sunset = document.getElementById('sunset');
    sunset.innerHTML = `SUNSET ${monthForecast.forecast.forecastday[0].astro.sunset}`;
  
    let weatherType=document.getElementById('weather-info');
    weatherType.innerText=`${weather.weather[0].main}`;
  
    let date=document.getElementById('date');
    let todayDate =new Date();
    date.innerText=dateManage(todayDate);
  
    
    if(weatherType.textContent === 'Clear')
    document.body.style.backgroundImage =  "url('https://p4.wallpaperbetter.com/wallpaper/990/836/63/nature-meteorology-sky-weather-wallpaper-preview.jpg')";
  
  
    else if(weatherType.textContent === 'Clouds')
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/6d/ae/8c/6dae8c06dbcf08bd9d255018e2645f22.jpg')";
  
    else if(weatherType.textContent === 'Haze')
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1487188274754-65d7aaa5b938?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGZvZ2d5JTIwd2VhdGhlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')";
  
    else if(weatherType.textContent === 'Rain')
    document.body.style.backgroundImage = "url('https://ak.picdn.net/shutterstock/videos/9102242/thumb/1.jpg')";
  
  
    else if(weatherType.textContent == 'Sunny')
    document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/vgjD5VS.jpg')";
  
  
    else if(weatherType.textContent == 'Smoke')
    document.body.style.backgroundImage = "url('https://climate.nasa.gov/system/news_items/main_images/2808_main_image.jpg')";
  
  
    else if(weatherType.textContent == 'Snow')
    document.body.style.backgroundImage = "url('https://ak.picdn.net/shutterstock/videos/23293273/thumb/1.jpg')";
  
  
    else if(weatherType.textContent == 'Mist')
    document.body.style.backgroundImage = "url('https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/01/01/947061-fog.jpg')";
  
    else if(weatherType.textContent == 'Dust')
    document.body.style.backgroundImage = "url('https://cdn.hipwallpaper.com/i/97/59/YIUmRi.jpg')";
  
    else if(weatherType.textContent == 'Fog')
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1487188274754-65d7aaa5b938?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fGZvZ2d5JTIwd2VhdGhlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')";
    
    
    //graph for pm25
    data_pm25 = [];
    dates_pm25 = [];
    aqi.data.forecast.daily.pm25.map(pm25 => {
        data_pm25.push(pm25.avg)
        dates_pm25.push(pm25.day)
    })
    console.log(data_pm25)
    console.log(dates_pm25)
    BuildChartpm25(dates_pm25 , data_pm25 , "PM25")
  
    //graph for o3
    data_o3 = [];
    dates_o3 = [];
    aqi.data.forecast.daily.o3.map(o3 => {
        data_o3.push(o3.avg)
        dates_o3.push(o3.day)
    })
    console.log(data_o3)
    console.log(dates_o3)
    BuildCharto3(dates_o3 , data_o3 , "O3")
    
    //graph for pm10
    data_pm10 = [];
    dates_pm10 = [];
    aqi.data.forecast.daily.pm10.map(pm10 => {
        data_pm10.push(pm10.avg)
        dates_pm10.push(pm10.day)
    })
    console.log(data_pm10)
    BuildChartpm10(dates_pm10 , data_pm10 , "PM10")
  
    //graph for uvi
    data_uvi = [];
    dates_uvi = [];
    aqi.data.forecast.daily.uvi.map(uvi => {
        data_uvi.push(uvi.avg)
        dates_uvi.push(uvi.day)
    })
    console.log(dates_uvi)
    BuildChartuvi(dates_uvi , data_uvi , "UVI")
  
    
    let forecasyLists = document.getElementById('week-list');
    console.log(forecasyLists)
    forecasyLists.innerHTML=''
    monthForecast.forecast.forecastday.forEach((day) => {
      console.log(forecasyLists)
      forecasyLists.append(appendList(day))
    });
  
    feather.replace()
  
  
  }
  function appendList(forecastday){
    let icons = ["sun", "cloud", "cloud-snow", "cloud-rain" , "moon" , "cloud-drizzle" , "cloud-lightning"]
    var li = document.createElement("li");
    var div = document.createElement("div");
    var i = document.createElement("i")
    div.innerHTML = forecastday.date
    div.setAttribute("class", "day-name")
    li.innerHTML = forecastday.day.avgtemp_c
    i.setAttribute("class", "day-icon")
    i.setAttribute("data-feather", icons[Math.floor(Math.random() * icons.length)]);
    li.appendChild(div)
    li.appendChild(i)
    console.log(li);
    return li
  }
  function createMenuItem(name) {
    let li = document.createElement('li');
    li.textContent = name;
    return li;
  }
  
  function renderSuggestions(){
    weatherType = document.getElementById('weather-info').textContent
  
    suggestions = document.getElementById("suggestions");
    if(suggestions.getElementsByTagName("li").length === 0 && (weatherType == "Haze"|| weatherType == "Mist" || weatherType == "Fog")){
        
        suggestions.appendChild(createMenuItem('Hydrate Frequently And Increase Fibre Intake'));
        suggestions.appendChild(createMenuItem('Avoid Smoking'));
        suggestions.appendChild(createMenuItem('Avoid outdoor activities, especially outdoor sports'));
        suggestions.appendChild(createMenuItem('If you are staying in a building with a central air conditioning system, install an air cleaning device'));
        suggestions.appendChild(createMenuItem(' wear a respirator if you must go outside'));
    }
    else if(suggestions.getElementsByTagName("li").length === 0 && weatherType == "Clear"){
        suggestions.appendChild(createMenuItem('Prefect time for going outside...like picnic.'));
    }
  
    else if(suggestions.getElementsByTagName("li").length === 0 && weatherType == "Clouds"){
        suggestions.appendChild(createMenuItem('Carry your umbrella or raincoat it might rain'));
        suggestions.appendChild(createMenuItem('Postpone your car wash to save water'));
        suggestions.appendChild(createMenuItem('You can swtich off Your AC and save electricity'));
    }
  
    else if(suggestions.getElementsByTagName("li").length === 0 && weatherType == "Sunny"){
      suggestions.appendChild(createMenuItem('Charge your Solar Pannels '));
      suggestions.appendChild(createMenuItem('Perfect time to dry your grains'));
      suggestions.appendChild(createMenuItem('Hyrate yourself time to time'));
      suggestions.appendChild(createMenuItem('Visit water park for picnic , it may give relief '));
      suggestions.appendChild(createMenuItem('Use Sunscreen to protect your skin from uv rays'));
  
  }
  
    else if(suggestions.getElementsByTagName("li").length === 0 && weatherType == "Dust"){
      suggestions.appendChild(createMenuItem('Wear glasses to protect your eyes  from dust'));
      suggestions.appendChild(createMenuItem('Close window and doors'));
      suggestions.appendChild(createMenuItem('Use a respirator or face-mask'));
  }
  
  else if(suggestions.getElementsByTagName("li").length === 0 && weatherType == "Snow"){
    suggestions.appendChild(createMenuItem('Keep stock of essential medicines'));
    suggestions.appendChild(createMenuItem("Avoid going outside "));
    suggestions.appendChild(createMenuItem('Check your solar pannels or invertor, in case of high snowfall powercut could be happen'));
    suggestions.appendChild(createMenuItem('Don’t forget your gutters and drains! Keep them free of ice and snow and make sure your downspouts are clear.'));
  }
  
    else if(suggestions.getElementsByTagName("li").length === 0 && weatherType == "Rain"){
        suggestions.appendChild(createMenuItem('Use rainwater for rainwater harvesting'));
        suggestions.appendChild(createMenuItem('Wash your cars'));
        suggestions.appendChild(createMenuItem('Carry your raincoats and umbrella if you are going outside'));
        suggestions.appendChild(createMenuItem('Switch off Your AC '));
    }
  
  
  }
  
  
  //date manage
  function dateManage(datearg){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
  
    let months =["January","February","March","April","may","June","July","August","September","October","November","December"];
  
    let year= datearg.getFullYear();
    let month = months[datearg.getMonth()];
    let date=datearg.getDate();
    let day=days[datearg.getDay()];
  
    return `${date} ${month} (${day}), ${year}`;
  }
  
  function BuildChartpm25(labels, values, chartTitle) {
    var data = {
      labels: labels,
      datasets: [{
        label: chartTitle, 
        data: values,
        backgroundColor: [
          'rgb(255,0,0)',
        ],
        borderColor: [
            'rgb(0,0,0)'
        ],
        borderWidth: 1
      }],
    };
    var ctx = document.getElementById("myChart1").getContext('2d');
    var myChart1 = new Chart(ctx, {
      animationEnabled: true,
        theme: "light2",
      type: 'line',
      data: data,
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Day',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'AVERAGE',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }]
        },
      }
    });
    return myChart1;
  }
  function BuildChartpm10(labels, values, chartTitle) {
    var data = {
      labels: labels,
      datasets: [{
        label: chartTitle, 
        data: values,
        backgroundColor: ['rgb(0,0,255)',
        ],
        borderColor: [
            'rgb(0,0,0)'
        ],
        borderWidth: 1
      }],
    };
    var ctx = document.getElementById("myChart2").getContext('2d');
    var myChart2 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Day',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'AVERAGE',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }]
        },
      }
    });
    return myChart2;
  }
  
  function BuildCharto3(labels, values, chartTitle) {
    var data = {
      labels: labels,
      datasets: [{
        label: chartTitle, 
        data: values,
        backgroundColor: ['rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
        ],
       
        borderColor: [
            'rgb(0,0,0)'
        ],
        borderWidth: 1
      }],
    };
    var ctx = document.getElementById("myChart3").getContext('2d');
    var myChart3 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Day',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'AVERAGE',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }]
        },
      }
    });
    return myChart3;
  }
  
  function BuildChartuvi(labels, values, chartTitle) {
    var data = {
      labels: labels,
      datasets: [{
        label: chartTitle, 
        data: values,
        backgroundColor: ['rgb(197, 53, 3 )',
        ],
        borderColor: [
            'rgb(0,0,0)'
        ],
        borderWidth: 1
      }],
    };
    var ctx = document.getElementById("myChart4").getContext('2d');
    var myChart4 = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Day',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'AVERAGE',
              fontColor: '#000000'
            },
            ticks :{
              fontColor: "black",
            }
          }]
        },
      }
    });
    return myChart4;
  }