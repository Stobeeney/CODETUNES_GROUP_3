// Elements for Category Dropdown
let categorySelect = document.getElementById("category-select");
let categoryList = document.getElementById("category-list");
let categoryText = document.getElementById("categoryText");
let categoryOptions = document.getElementsByClassName("category-option");

// Elements for Station Dropdown
let stationSelect = document.getElementById("station-select");
let stationList = document.getElementById("station-list");
let stationSearch = document.getElementById("stationSearch");

// Stations Data
const stations = {
    "All Categories": [
        "Dr. Santos", "Ninoy Aquino Avenue", "PITX", "MIA Road", "Redemptorist-Aseana", 
        "Baclaran", "EDSA", "Libertad", "Gil Puyat", "Vito Cruz",
        "Quirino Ave.", "Pedro Gil", "United Nations", "Central Terminal",
        "Carriedo", "Doroteo Jose", "Bambang", "Tayuman", "Blumentritt",
        "Abad Santos", "R.Papa", "5th Avenue", "Monumento", "Balintawak",
        "Fernando Poe Jr", "Antipolo", "Marikina-Pasig", "Santolan", 
        "Katipunan", "Anonas", "Lrt 2-Araneta Center-Cubao",
        "Betty Go-Belmonte", "Gilmore", "J. Ruiz", "V. Mapa", "Pureza", 
        "Legarda", "Recto", "North Avenue", "Quezon Avenue", "GMA-Kamuning", "Cubao", 
        "Santolan-Annapolis", "Ortigas", "Shaw Boulevard", "Boni", "Guadalupe", 
        "Buendia", "Ayala", "Magallanes", "Taft Avenue"
    ],
    "LRT 1": [
        "Dr. Santos", "Ninoy Aquino Avenue", "PITX", "MIA Road", "Redemptorist-Aseana",
        "Baclaran", "EDSA", "Libertad", "Gil Puyat", "Vito Cruz",
        "Quirino Ave.", "Pedro Gil", "United Nations", "Central Terminal",
        "Carriedo", "Doroteo Jose", "Bambang", "Tayuman", "Blumentritt",
        "Abad Santos", "R.Papa", "5th Avenue", "Monumento", "Balintawak",
        "Fernando Poe Jr"
    ],
    "LRT 2": ["Antipolo", "Marikina-Pasig", "Santolan", "Katipunan", 
        "Anonas", "Lrt 2-Araneta Center-Cubao", "Betty Go-Belmonte", "Gilmore", 
        "J. Ruiz", "V. Mapa", "Pureza", "Legarda", "Recto"
    ],
    "MRT 3": ["North Avenue", "Quezon Avenue", "GMA-Kamuning", "Mrt 3-Araneta Center-Cubao", 
        "Santolan-Annapolis", "Ortigas", "Shaw Boulevard", "Boni", "Guadalupe", 
        "Buendia", "Ayala", "Magallanes", "Taft Avenue"]
};

let currentCategory = "All Categories";

// Handle Category Dropdown
categorySelect.onclick = function (event) {
    event.stopPropagation(); // Prevent closing when clicking the category select
    toggleDropdown(categoryList);
};

for (let option of categoryOptions) {
    option.onclick = function () {
        categoryText.innerHTML = this.innerHTML;
        currentCategory = this.innerHTML;
        populateStationDropdown(currentCategory); // Populate stations based on category
        stationSearch.value = ""; // Clear the search input
    };
}

// Handle Station Dropdown
stationSelect.onclick = function (event) {
    event.stopPropagation(); // Prevent closing when clicking the station select
    toggleDropdown(stationList);
};

// Populate Station Dropdown
function populateStationDropdown(category) {
    stationList.innerHTML = ""; // Clear existing stations
    const selectedStations = stations[category] || [];
    selectedStations.forEach(station => {
        const li = document.createElement("li");
        li.className = "station-option";
        li.textContent = station;

        // Add click functionality to populate the station in the textbox
        li.onclick = function () {
            stationSearch.value = this.textContent; // Populate search input with selected station
        };

        stationList.appendChild(li);
    });
}

// Search Stations
stationSearch.addEventListener("input", function () {
    const searchValue = stationSearch.value.toLowerCase();
    const filteredStations = (stations[currentCategory] || []).filter(station =>
        station.toLowerCase().includes(searchValue)
    );
    stationList.innerHTML = ""; // Clear existing stations
    filteredStations.forEach(station => {
        const li = document.createElement("li");
        li.className = "station-option";
        li.textContent = station;

        // Add click functionality to populate the station in the textbox
        li.onclick = function () {
            stationSearch.value = this.textContent; // Populate search input with selected station
        };

        stationList.appendChild(li);
    });
});

// Utility functions
function toggleDropdown(dropdown) {
    if (dropdown.style.maxHeight) {
        dropdown.style.maxHeight = null; // Close the dropdown
    } else {
        closeDropdowns(); // Close other dropdowns
        dropdown.style.maxHeight = dropdown.scrollHeight + "px"; // Open the dropdown
    }
}

function closeDropdowns() {
    categoryList.style.maxHeight = null;
    stationList.style.maxHeight = null;
}

// Close dropdowns when clicking anywhere outside
document.addEventListener("click", closeDropdowns);

// Initial Setup
populateStationDropdown("All Categories");
