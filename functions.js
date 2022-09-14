const userCardTemplate = document.querySelector("[data-template]")
const userCardContainer = document.querySelector("[data-container]")
const searchInput = document.querySelector("[data-search]")

let countries = []

fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
        countries = data.map(country => {
            const link = userCardTemplate.content.cloneNode(true).children[0]
            const image = link.querySelector("[data-image]")
            const name = link.querySelector("[data-name]")
            const population = link.querySelector("[data-population]")
            const region = link.querySelector("[data-region]")
            const capital = link.querySelector("[data-capital]")
            console.log(link, image, name, population, region, capital)
            link.setAttribute("href", "country.html?country=" + country.name.common);
            image.setAttribute("src", country.flags.png);
            name.textContent = country.name.common
            population.innerHTML = "Population: " + `<span>${country.population}</span>`
            region.innerHTML = "Region: " + `<span>${country.region}</span>`
            capital.innerHTML = "Capital: " + `<span>${country.capital}</span>`
            userCardContainer.append(link)

            return {
                flag: country.flags.png,
                name: country.name.common,
                population: country.population,
                region: country.region,
                capital: country.capital && country.capital[0] || "",
                element: link
            }
        });
        console.log(countries)
    })

// ---------- DARKMODE ----------

let dark = document.getElementById("dark");

dark.addEventListener('click', () => {
    document.body.classList.toggle("dark");
})

// ---------- DROPDOWN ----------

let dropbtn = document.getElementById("dropbtn");
let dropdown = document.getElementById("myDropdown");

dropbtn.addEventListener('click', () => {
    dropdown.classList.toggle("show");
})

// document.addEventListener('mouseup', function (e) {
//     if (!e.target.matches(".dropbtn")) {
//         if (dropdown.classList.contains('show')) {
//             dropdown.classList.remove('show');
//         }
//     }
// })

// ---------- FILTER BY NAME ----------

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    console.log(countries)
    countries.forEach(country => {
        const isVisible =
            country.name.toLowerCase().includes(value) ||
            country.capital.toLowerCase().includes(value)
        country.element.classList.toggle("hide", !isVisible)
    })
})

// ---------- FILTER BY REGION ----------

let filter = dropdown.querySelectorAll(".filter");

filter.forEach((element) => {
    element.addEventListener('click', () => {
        dropbtn.textContent = element.textContent;
        countries.forEach(country => {
            const isVisible = country.region.includes(element.textContent)
            country.element.classList.toggle("hide", !isVisible)
        })
    })
})

// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// - ALTERNATIVE
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -

// fetch("https://restcountries.com/v3.1/all")
//     .then(res => res.json())
//     .then(data => {

//         // FILTROWANIE PRZY POBIERANIU DANYCH
//         // let query = "pol"
//         // countries = data.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase())); 

//         countries = data.map(country => {

//             countriesList = renderCountriesList(country);

//             return {
//                 flag: country.flags.png,
//                 name: country.name.common,
//                 population: country.population,
//                 region: country.region,
//                 capital: country.capital && country.capital[0] || "",
//                 element: countriesList
//             }
//         });
//     })

// const createInfoElement = (labelName, value) => {
//     const info = document.createElement("div")
//     const labelElement = document.createElement("p");
//     labelElement.innerHTML = labelName + ": " + `<span>${value}</span>`
//     info.appendChild(labelElement);
//     return info;
// }

// const createCountryItemElement = (country) => {
//     const link = document.createElement("a")
//     link.setAttribute("href", "country.html?country=" + country.name.common);
//     link.classList.add("link")
//     const card = document.createElement("div")
//     card.classList.add("card")
//     const flag = document.createElement("img")
//     flag.classList.add("flag")
//     flag.setAttribute("src", country.flags.png);
//     const body = document.createElement("div")
//     body.classList.add("body")
//     const name = document.createElement("h4");
//     name.classList.add("name")
//     name.textContent = country.name.common;
//     link.appendChild(card);
//     card.appendChild(flag);
//     card.appendChild(body);
//     body.appendChild(name);
//     body.appendChild(createInfoElement("Population", country.population));
//     body.appendChild(createInfoElement("Region", country.region));
//     body.appendChild(createInfoElement("Capital", country.capital));
//     return link;
// }

// const renderCountriesList = country => {
//     // userCardContainer.appendChild(createCountryItemElement(country))
//     var countryList = createCountryItemElement(country)
//     userCardContainer.appendChild(countryList)
//     return countryList
// }

// FILTROWANIE

// searchInput.addEventListener("input", e => {
//     console.log("change", e.target.value);
//     const value = e.target.value.toLowerCase().trim();
//     const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(value));
//     userCardContainer.innerHTML = "";
//     filteredCountries.forEach((country) => {userCardContainer.appendChild(country.element);});
// })

// FILTROWANIE - REGION

// filter.forEach((element) => {
//     element.addEventListener('click', (e) => {
//         dropbtn.textContent = element.textContent;
//         const region = element.textContent;
//         const filteredCountries = countries.filter((country) => country.region === region);
//         renderCountriesList(filteredCountries);
//     })
// })

// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// - ALTERNATIVE #2
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -

// fetch("https://restcountries.com/v3.1/all")
//     .then(res => res.json())
//     .then(data => {

//         // FILTROWANIE PRZY POBIERANIU DANYCH
//         // let query = "pol"
//         // countries = data.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase())); 

//         countries = data.map(country => {
//             return {
//                 flag: country.flags.png,
//                 name: country.name.common,
//                 population: country.population,
//                 region: country.region,
//                 capital: country.capital && country.capital[0] || ""
//             }
//         });
//         renderCountriesList(countries);
//     })

// const createInfoElement = (labelName, value) => {
//     const info = document.createElement("div")

//     const labelElement = document.createElement("p");
//     labelElement.innerHTML = labelName + ": " + `<span>${value}</span>`

//     info.appendChild(labelElement);

//     return info;
// }

// const createCountryItemElement = (country) => {
//     const link = document.createElement("a")
//     link.setAttribute("href", "country.html?country=" + country.name.common);
//     link.classList.add("link")

//     const card = document.createElement("div")
//     card.classList.add("card")

//     const flag = document.createElement("img")
//     flag.classList.add("flag")
//     flag.setAttribute("src", country.flag);

//     const body = document.createElement("div")
//     body.classList.add("body")

//     const name = document.createElement("h4");
//     name.classList.add("name")
//     name.textContent = country.name;

//     link.appendChild(card);
//     card.appendChild(flag);
//     card.appendChild(body);
//     body.appendChild(name);

//     body.appendChild(createInfoElement("Population", country.population));
//     body.appendChild(createInfoElement("Region", country.region));
//     body.appendChild(createInfoElement("Capital", country.capital));

//     return link;
// }

// const renderCountriesList = (countries) => {
//     userCardContainer.innerHTML = "";
//     countries.forEach((country) => {
//         userCardContainer.appendChild(createCountryItemElement(country))
//     });
// }

// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// - MANUAL CREATE DIV
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -
// -

// fetch("https://restcountries.com/v3.1/all")
//     .then(res => res.json())
//     .then(data => {
//         countries = data.map(country => {
//             // CARD
//             const link = document.createElement("a")
//             link.setAttribute("href", "country.html?country=" + country.name.common);
//             const card = document.createElement("div")
//             card.classList.add("card")
//             // FLAG
//             const flag = document.createElement("img")
//             flag.classList.add("flag")
//             flag.setAttribute("src", country.flags.png);
//             // BODY
//             const body = document.createElement("div")
//             body.classList.add("body")
//             // NAME
//             const name = document.createElement("h4")
//             name.classList.add("name")
//             name.textContent = country.name.common
//             // POPULATION
//             const population = document.createElement("p")
//             population.classList.add("population")
//             population.innerHTML = "Population: " + `<span>${country.population}</span>`
//             // REGION
//             const region = document.createElement("p")
//             region.classList.add("region")
//             region.innerHTML = "Region: " + `<span>${country.region}</span>`
//             // CAPITAL
//             const capital = document.createElement("p")
//             capital.classList.add("capital")
//             capital.innerHTML = "Capital: " + `<span>${country.capital}</span>`
//             // APPEND
//             body.append(name, population, region, capital)
//             link.append(card)
//             card.append(flag)
//             card.append(body)
//             userCardContainer.append(link)

//             return {
//                 flag: country.flags.png,
//                 name: country.name.common,
//                 population: country.population,
//                 region: country.region,
//                 capital: country.capital && country.capital[0] || "",
//                 element: link
//             }
//         });
//     })