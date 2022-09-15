import { renderDashboard } from "./render-dashboard.js";
import { renderDetail } from "./render-detail.js";

if (window.location.search.includes("?country=")) {
    document.querySelector(".search-input").style.display = "none";
    document.querySelector(".dropdown").style.display = "none";
    renderDetail();
} else {
    renderDashboard();
}

// ---------- DARKMODE ----------

let dark = document.getElementById("dark");
let darkIcon = document.querySelector("iconify-icon");

dark.addEventListener('click', () => {
    document.body.classList.toggle("dark");
    if (darkIcon.getAttribute("icon") == "ri:moon-line")
        darkIcon.setAttribute("icon", "ri:moon-fill")
    else {
        darkIcon.setAttribute("icon", "ri:moon-line");
    };
})