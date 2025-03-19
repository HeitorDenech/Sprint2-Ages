const api_key = "cffe63faffc5e53133ff3b35c92b6a6e";

async function BtnClick() {
    let data = await ApiGETData();

    if(data == null)
        return;

    document.getElementById("temp").innerHTML = (data.main.temp - 273).toFixed(0) + "°C";
    if(data.name.length >= 15)
        document.getElementById("city-text").style = "font-size: 20px;";
    else
        document.getElementById("city-text").style = "font-size: 23px;";
    document.getElementById("city-text").innerHTML =  data.name;
}

async function ApiGETData() {
    let cityName = document.getElementById("cityInput").value;
    let data     = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`);

    if(!data.ok)
        return null;

    return data.json();
}