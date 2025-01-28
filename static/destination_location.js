// Elements for Destination Category Dropdown
let destinationCategorySelect = document.getElementById("destination-category-select");
let destinationCategoryList = document.getElementById("destination-category-list");
let destinationCategoryText = document.getElementById("destination-category-text");
let destinationCategoryOptions = document.getElementsByClassName("destination-category-option");

// Elements for Destination Station Dropdown
let destinationStationSelect = document.getElementById("destination-station-select");
let destinationStationList = document.getElementById("destination-station-list");
let destinationStationSearch = document.getElementById("destination-station-search");

// Stations Data (same as before)
const destinationStations = {
    "All Categories": [
        "Dr. Santos", "Ninoy Aquino Avenue", "PITX", "MIA Road", "Redemptorist-Aseana", 
        "Baclaran", "EDSA", "Libertad", "Gil Puyat", "Vito Cruz",
        "Quirino Ave.", "Pedro Gil", "United Nations", "Central Terminal",
        "Carriedo", "Doroteo Jose", "Bambang", "Tayuman", "Blumentritt",
        "Abad Santos", "R.Papa", "5th Avenue", "Monumento", "Balintawak",
        "Fernando Poe Jr", "Antipolo", "Marikina-Pasig", "Santolan", 
        "Katipunan", "Anonas", "Lrt 2-Araneta Center-Cubao",
        "Betty Go-Belmonte", "Gilmore", "J. Ruiz", "V. Mapa", "Pureza", 
        "Legarda", "Recto", "North Avenue", "Quezon Avenue", "GMA-Kamuning", "Mrt 3-Araneta Center-Cubao", 
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

let destinationCurrentCategory = "All Categories";

// Handle Destination Category Dropdown
destinationCategorySelect.onclick = function (event) {
    event.stopPropagation(); // Prevent closing when clicking the category select
    toggleDropdown(destinationCategoryList);
};

for (let option of destinationCategoryOptions) {
    option.onclick = function () {
        destinationCategoryText.innerHTML = this.innerHTML;
        destinationCurrentCategory = this.innerHTML;
        populateDestinationStationDropdown(destinationCurrentCategory); // Populate stations based on category
        destinationStationSearch.value = ""; // Clear the search input
    };
}

// Handle Destination Station Dropdown
destinationStationSelect.onclick = function (event) {
    event.stopPropagation(); // Prevent closing when clicking the station select
    toggleDropdown(destinationStationList);
};

// Populate Destination Station Dropdown
function populateDestinationStationDropdown(category) {
    destinationStationList.innerHTML = ""; // Clear existing stations
    const selectedStations = destinationStations[category] || [];
    selectedStations.forEach(station => {
        const li = document.createElement("li");
        li.className = "station-option";
        li.textContent = station;

        // Add click functionality to populate the station in the textbox
        li.onclick = function () {
            destinationStationSearch.value = this.textContent; // Populate search input with selected station
        };

        destinationStationList.appendChild(li);
    });
}

// Search Stations for Destination Location
destinationStationSearch.addEventListener("input", function () {
    const searchValue = destinationStationSearch.value.toLowerCase();
    const filteredStations = (destinationStations[destinationCurrentCategory] || []).filter(station =>
        station.toLowerCase().includes(searchValue)
    );
    destinationStationList.innerHTML = ""; // Clear existing stations
    filteredStations.forEach(station => {
        const li = document.createElement("li");
        li.className = "station-option";
        li.textContent = station;

        // Add click functionality to populate the station in the textbox
        li.onclick = function () {
            destinationStationSearch.value = this.textContent; // Populate search input with selected station
        };

        destinationStationList.appendChild(li);
    });
});

// Utility functions for Destination Location
function toggleDropdown(dropdown) {
    if (dropdown.style.maxHeight) {
        dropdown.style.maxHeight = null; // Close the dropdown
    } else {
        closeDropdowns(); // Close other dropdowns
        dropdown.style.maxHeight = dropdown.scrollHeight + "px"; // Open the dropdown
    }
}

function closeDropdowns() {
    destinationCategoryList.style.maxHeight = null;
    destinationStationList.style.maxHeight = null;
}

// Close dropdowns when clicking anywhere outside
document.addEventListener("click", closeDropdowns);

// Initial Setup for Destination
populateDestinationStationDropdown("All Categories");
