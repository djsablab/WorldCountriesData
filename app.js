// Fetch data from the API to get started.
async function fetchCountryData() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    return countries;
}

// Get the top 10 most populated countries from api.
function getTop10MostPopulated(countries) {
    countries.sort((a, b) => b.population - a.population);
    return countries.slice(0, 10); // Get the top 10 most populated countries only.
}

// Get the top 10 languages spoken across all countries.
function getTop10Languages(countries) {
    const languageCounts = {};
    let counterr = 0;
    countries.forEach(country => {
        const languages = country.languages ? Object.values(country.languages) : [];
        languages.forEach(language => {
            languageCounts[language] = (languageCounts[language] || 0) + 1;
        });
    });
    // Sort languages by frequency and return the top 10.
    const sortedLanguages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);

    // Return the top 10 languages with their counts in "Top 10 Most Spoken Languages" section.
    return sortedLanguages.slice(0, 10).map(entry => counterr++ + 1 + '. ' + `${entry[0]} - ${entry[1]} speakers`);
}
// Render the countries and languages with their flags to give better visuals.
function renderData(countries) {
    const topPopulatedCountries = getTop10MostPopulated(countries);
    const topLanguages = getTop10Languages(countries);

    const populationList = document.getElementById('population-list');
    const languagesList = document.getElementById('languages-list');

    // Render the top 10 most populated countries in "Top 10 Most Populated Countries" section.
    topPopulatedCountries.forEach(country => {
        const li = document.createElement('li');
        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png;
        flagImg.alt = `${country.name.common} Flag`;
        flagImg.style.width = '30px';
        flagImg.style.marginRight = '10px';

        li.textContent = `${country.name.common} - Population: ${country.population}`;
        li.prepend(flagImg);
        populationList.appendChild(li);
    });

    // Render the top 10 most spoken languages in the "Top 10 Most Spoken Languages" section.
    topLanguages.forEach(language => {
        const li = document.createElement('li');
        li.textContent = language;
        languagesList.appendChild(li);
    });
}

// Run the function once the page is loaded.
// Also why window is not deined in console but somehow it works?
window.onload = async () => {
    const countries = await fetchCountryData();
    renderData(countries);
    const description = document.querySelector('.description');
    description.textContent = `Currently we have ${countries.length} countries`;
};