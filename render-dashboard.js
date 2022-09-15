export const renderDashboard = () => {
    const userCardTemplate = document.querySelector("[data-template]")
    const userCardContainer = document.querySelector("[data-container]")
    const searchInput = document.querySelector("[data-search]")
    const filter = document.querySelectorAll(".filter")

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
                link.setAttribute("href", "?country=" + country.cca3);
                image.setAttribute("src", country.flags.png);
                name.textContent = country.name.common
                population.innerHTML = "Population: " + `<span>${country.population.toLocaleString()}</span>`
                region.innerHTML = "Region: " + `<span>${country.region}</span>`
                capital.innerHTML = "Capital: " + `<span>${country.capital}</span>`
                userCardContainer.classList.add("user-cards")
                userCardContainer.append(link)

                return {
                    cca3: country.cca3,
                    flag: country.flags.png,
                    name: country.name.common,
                    population: country.population,
                    region: country.region,
                    capital: country.capital && country.capital[0] || "",
                    element: link
                }
            });
            localStorage.setItem("countries", JSON.stringify(countries));
        })

    // ---------- DROPDOWN ----------

    let dropbtn = document.getElementById("dropbtn");
    let dropdown = document.getElementById("myDropdown");

    dropbtn.addEventListener('click', () => {
        dropdown.classList.toggle("show");
    })

    document.addEventListener('mouseup', (e) => {
        if (dropdown.classList.contains('show')) {
            if (!dropbtn.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        }
    })

    // ---------- FILTER BY NAME AND REGION ----------

    let value = "", region;

    const filterdataandrendercountries = () => {
        countries.forEach(country => {
            const isVisible =
                (country.name.toLowerCase().includes(value) || country.capital.toLowerCase().includes(value))
                &&
                (!region || country.region.includes(region))
            country.element.classList.toggle("hide", !isVisible)
        })
    }

    searchInput.addEventListener("input", e => {
        value = e.target.value.toLowerCase();
        filterdataandrendercountries();
    })

    filter.forEach((element) => {
        element.addEventListener('click', () => {
            dropbtn.textContent = region = element.textContent;
            filterdataandrendercountries();
        })
    })
}