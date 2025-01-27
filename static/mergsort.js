let array = []; 
const arrayContainer = document.getElementById("array-container");
const delay = 500; 
const messageContainer = document.createElement("div");
messageContainer.className = "message-container";
document.body.appendChild(messageContainer);

function displayMessage(message) {
    messageContainer.textContent = message;

    setTimeout(() => {
        messageContainer.textContent = "";
    }, 3000);
}

// Validate input
function isValidInput(input) {
    const regex = /^(\d+(\.\d+)?)(,\d+(\.\d+)?)*$/; 
    return regex.test(input.trim());
}

// Generate elements
function initializeArray(event) {
    event.preventDefault(); 
    const userInput = document.getElementById("user-input").value;

    if (!userInput.trim()) {
        displayMessage("Please enter some numbers!");
        return;
    }

    if (!isValidInput(userInput)) {
        displayMessage("Invalid input! Enter comma-separated numbers only.");
        return;
    }

    array = userInput.split(",").map(Number);

    arrayContainer.innerHTML = "";
    array.forEach((value) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent = value; 
        arrayContainer.appendChild(box);
    });
    displayMessage("Elements generated successfully!");
}

function highlightBox(index, className) {
    const boxes = document.querySelectorAll(".box");
    boxes[index].classList.add(className);
}

function removeHighlightBox(index, className) {
    const boxes = document.querySelectorAll(".box");
    boxes[index].classList.remove(className);
}

function updateBoxValue(index, value) {
    const boxes = document.querySelectorAll(".box");
    boxes[index].textContent = value;
}

// Merge Sort Visualization
async function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);

    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
        highlightBox(k, "selected");

        await new Promise((resolve) => setTimeout(resolve, delay));

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            updateBoxValue(k, leftArray[i]);
            i++;
        } else {
            array[k] = rightArray[j];
            updateBoxValue(k, rightArray[j]);
            j++;
        }
        removeHighlightBox(k, "selected");
        k++;
    }

    while (i < leftArray.length) {
        highlightBox(k, "selected");
        await new Promise((resolve) => setTimeout(resolve, delay));
        array[k] = leftArray[i];
        updateBoxValue(k, leftArray[i]);
        removeHighlightBox(k, "selected");
        i++;
        k++;
    }

    while (j < rightArray.length) {
        highlightBox(k, "selected");
        await new Promise((resolve) => setTimeout(resolve, delay));
        array[k] = rightArray[j];
        updateBoxValue(k, rightArray[j]);
        removeHighlightBox(k, "selected");
        j++;
        k++;
    }

    // Highlight sorted section
    for (let x = start; x <= end; x++) {
        highlightBox(x, "sorted");
    }
}

// Start sorting
async function startSort(event) {
    event.preventDefault();
    if (array.length === 0) {
        displayMessage("Please generate elements before sorting!");
        return;
    }

    const selectedAlgorithm = document.getElementById("algorithmText").innerText;

    switch (selectedAlgorithm) {
        case "Merge Sort":
            await mergeSort(0, array.length - 1);
            displayMessage("Sorting completed successfully!");
            break;
        default:
            displayMessage("Please select a sorting algorithm!");
    }
}

// Clear generated elements
function clearArray(event) {
    event.preventDefault(); 
    array = [];
    arrayContainer.innerHTML = ""; 
    document.getElementById("user-input").value = "";
    displayMessage("Elements cleared successfully!");
    // Reset the dropdown text
    document.getElementById("algorithmText").innerText = "Select Sorting Algorithm";
}