export const renderDetail = () => {

    const userCardTemplate = document.querySelector("[data-template-details]")
    const userCardContainer = document.querySelector("[data-container]")
    const countryCode = new URLSearchParams(window.location.search).get('country')
    var countries = JSON.parse(localStorage.getItem("countries"));

    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(res => res.json())
        .then(data => {
            let country = data.map(country => {
                // if (country.cca3 === countryCode) {

                // // CARD
                // const card = document.createElement("div")
                // card.classList.add("card")
                // // FLAG
                // const flag = document.createElement("img")
                // flag.classList.add("flag")
                // flag.setAttribute("src", country.flags.png);
                // // BODY
                // const body = document.createElement("div")
                // body.classList.add("body")
                // // NAME
                // const name = document.createElement("h4")
                // name.classList.add("name")
                // name.textContent = country.name.common
                // // INFO
                // const info = document.createElement("div")
                // info.classList.add("info")
                // // INFO LEFT
                // const infoLeft = document.createElement("div")
                // infoLeft.classList.add("info-left")
                // // INFO RIGHT
                // const infoRight = document.createElement("div")
                // infoRight.classList.add("info-right")
                // // SUB INFO
                // const subInfo = document.createElement("div")
                // subInfo.classList.add("sub-info")

                // body.append(name, info)
                // info.append(infoLeft, infoRight, subInfo)
                // infoLeft.append(
                //     createDetailElement("Native Name", Object.values(country.name.nativeName)[0].common),
                //     createDetailElement("Population", country.population.toLocaleString()),
                //     createDetailElement("Region", country.region),
                //     createDetailElement("Sub Region", country.subregion),
                //     createDetailElement("Capital", country.capital)
                // )
                // infoRight.append(
                //     createDetailElement("Top Level Domain", country.tld),
                //     createDetailElement("Currencies", Object.values(country.currencies)[0].name),
                //     createDetailElement("Languages", Object.values(country.languages))
                // )
                // subInfo.append(
                //     createDetailElement("Border Countries", country.borders)
                // )

                // card.append(flag)
                // card.append(body)
                // userCardContainer.append(card)

                // function createDetailElement(Name, content) {
                //     const element = document.createElement("p")
                //     element.setAttribute("Class", Name)
                //     element.innerHTML = `${Name}: ` + `<span>${content}</span>`
                //     return element
                // }

                // RENDER BACK BUTTON

                const backLink = document.createElement("a")
                backLink.setAttribute("href", "./")
                const backbutton = document.createElement("button")
                backbutton.setAttribute("id", "backbutton")
                backbutton.textContent = "Back"
                backLink.appendChild(backbutton)
                document.querySelector(".search-wrapper").appendChild(backLink)

                const card = userCardTemplate.content.cloneNode(true).children[0]
                const image = card.querySelector("[data-image]")
                const name = card.querySelector("[data-name]")
                const nativeName = card.querySelector("[data-native-name]")
                const population = card.querySelector("[data-population]")
                const region = card.querySelector("[data-region]")
                const subRegion = card.querySelector("[data-sub-region]")
                const capital = card.querySelector("[data-capital]")
                const topLevelDomain = card.querySelector("[data-tld]")
                const currencies = card.querySelector("[data-currencies]")
                const languages = card.querySelector("[data-languages]")
                const borderCountries = card.querySelector("[data-border-countries]")

                image.setAttribute("src", country.flags.png);
                name.textContent = country.name.common
                nativeName.innerHTML = "Native Name: " + `<span>${Object.values(country.name.nativeName)[0].common}</span>`
                population.innerHTML = "Population: " + `<span>${country.population.toLocaleString()}</span>`
                region.innerHTML = "Region: " + `<span>${country.region}</span>`
                subRegion.innerHTML = "Sub Region: " + `<span>${country.subregion}</span>`
                capital.innerHTML = "Capital: " + `<span>${country.capital}</span>`
                topLevelDomain.innerHTML = "Top Level Domain: " + `<span>${country.tld}</span>`
                currencies.innerHTML = "Currencies: " + `<span>${Object.values(country.currencies)[0].name}</span>`
                languages.innerHTML = "Languages: " + `<span>${Object.values(country.languages)}</span>`
                userCardContainer.classList.add("details-user-cards")
                userCardContainer.append(card)

                const createDetailButton = (text, link) => {
                    const borderButtons = document.createElement("a");
                    borderButtons.textContent = text;
                    borderButtons.classList.add("detail-back-link");
                    borderButtons.href = link;

                    return borderButtons;
                };

                if (!country.borders || country.borders.length === 0) { borderCountries.innerHTML = "No border countries" }
                else {
                    country.borders.forEach((border) => {
                        var borderCountryFullName = countries.find(country => country.cca3 === border)
                        borderCountries.appendChild(
                            createDetailButton(borderCountryFullName.name, `./?country=${border}`)
                        )
                    })
                }

                return {
                    flag: country.flags.png,
                    name: country.name.common,
                    nativeName: country.name.nativeName.common || "",
                    population: country.population,
                    region: country.region,
                    subRegion: country.subRegion,
                    capital: country.capital && country.capital[0] || "",
                    topLevelDomain: country.tld,
                    currencies: country.currencies,
                    languages: Object.values(country.languages),
                    borderCountries: country.borders,
                    element: card
                }
                // }
            })
        })
}

// --- DIFFERENT ---

// let value = "";
// let region;

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

// const filterdataandrendercountries = () => {
//     const filteredCountries = countries.filter((country) => {
//         return (
//             country.name.toLowerCase().includes(value) &&
//             (!region || country.region.includes(region))
//         )
//     })
//     console.log(filteredCountries)
//     userCardContainer.innerHTML = "";
//     filteredCountries.forEach((country) => { userCardContainer.appendChild(country.element); });
// }

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
//     var countryList = createCountryItemElement(country)
//     userCardContainer.appendChild(countryList)
//     return countryList
// }

// // FILTROWANIE

// searchInput.addEventListener("input", e => {
//     value = e.target.value.toLowerCase().trim();
//     filterdataandrendercountries();
//     // const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(value));
// })

// // FILTROWANIE - REGION

// filter.forEach((element) => {
//     element.addEventListener('click', (e) => {
//         dropbtn.textContent = element.textContent;
//         region = element.textContent;
//         filterdataandrendercountries();
//         // const filteredCountries = countries.filter((country) => country.region === region);
//         // renderCountriesList(filteredCountries);
//     })
// })