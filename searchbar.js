window.onload = function(){
    const searchButton = document.getElementById("search-btn");
    const citySearch = document.getElementById("my-city");
    searchButton.addEventListener("click", showWeather);
    citySearch.addEventListener("keyup", enterPressed);
   }
   
function enterPressed(event) {
    if (event.key === "Enter") {
        showWeather();
    }
}

function showWeather() {
    const visibleOrNot = document.getElementById("visible-or-not");
    let cityName = document.getElementById("my-city").value;
    visibleOrNot.style.display = "flex"; 
    visibleOrNot.scrollIntoView({behavior: "smooth"})
    console.log(cityName)
} 

