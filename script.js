const apiKey = "cffe63faffc5e53133ff3b35c92b6a6e";
let   first_time = 1;

function KeyPress() {
    let e = window.event;
    if(e.keyCode != 13)
        return;
    BtnClick();
}

async function BtnClick() {
    let data     = await GetData();
    let temp;
    let humidity;
    let rain;
    let wind;
    let cityName;
    let clouds;

    if(data == null)
        return;

    cityName = data.city.name;

    if(cityName.length >= 13)
        document.getElementById("city").style = "font-size: 22px";
    else
        document.getElementById("city").style = "font-size: 22px";

    if(first_time) {
        let tela, display;
        first_time = 0;
        tela    = document.getElementsByClassName("tela_de_inicio");
        display = document.getElementsByClassName("display");
        document.body.style = " backdrop-filter: blur(1px)";

        for(var i = 0; i < tela.length; i++)
            tela[i].style.display = "none";
        for(var i = 0; i < display.length; i++)
            display[i].style.display = "flex";
    }

    temp     = (data.list[0].main.temp - 273).toFixed(0);
    wind     = (data.list[0].wind.speed);
    humidity = (data.list[0].main.humidity);
    rain     = (data.list[0].rain) ? data.list[0].rain["3h"] : null;
    clouds   = (data.list[0].clouds.all);

    console.log(wind + "M/s");
    console.log(clouds);

    console.log(temp + " °C");
    console.log(data);

    document.getElementById("wspeed").innerHTML  = wind + "M/s";
    document.getElementById("umidade").innerHTML = humidity + "%";
    document.getElementById("city").innerHTML    = data.city.name;
    document.getElementById("temp").innerHTML.style = "font-size: 30px";
    document.getElementById("temp").innerHTML    = temp + "°C";

    SetNextDay(data);

    // neve
    if(temp <= 0){
        document.getElementById("imgtempo").src = "snow.svg";
        document.getElementById("chuva-efeito").style = "display: none";
        document.getElementById("info").innerHTML = "Nevando";
        document.getElementById("neve-efeito").style  = "display: flex";
        document.body.style.background  = "url(neve.png)";
        return;
    }

    document.getElementById("neve-efeito").style = "display: none";
    
    // nublado e ensolarado
    if(rain == null) {
        document.getElementById("chuva-efeito").style = "display: none";
        if(clouds > 5) {
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

    document.getElementById("chuva-efeito").style = "display: flex";

    //chuva fraca
    if(rain < 2.5){
        document.getElementById("imgtempo").src = "nuvem_semchuva.png";
        document.getElementById("info").innerHTML = "Chuva Fraca";
        document.body.style.background = "url(chuva.png)";
        return;
    }
    // chuva forte
    document.getElementById("imgtempo").src = "nuvem_semchuva.png";
    document.getElementById("info").innerHTML = "Chuva Forte";
    document.body.style.background = "url(tempestade.png)";
}

async function GetData() {
    let cityName = document.getElementById("cityInput").value;
    let url      = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    let data     = await fetch(url);

    if(!data.ok)
        return null;

    return data.json();
}

async function SetNextDay(data) {
    console.log(data);
    for(var i = 0, j = 5; i < 6; i++, j += 5)
        setWeather(data, j, `img${i}`);
}

function setWeather(data, pos, ImgPos) {
    let temp;
    let rain;
    let clouds;

    temp   = data.list[pos].main.temp - 273;
    clouds = data.list[pos].clouds.all;
    rain   = data.list[pos].rain ? data.list[pos].rain["3h"] : null;
    
    if(temp <= 0){
        document.getElementById(ImgPos).src = "snow.svg";
        return;
    }

    if(rain == null){
        if(clouds >= 5){
            document.getElementById(ImgPos).src = "clouds.svg";
            return;
        }
        document.getElementById(ImgPos).src = "clear.svg";
        return;
    }

    document.getElementById(ImgPos).src = "rain.svg";
}

window.onload = function() {
    const data = new Date();
    let   final_data = "";
    let   week_day   = data.getDay();

    document.body.style = " backdrop-filter: blur(15px)";

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
        case 3:
            document.getElementById("dia").innerHTML += "Abr";
            break;
        case 4:
            document.getElementById("dia").innerHTML += "Mai";
            breaks
         case 5:
            document.getElementById("dia").innerHTML += "Jun";
            break;
        case 6:
            document.getElementById("dia").innerHTML += "Jul";
            break;
        case 7:
            document.getElementById("dia").innerHTML += "Ago";
            break;
        case 8:
            document.getElementById("dia").innerHTML += "Set";
            break;
        case 9:
            document.getElementById("dia").innerHTML += "Out";
            break;
        case 10:
            document.getElementById("dia").innerHTML += "Nov";
            break;
        case 11:
            document.getElementById("dia").innerHTML += "Dez";
            break;
        default:
            alert(data.getMonth());
            break;
    }

    setNextDayName(week_day);
}

function setNextDayName(current_day_num) {
    for(var i = 1, j = 1; i < 7; i++, j++) {
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