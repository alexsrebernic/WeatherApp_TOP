const input = document.getElementById("input-text")
const button = document.getElementById("button-submit")

const celsiusDiv = document.getElementById("result-celsius")
const farenheitDiv = document.getElementById("result-farenheit")
const textCountryCity = document.getElementById("text-contry/city")
button.onclick = (e) => getData(input.value,e)

async function getData(value,e){
    e.preventDefault()
    value.prevent
    if( value === "") return
    try{
        let data = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+value+'&appid=87f8f972c6ba48be5833852bce06f084')
        if(data.statusText === "Not Found") return alert(data.statusText)
        let objectData = await data.json()
        let temp = objectData.main.temp
        let celsius = passKelvinToCelsius(temp)
        let farenheit = passKelvinToFarenheit(temp)
        appendValueToResultsDiv(celsius,"celsius")
        appendValueToResultsDiv(farenheit,"farenheit")
        textCountryCity.textContent = "The weather in " + objectData.name  +" is:"
        console.log(temp)

    } catch(err) {
        console.log(err)
    }

}

function passKelvinToCelsius(value){
    return value - 273.1
}
function passKelvinToFarenheit(value){
    return  (value - 273.15) + 9/5 + 32

}
function appendValueToResultsDiv(value,div){
    if(div === "celsius"){
        celsiusDiv.textContent = Math.round(value) + "°C"
    }
    if(div === "farenheit"){
        farenheitDiv.textContent = Math.round(value) + "°F"
    }
}