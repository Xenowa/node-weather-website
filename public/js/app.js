fetch("http://puzzle.mead.io/puzzle").then((res) => {
    res.json().then((data) => {
        console.log(data);
    });
});

const form = document.querySelector("form");
const locationData = document.querySelector(".location-data");

form.addEventListener("submit", (element) => {
    locationData.innerHTML = "Loading...";
    element.preventDefault();
    const location = element.target.location.value;
    fetchData(location);
})

const fetchData = (location) => {
    fetch(`http://localhost:3000/weather?search=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                locationData.innerHTML = `
                location: ${data.location} <br>
                forecast: ${data.forecast.degrees} degrees f <br> ${data.forecast.chance}% chance of rain <br> weather: ${data.forecast.skyType}`;
            }
        });
    });
}