// const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let Countries = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    Countries.forEach(country => {
        const isVisible =
            country.name.toLowerCase().includes(value) ||
            country.capital.toLowerCase().includes(value)
        country.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
        Countries = data.map(country => {
            // CARD
            const link = document.createElement("a")
            link.setAttribute("href", country.name.common + ".html");
            const card = document.createElement("div")
            card.classList.add("card")
            // FLAG
            const flag = document.createElement("img")
            flag.classList.add("flag")
            flag.setAttribute("src", country.flags.png);
            // BODY
            const body = document.createElement("div")
            body.classList.add("body")
            // NAME
            const name = document.createElement("h4")
            name.classList.add("name")
            name.textContent = country.name.common
            // POPULATION
            const population = document.createElement("p")
            population.classList.add("population")
            population.innerHTML = "Population: " + `<span>${country.population}</span>`
            // REGION
            const region = document.createElement("p")
            region.classList.add("region")
            region.innerHTML = "Region: " + `<span>${country.region}</span>`
            // CAPITAL
            const capital = document.createElement("p")
            capital.classList.add("capital")
            capital.innerHTML = "Capital: " + `<span>${country.capital}</span>`
            // APPEND
            body.append(name, population, region, capital)
            link.append(card)
            card.append(flag)
            card.append(body)
            userCardContainer.append(link)


            // const card = userCardTemplate.content.cloneNode(true).children[0]
            // const header = card.querySelector("[data-header]")
            // const body = card.querySelector("[data-body]")
            // header.textContent = country.name.common
            // body.textContent = country.capital
            // userCardContainer.append(card)

            return {
                flag: country.flags.png,
                name: country.name.common,
                population: country.population,
                region: country.region,
                capital: country.capital && country.capital[0] || "",
                element: link
                // element: card
            }
        })
    })

// DARKMODE

let dark = document.getElementById("dark");

dark.addEventListener('click', () => {
    document.body.classList.toggle("dark");
})

// DROPDOWN

let dropdown = document.getElementById("myDropdown");
let dropbtn = document.getElementById("dropbtn");

dropbtn.addEventListener('click', () => {
    dropdown.classList.toggle("show");
})

document.addEventListener('mouseup', function (e) {
    if (!e.target.matches(".dropbtn")) {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
})