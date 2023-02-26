const form = document.getElementById("grocery-form");
const groceryList = document.getElementById("grocery-list");

// Array to hold grocery items
let groceries = [];

// Add grocery item to list
function addGroceryItem(item, quantity) {
	// Create new grocery object
	const grocery = { item, quantity };
	
	// Add grocery object to array
	groceries.push(grocery);
	
	// Clear grocery list
	groceryList.innerHTML = "";

	// Loop through groceries array and append each item to the grocery list
	groceries.forEach((grocery, index) => {
		const row = document.createElement("tr");
		const itemCell = document.createElement("td");
		const quantityCell = document.createElement("td");
		const actionsCell = document.createElement("td");
		const deleteButton = document.createElement("button");

		itemCell.textContent = grocery.item;
		quantityCell.textContent = `${grocery.quantity} x`;

		deleteButton.textContent = "Delete";
		deleteButton.classList.add("delete-button");
		deleteButton.setAttribute("data-index", index);

		actionsCell.appendChild(deleteButton);

		row.appendChild(itemCell);
		row.appendChild(quantityCell);
		row.appendChild(actionsCell);

		groceryList.appendChild(row);
	});
}

// Handle form submission
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const item = document.getElementById("grocery-input").value;
	const quantity = document.getElementById("quantity-input").value;

	addGroceryItem(item, quantity);

	form.reset();
});

// Handle grocery item deletion
groceryList.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-button")) {
		const index = event.target.getAttribute("data-index");
		groceries.splice(index, 1);
		addGroceryItem();
	}
});

// Handle grocery list generation
const generateListBtn = document.getElementById("generate-list-btn");
generateListBtn.addEventListener("click", () => {
	// Open a new window
	const newWindow = window.open("", "Grocery List");

	// Create a new document inside the window
	newWindow.document.write("<html><head><title>Grocery List</title><link rel='stylesheet' href='style.css'></head><body>");

	// Create a list of groceries in the new document
	newWindow.document.write("<ul>");
	groceries.forEach((grocery) => {
		newWindow.document.write(`<li>${grocery.item} x ${grocery.quantity}</li>`);
	});
	newWindow.document.write("</ul>");

	// Close the body and html tags of the new document
	newWindow.document.write("</body></html>");

	// Focus on the new window
	newWindow.focus();

	
});
