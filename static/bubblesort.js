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

// Bubble Sort
async function bubbleSort() {
    const n = array.length;
    let hasSwapped;

    for (let i = 0; i < n - 1; i++) {
        hasSwapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            // Highlight current pair being compared
            highlightBox(j, "selected");
            highlightBox(j + 1, "selected");

            await new Promise((resolve) => setTimeout(resolve, delay));

            if (array[j] > array[j + 1]) {
                // Swap if elements are in wrong order
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapBoxes(j, j + 1);
                hasSwapped = true;
            }

            // Remove highlighting from current pair
            removeHighlightBox(j, "selected");
            removeHighlightBox(j + 1, "selected");
        }

        // Mark the last element in this pass as sorted
        highlightBox(n - i - 1, "sorted");

        // If no swapping occurred, array is sorted
        if (!hasSwapped) {
            // Mark remaining elements as sorted
            for (let k = 0; k < n - i - 1; k++) {
                highlightBox(k, "sorted");
            }
            break;
        }
    }

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
        case "Bubble Sort":
            bubbleSort();
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