let cityname=document.querySelector(".cityname");
let datetime=document.querySelector(".date");
let w_forecast=document.querySelector(".box-info");
let w_foreimage=document.querySelector(".image-wether");
let w_tem=document.querySelector(".tem");
let w_tem_min=document.querySelector(".min-tem");
let w_tem_max=document.querySelector(".max-tem");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let cityserch=document.querySelector(".Serch-city");


const getcountryname=(code)=>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);

}
const getactualtime=(dt)=>{
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  console.log(curDate);
  // // const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};


const formatter = new Intl.DateTimeFormat("en-US", options);
console.log(formatter);
return formatter.format(curDate);
};
city="anand";
//serch bar
cityserch.addEventListener('submit',(e)=>{
     e.preventDefault();
    let cityName = document.querySelector(".Serch-type");
    console.log(cityName.value);
    city = cityName.value;

    getweatherdata()

    cityName.value = "";
  
   
    // let cityname=document.querySelector("city_name");
    // console.log(cityname.value);
})
const getweatherdata=async ()=>{
    const wetherurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=85f4997d0bf7c1ffc685f8bdd83c3c76`;
    try{
        const res=await fetch(wetherurl)
        const data = await res.json();
        console.log(data);
        const{ main,name,weather,wind,sys,dt}=data;
    cityname.innerHTML=`${name},${getcountryname(sys.country)}`
    datetime.innerHTML=`${getactualtime(dt)}`
         
    w_forecast.innerHTML=weather[0].main;
    w_foreimage.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    w_tem.innerHTML=`${main.temp}&#176`;
    w_tem_min.innerHTML=`${main.temp_min}&#176`;
    w_tem_max.innerHTML=`${main.temp_max}&#176`;

    w_feelsLike.innerHTML=`${main.feels_like}&#176`;
    w_humidity.innerHTML=`${main.humidity}%`;
          w_wind.innerHTML=`${wind.speed}m/s`
    w_pressure.innerHTML=`${main.pressure}hPa`;
  
    }catch(err){
        console.log(err);
    }
}

document.body.addEventListener("load",getweatherdata());




