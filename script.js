const api_key = "cffe63faffc5e53133ff3b35c92b6a6e";

async function BtnClick() {
    let data = await ApiGETData();
    let humidity;

    if(data == null)
        return;

    document.getElementById("temp").innerHTML = (data.main.temp - 273).toFixed(0) + "°C";
    if(data.name.length >= 15)
        document.getElementById("city-text").style = "font-size: 20px;";
    else
        document.getElementById("city-text").style = "font-size: 23px;";
    document.getElementById("city-text").innerHTML =  data.name;
    document.getElementById("umidade").innerHTML =  (humidity = data.main.humidity) + '%';
    document.getElementById("umidade").innerHTML =  data.main.humidity + '%';
    document.getElementById("wspeed").innerHTML =  data.wind.speed + "M/s";

    if(data.main.temp - 273 <= 0){
        document.getElementById("imgtempo").src = "snow.svg";
        document.getElementById("info").innerHTML = "Nevando";
        document.body.style.background = "url(neve.png)";
        return;
    }

    if(humidity < 60) {
        if(data.clouds.all >= 60) {
            document.getElementById("imgtempo").src = "clouds.svg";
            document.getElementById("info").innerHTML = "Nublado";
            document.body.style.background = "url(nublado.png)";
            return;
        }
        document.getElementById("imgtempo").src = "clear.svg";
        document.getElementById("info").innerHTML = "Ensolarado";
        document.body.style.background = "url(ensolarado.png)";
        return;
    }

    if(humidity <= 80) {
        //chuva fraca
        document.getElementById("imgtempo").src = "drizzle.svg";
        document.getElementById("info").innerHTML = "Chuva Fraca";
        document.body.style.background = "url(chuva.png)";
        return;
    }

    // chuva forte
    document.getElementById("imgtempo").src = "rain.svg";
    document.getElementById("info").innerHTML = "Chuva Forte";
    document.body.style.background = "url(tempestade.png)";
}

async function ApiGETData() {
    let cityName = document.getElementById("cityInput").value;
    let data     = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`);

    if(!data.ok)
        return null;

    return data.json();
}

window.onload = function() {
    const data = new Date();
    let   final_data = "";

    switch(data.getDate()) {
        case 0:
            document.getElementById("dia").innerHTML = "Dom";
            break;
        case 1:
            document.getElementById("dia").innerHTML = "Seg";
            break;
        case 2:
            document.getElementById("dia").innerHTML = "Ter";
            break;
        default:
            document.getElementById("dia").innerHTML = "Qua";
            break;
    }

    document.getElementById("dia").innerHTML += ", " + data.getDate() + " ";

    switch(data.getMonth()){
        case 0:
            document.getElementById("dia").innerHTML += "Jan";
            break;
        case 1:
            document.getElementById("dia").innerHTML += "Fev";
            break;
        case 2:
            document.getElementById("dia").innerHTML += "Mar";
            break;
        default:
            alert(data.getMonth());
            break;
    }
}