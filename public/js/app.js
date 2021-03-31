const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");
const icon = document.querySelector("#weathericon");

const weatherSearch = (location) => {
  message.textContent = 'Loading...'
  fetch(`http://localhost:3001/weather?address=
${location}`).then((response) =>
    response.json().then((data) => {
      if (!data.forecast) {
        message.textContent = data.error;
        return;
      }
      message.textContent = data.forecast;
    })
  );
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  weatherSearch(searchTerm);
});
