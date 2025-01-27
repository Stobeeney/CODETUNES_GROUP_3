let ins_array = [];
const ins_arrayContainer = document.getElementById("array-container");
const ins_delay = 500;

// Create and append a message container
const ins_messageContainer = document.createElement("div");
ins_messageContainer.className = "message-container";
document.body.appendChild(ins_messageContainer);

// Display messages to the user
function displayMessage(message) {
    ins_messageContainer.textContent = message;
    setTimeout(() => {
        ins_messageContainer.textContent = "";
    }, 3000);
}

// Validate user input (comma-separated numbers)
function isValidInput(input) {
    const regex = /^(\d+(\.\d+)?)(,\d+(\.\d+)?)*$/;
    return regex.test(input.trim());
}

// Initialize the array and display it
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

    ins_array = userInput.split(",").map(Number);
    ins_arrayContainer.innerHTML = "";

    ins_array.forEach((value) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent = value;
        ins_arrayContainer.appendChild(box);
    });

    displayMessage("Elements generated successfully!");
}

// Highlight a specific box
function highlightBox(index, className) {
    const boxes = document.querySelectorAll(".box");
    if (boxes[index]) {
        boxes[index].classList.add(className);
    }
}

// Remove highlight from a specific box
function removeHighlightBox(index, className) {
    const boxes = document.querySelectorAll(".box");
    if (boxes[index]) {
        boxes[index].classList.remove(className);
    }
}

// Update the value of a specific box
function updateBox(index, value) {
    const boxes = document.querySelectorAll(".box");
    if (boxes[index]) {
        boxes[index].textContent = value;
    }
}

// Corrected Insertion Sort Algorithm
async function insertionSort() {
    const boxes = document.querySelectorAll(".box");

    for (let i = 1; i < ins_array.length; i++) {
        let key = ins_array[i];
        let j = i - 1;

        highlightBox(i, "selected");
        await new Promise((resolve) => setTimeout(resolve, ins_delay));

        while (j >= 0 && ins_array[j] > key) {
            highlightBox(j, "comparing");
            ins_array[j + 1] = ins_array[j];
            updateBox(j + 1, ins_array[j]);

            await new Promise((resolve) => setTimeout(resolve, ins_delay));
            removeHighlightBox(j, "comparing");
            j--;
        }

        ins_array[j + 1] = key;
        updateBox(j + 1, key);

        removeHighlightBox(i, "selected");

        for (let k = 0; k <= i; k++) {
            highlightBox(k, "sorted");
        }
    }

    displayMessage("Sorting completed successfully!");
}

// Start sorting when triggered
function startSort(event) {
    event.preventDefault();

    if (ins_array.length === 0) {
        displayMessage("Please generate elements before sorting!");
        return;
    }

    const selectedAlgorithm = document.getElementById("algorithmText").innerText;

    switch (selectedAlgorithm) {
        case "Insertion Sort":
            insertionSort();
            break;
        default:
            displayMessage("Please select a sorting algorithm!");
    }
}

// Clear the array and reset
function clearArray(event) {
    event.preventDefault();
    ins_array = [];
    ins_arrayContainer.innerHTML = "";
    document.getElementById("user-input").value = "";
    displayMessage("Elements cleared successfully!");
    document.getElementById("algorithmText").innerText = "Select Sorting Algorithm";
}