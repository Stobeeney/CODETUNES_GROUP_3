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

function swapBoxes(index1, index2) {
    const boxes = document.querySelectorAll(".box");
    const tempValue = boxes[index1].textContent;
    boxes[index1].textContent = boxes[index2].textContent;
    boxes[index2].textContent = tempValue;
}

// Selection Sort 
async function selectionSort() {
    const boxes = document.querySelectorAll(".box");

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        highlightBox(i, "selected");
        highlightBox(minIndex, "min");
        for (let j = i + 1; j < array.length; j++) {
            highlightBox(j, "selected");

            await new Promise((resolve) => setTimeout(resolve, delay));

            if (array[j] < array[minIndex]) {
                removeHighlightBox(minIndex, "min");
                minIndex = j;
                highlightBox(minIndex, "min");
            }

            removeHighlightBox(j, "selected");
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            swapBoxes(i, minIndex);
        }

        removeHighlightBox(minIndex, "min");
        removeHighlightBox(i, "selected");
        highlightBox(i, "sorted");
    }

    highlightBox(array.length - 1, "sorted");
    displayMessage("Sorting completed successfully!");
}

// Start sorting
function startSort(event) {
    event.preventDefault();
    if (array.length === 0) {
        displayMessage("Please generate elements before sorting!");
        return;
    }

    const selectedAlgorithm = document.getElementById("algorithmText").innerText;

    switch (selectedAlgorithm) {
        case "Selection Sort":
            selectionSort();
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