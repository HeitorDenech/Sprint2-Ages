const api_key = "cffe63faffc5e53133ff3b35c92b6a6e";

const clear   = 0;
const clouds  = 1;
const rain    = 2;
const snow    = 3;
const storm   = 4;

let first_time = 1;

async function BtnClick() {
    let data = await ApiGETData();
    let humidity;

    if(data == null)
        return;

    if(first_time) {
        let tela, display;
        first_time = 0;
        tela    = document.getElementsByClassName("tela_de_inicio");
        display = document.getElementsByClassName("display");

        for(var i = 0; i < tela.length; i++)
            tela[i].style.display = "none";
        for(var i = 0; i < display.length; i++)
            display[i].style.display = "flex";
    }

    document.getElementById("temp").innerHTML = (data.main.temp - 273).toFixed(0) + "°C";
    if(data.name.length >= 15)
        document.getElementById("city-text").style = "font-size: 20px;";
    else
        document.getElementById("city-text").style = "font-size: 23px;";
    document.getElementById("city-text").innerHTML =  data.name;
    document.getElementById("umidade").innerHTML =  (humidity = data.main.humidity) + '%';
    document.getElementById("umidade").innerHTML =  data.main.humidity + '%';
    document.getElementById("wspeed").innerHTML =  data.wind.speed + "M/s";

    SetNextDayWeather();

    if(data.main.temp - 273 <= 0){
        document.getElementById("imgtempo").src = "snow.svg";
        document.getElementById("info").innerHTML = "Nevando";
        document.getElementById("chuva-efeito").style = "display: none;";
        document.getElementById("neve-efeito").style = "display: flex;";
        document.body.style.background = "url(neve.png)";
        return;
    }

    if(humidity < 60) {
        if(data.clouds.all >= 60) {
            document.getElementById("imgtempo").src = "clouds.svg";
            document.getElementById("info").innerHTML = "Nublado";
            document.getElementById("neve-efeito").style = "display: none;";
            document.getElementById("chuva-efeito").style = "display: none;";
            document.body.style.background = "url(nublado.png)";
            return;
        }
        document.getElementById("imgtempo").src = "clear.svg";
        document.getElementById("info").innerHTML = "Ensolarado";
        document.getElementById("neve-efeito").style = "display: none;";
        document.getElementById("chuva-efeito").style = "display: none;";
        document.body.style.background = "url(ensolarado.png)";
        return;
    }

    if(humidity <= 80) {
        //chuva fraca
        document.getElementById("imgtempo").src = "nuvem_semchuva.png";
        document.getElementById("info").innerHTML = "Chuva Fraca";
        document.getElementById("neve-efeito").style = "display: none;";
        document.getElementById("chuva-efeito").style = "display: flex;";
        document.body.style.background = "url(chuva.png)";
        return;
    }

    // chuva forte
    document.getElementById("imgtempo").src = "nuvem_semchuva.png";
    document.getElementById("neve-efeito").style = "display: none;";
    document.getElementById("chuva-efeito").style = "display: flex;";
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

async function ApiGETForecast() {
    let cityName = document.getElementById("cityInput").value;
    let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}`);

    if(!forecast.ok)
        return null;

    return forecast.json();
}

window.onload = function() {
    const data = new Date();
    let   final_data = "";
    let   week_day   = data.getDay();

    document.getElementById("dia").innerHTML = GetName(week_day);

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

    setNextDayName(week_day);
}

function setNextDayName(current_day_num) {
    let i, j;

    for(i = j = 1; i < 7; i++, j++) {
        if(current_day_num + j > 6)
            current_day_num = j = 0;
        document.getElementById(`dia${i}`).innerHTML = GetName(current_day_num + j);
    }
}

function GetName(day) {
    switch(day){
        case 0:
            return "Dom";
        case 1:
            return "Seg";
        case 2:
            return "Ter";
        case 3:
            return "Qua";
        case 4:
            return "Qui";
        case 5:
            return "Sex";
        case 6:
            return "Sab";
        default:
            return "Erro";
    }
}

function GetBackground(value) {
    switch(value){
        case clear:
            return "ensolarado.png";
        case clouds:
            return "nublado.png";
        case rain:
            return "chuva.png";
        case snow:
            return "neve.png";
        case storm:
            return "tempestade.png";
        default:
            alert("invalid");
            return;
    }
}

async function SetNextDayWeather() {
    let data = await ApiGETForecast();
    let i,j;

    if(data == null)
        return;

    console.log(data);
    for(i = 0; i < 6; i++){
        setWeather(data, i, 0, `img${i}`);
    }
}

function setWeather(data, pos, setImgTempo, ImgPos) {
    let backgrnd = -1;
    let temp;
    let humidity;
    let clouds;

    if(pos == -1){
        temp = data.main.temp - 273;
        humidity = data.main.humidity;
        clouds   = data.clouds.all;
    }
    else{
        temp = data.list[pos].main.temp - 273;
        humidity = data.list[pos].main.humidity;
        clouds = data.list[pos].clouds.all;
    }

    if(temp <= 0){
        document.getElementById(ImgPos).src = "snow.svg";
        return;
    }

    if(humidity < 60) {
        if(clouds >= 60) {
            document.getElementById(ImgPos).src = "clouds.svg";
            return;
        }
        document.getElementById(ImgPos).src = "clear.svg";
        return;
    }

    if(humidity <= 80) {
        //chuva fraca
        document.getElementById(ImgPos).src = "drizzle.svg";
        return;
    }

    // chuva forte
    document.getElementById(ImgPos).src = "rain.svg";
}

function SetBackGround(value, setbackg) {
    if(value == -1 || setbackg == -1)
        return;

    document.body.style.background = `url(${GetBackground(value)});`
}