let array = [];
let algorithm = 'Quick Sort'; // Default algorithm

// Utility function for delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize array from user input
function initializeArray(event) {
    event.preventDefault();
    const input = document.getElementById('user-input').value.trim();
    array = input.split(',').map(num => parseInt(num, 10)).filter(num => !isNaN(num));
    displayArray();
}

// Display the array visually
function displayArray() {
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    array.forEach((item, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = item;
        box.setAttribute('data-index', index);
        arrayContainer.appendChild(box);
    });
}

// Quick Sort with visualization
async function quickSortVisual(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return;

    const pivotIndex = await partition(arr, start, end);
    await quickSortVisual(arr, start, pivotIndex - 1);
    await quickSortVisual(arr, pivotIndex + 1, end);
}

// Partition function with visualization
async function partition(arr, start, end) {
    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        highlightComparison(i, pivotIndex, end); // Highlight elements being compared
        await delay(500); // Adjust delay time here for animation speed

        if (arr[i] < pivotValue) {
            swap(arr, i, pivotIndex);
            pivotIndex++;
            displayArray(); // Update the display after swapping
            await delay(500);
        }
    }

    swap(arr, pivotIndex, end);
    displayArray(); // Update the display after final pivot swap
    await delay(500);

    return pivotIndex;
}

// Swap two elements in the array
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Highlight comparison and pivot elements
function highlightComparison(index1, index2, pivotIndex) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.classList.remove('highlight', 'pivot'));

    if (index1 !== null) boxes[index1].classList.add('highlight');
    if (index2 !== null) boxes[index2].classList.add('highlight');
    boxes[pivotIndex].classList.add('pivot');
}

// Start sorting and visualize
async function startSort(event) {
    event.preventDefault();
    if (algorithm === 'Quick Sort') {
        await quickSortVisual(array);
        markSorted(); // Mark all elements as sorted after sorting completes
    }
}

// Mark all elements as sorted
function markSorted() {
    const arrayContainer = document.getElementById('array-container');
    const boxes = arrayContainer.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('sorted');
            box.textContent = array[index];
        }, index * 500); // Adjust delay multiplier for final animation speed
    });
}

// Change algorithm (optional if adding more algorithms later)
function selectAlgorithm(selectedAlgorithm) {
    algorithm = selectedAlgorithm;
    document.getElementById('algorithmText').innerText = selectedAlgorithm;
}

// Clear the array and reset the display
function clearArray(event) {
    event.preventDefault();
    array = [];
    displayArray();
}
