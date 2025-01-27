document.addEventListener('DOMContentLoaded', () => {
    // Constants for DOM elements
    const categorySelects = [
        document.getElementById('category-select'),
        document.getElementById('destination-category-select')
    ];
    const categoryTexts = [
        document.getElementById('categoryText'),
        document.getElementById('destination-category-text')
    ];
    const categoryLists = [
        document.getElementById('category-list'),
        document.getElementById('destination-category-list')
    ];
    const stationSearches = [
        document.getElementById('stationSearch'),
        document.getElementById('destination-station-search')
    ];
    const stationLists = [
        document.getElementById('station-list'),
        document.getElementById('destination-station-list')
    ];

    // Station data
    const stations = {
        'LRT 1': ["Dr. Santos", "Ninoy Aquino Avenue", "PITX", "MIA Road", "Redemptorist-Aseana",
        "Baclaran", "EDSA", "Libertad", "Gil Puyat", "Vito Cruz",
        "Quirino Ave.", "Pedro Gil", "United Nations", "Central Terminal",
        "Carriedo", "Doroteo Jose", "Bambang", "Tayuman", "Blumentritt",
        "Abad Santos", "R.Papa", "5th Avenue", "Monumento", "Balintawak",
        "Fernando Poe Jr."],
        "LRT 2": ["Antipolo", "Marikina-Pasig", "Santolan", "Katipunan", 
            "Anonas", "Lrt 2-Araneta Center-Cubao", "Betty Go-Belmonte", "Gilmore", 
            "J. Ruiz", "V. Mapa", "Pureza", "Legarda", "Recto"],
        "MRT 3": ["North Avenue", "Quezon Avenue", "GMA-Kamuning", "Mrt 3-Araneta Center-Cubao", 
            "Santolan-Annapolis", "Ortigas", "Shaw Boulevard", "Boni", "Guadalupe", 
            "Buendia", "Ayala", "Magallanes", "Taft Avenue"]
    };

    // Setup dropdown functionality
    function setupDropdownToggle(categorySelect, categoryList) {
        categorySelect.addEventListener('click', () => {
            categoryList.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!categorySelect.contains(event.target)) {
                categoryList.classList.remove('show');
            }
        });
    }

    // Populate station list
    function populateStationList(categoryText, stationSearch, stationList) {
        stationList.innerHTML = '';
        const selectedCategory = categoryText.textContent;
        stations[selectedCategory].forEach(station => {
            const li = document.createElement('li');
            li.textContent = station;
            li.classList.add('station-option');
            li.addEventListener('click', () => {
                stationSearch.value = station;
                stationList.classList.remove('show');
            });
            stationList.appendChild(li);
        });
    }

    // Setup station search
    function setupStationSearch(stationSearch, stationList) {
        stationSearch.addEventListener('input', () => {
            const filter = stationSearch.value.toUpperCase();
            const options = stationList.getElementsByClassName('station-option');
            Array.from(options).forEach(option => {
                const txtValue = option.textContent || option.innerText;
                option.style.display = txtValue.toUpperCase().includes(filter) ? '' : 'none';
            });
        });
    }

    // Initialize dropdowns and event listeners
    categorySelects.forEach((categorySelect, index) => {
        setupDropdownToggle(categorySelect, categoryLists[index]);
        categoryLists[index].addEventListener('click', (event) => {
            if (event.target.classList.contains('category-option')) {
                categoryTexts[index].textContent = event.target.textContent;
                categoryLists[index].classList.remove('show');
                populateStationList(categoryTexts[index], stationSearches[index], stationLists[index]);
            }
        });
        setupStationSearch(stationSearches[index], stationLists[index]);
    });

    // Find shortest path functionality
    function findShortestPath() {
        const startStation = document.querySelector('#stationSearch').value;
        const endStation = document.querySelector('#destination-station-search').value;
    
        if (!startStation || !endStation) {
            alert('Please select both start and end stations');
            return;
        }
    
        fetch('/shortest_path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start: startStation,
                end: endStation
            })
        })
        .then(response => response.json())
        .then(data => {
            const messageContainer = document.querySelector('.message-container');
            if (data.error) {
                messageContainer.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                const formattedPath = data.route_details.full_path.join(' → ');
                messageContainer.innerHTML = `
                    <div class="route-info">
                        <p class="start-end">From ${data.start_station} to ${data.end_station}:</p>
                        <p class="path">${formattedPath}</p>
                        <p class="distance">Calculated Distance: ${data.distance.toFixed(2)} km</p>
                    </div>
                `;
                highlightPath(data.path, data.start_station, data.end_station);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageContainer.innerHTML = '<p class="error">Error finding path</p>';
        });
    }
    // Add event listener to Find Shortest Path button
    document.querySelector('button[name="action"]').addEventListener('click', findShortestPath);
});

// Highlight path on map
function highlightPath(path, start, end) {
    const svg = document.querySelector('svg');
    const circles = svg.querySelectorAll('circle');
    const texts = svg.querySelectorAll('text');
    const stationCoords = [];

    // Reset all stations
    circles.forEach(circle => {
        circle.setAttribute('r', '5');
        circle.style.fill = '';
        circle.style.opacity = '0.3';
    });

    // Highlight path stations
    path.forEach((stationName) => {
        texts.forEach(text => {
            if (text.textContent === stationName) {
                const circle = text.previousElementSibling;
                if (circle && circle.tagName === 'circle') {
                    circle.setAttribute('r', '8');
                    circle.style.opacity = '1';
                    
                    if (stationName === start) {
                        circle.style.fill = '#33FF57';
                    } else if (stationName === end) {
                        circle.style.fill = '#FF5733';
                    } else {
                        circle.style.fill = '#FFD700';
                    }

                    stationCoords.push({
                        x: parseFloat(circle.getAttribute('cx')),
                        y: parseFloat(circle.getAttribute('cy'))
                    });
                }
            }
        });
    });

    // Adjust viewport
    if (stationCoords.length > 0) {
        const bounds = {
            minX: Math.min(...stationCoords.map(c => c.x)),
            maxX: Math.max(...stationCoords.map(c => c.x)),
            minY: Math.min(...stationCoords.map(c => c.y)),
            maxY: Math.max(...stationCoords.map(c => c.y))
        };
        
        const padding = 50;
        const viewBox = `${bounds.minX - padding} ${bounds.minY - padding} 
                        ${bounds.maxX - bounds.minX + 2*padding} 
                        ${bounds.maxY - bounds.minY + 2*padding}`;
        
        svg.setAttribute('viewBox', viewBox.replace(/\s+/g, ' ').trim());
    }
}

