const $ = document.querySelector.bind(document);
const Dados = {
    key: "c817b89e19584e458f4181000223008",
    url: "http://api.weatherapi.com/v1",
    lang: "pt",
    units: "metric",
};
const html = {
    Pesquisa: local,
    Search: botão,
    Localização: $('.local'),
    Tabela: $('.table'),
    Data: $('#date'),
};
window.addEventListener('load',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude
            let long = position.coords.longitude
            ResultCoord(lat, long)
        })
    } else{
        window.alert('Seu navegador não suporta essa função!!!')
    }
});
function ResultCoord (lat, long){
    let local = [lat, long]
    fetch(`${Dados.url}/forecast.json?key=${Dados.key}&lang=${Dados.lang}&days=7&q=${local}`)
    .then(response => response.json())
    .then(data => data)
    .then(current => {
        console.log(current)
        const day  = current.forecast.forecastday
        temperatura.textContent = `${current.current.temp_c}°C`
        html.Localização.innerHTML = `<p><strong>Localização:</strong> ${current.location.name}</p>`
        clima.innerText = `${day[0].day.condition.text}`
        if(day[0].day.condition.text == "Sol"){
            imagem.innerHTML = `<img src="/img/001-sun.png">`
        } else if(day[0].day.condition.text == "Parcialmente nublado"){
            imagem.innerHTML = `<img src="/img/002-sun-cloud.png">`
        }else{
            imagem.innerHTML = `<img src="/img/003-rain.png">`
        }
        Table(day)
    })
    .catch(error => console.error(error))
};
html.Search.addEventListener('click', () =>{
    const result = html.Pesquisa
    CityTemp(result.value)
});
html.Pesquisa.addEventListener('keypress', () =>{
    key = event.keyCode
    if( key === 13){
        CityTemp(html.Pesquisa.value)
    }
});
function CityTemp(city){
    fetch(`${Dados.url}/forecast.json?key=${Dados.key}&lang=${Dados.lang}&days=7&q=${city}`)
    .then(response => response.json())
    .then(data => data)
    .then(current => {
        console.log(current)
        const day  = current.forecast.forecastday
        temperatura.textContent = `${current.current.temp_c}°C`
        html.Localização.innerHTML = `<p><strong>Localização:</strong> ${current.location.name}</p>`
        clima.innerText = `${day[0].day.condition.text}`
        if(day[0].day.condition.text == "Sol"){
            imagem.innerHTML = `<img src="/img/001-sun.png">`
        } else if(day[0].day.condition.text == "Parcialmente nublado"){
            imagem.innerHTML = `<img src="/img/002-sun-cloud.png">`
        }else{
            imagem.innerHTML = `<img src="/img/003-rain.png">`
        }
        Table(day)
    })
    .catch(error => window.alert(error))
};
const date = new Date();
const formata = Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month:"long",
    day: "numeric"
});
html.Data.innerHTML = formata.format(date);

function Table(day){
    const diaTab = day.map((dias) => {
        const dat = new Date(dias.date)
        const forma = Intl.DateTimeFormat("pt-BR", {
            weekday:"short"
        })
        return `<td>${forma.format(dat).toUpperCase()}</td>`
    })
    day_tabe.innerHTML = `${diaTab[0]}${diaTab[1]}${diaTab[2]}${diaTab[3]}${diaTab[4]}${diaTab[5]}${diaTab[6]}`
    
    const t_min = day.map((tempo_m) => {
        return `<td>${tempo_m.day.mintemp_c}°C</td>`
    })
    temp_min.innerHTML = `${t_min[0]}${t_min[1]}${t_min[2]}${t_min[3]}${t_min[4]}${t_min[5]}${t_min[6]}`

    const t_max = day.map((tempo_max) => {
        return `<td>${tempo_max.day.maxtemp_c}°C</td>`
    })
    temp_max.innerHTML = `${t_max[0]}${t_max[1]}${t_max[2]}${t_max[3]}${t_max[4]}${t_max[5]}${t_max[6]}`
};