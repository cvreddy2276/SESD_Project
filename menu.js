document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GET DATA FROM SESSION STORAGE ---
    const reservationJSON = sessionStorage.getItem("reservationDetails");
    
    // If no reservation data is found, redirect back to step 1
    if (!reservationJSON) {
        alert("You must fill out reservation details first!");
        window.location.href = "reserve.html";
        return; // Stop running the script
    }
    
    const reservationDetails = JSON.parse(reservationJSON);

    // --- 2. DISPLAY RESERVATION DETAILS ---
    const infoDisplay = document.getElementById("booking-info-display");
    infoDisplay.innerHTML = `
        <h3>Your Reservation:</h3>
        <p>
            <strong>${reservationDetails.name}</strong> (${reservationDetails.guests} guests)
            <br>
            On <strong>${reservationDetails.date}</strong> at <strong>${reservationDetails.time}</strong>
        </p>
        <a href="reserve.html">Edit Details</a>
    `;

    // --- 3. MENU & ORDER LOGIC (from original script) ---
    const menuData = [
        { id: 1, name: "Margherita Pizza", price: 12.50 },
        { id: 2, name: "Carbonara Pasta", price: 14.00 },
        { id: 3, name: "Caesar Salad", price: 9.00 },
        { id: 4, name: "Bruschetta", price: 7.50 },
    ];

    const menuItemsContainer = document.getElementById("menu-items");
    const orderList = document.getElementById("order-list");
    const totalPriceEl = document.getElementById("total-price");
    const preOrderForm = document.getElementById("pre-order-form");

    let currentOrder = [];
    let total = 0.00;

    // Render menu items
    menuData.forEach(item => {
        menuItemsContainer.innerHTML += `
            <div class="menu-item">
                <div class="menu-item-details">
                    <h4>${item.name}</h4>
                    <span class="price">$${item.price.toFixed(2)}</span>
                </div>
                <button type="button" class="add-to-order-btn" 
                        data-id="${item.id}" 
                        data-name="${item.name}" 
                        data-price="${item.price}">
                    Add to Order
                </button>
            </div>
        `;
    });

    // Handle clicks to add items
    menuItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-order-btn")) {
            const id = parseInt(event.target.dataset.id);
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            
            // Add to order
            currentOrder.push({ id, name, price });
            total += price;
            
            // Update summary
            updateOrderSummary();
        }
    });

    function updateOrderSummary() {
        if (currentOrder.length === 0) {
            orderList.innerHTML = "<li>Your order is empty.</li>";
        } else {
            orderList.innerHTML = "";
            currentOrder.forEach(item => {
                orderList.innerHTML += `<li>${item.name}<span>$${item.price.toFixed(2)}</span></li>`;
            });
        }
        totalPriceEl.textContent = total.toFixed(2);
    }

    // --- 4. FINAL SUBMISSION ---
    preOrderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Combine reservation details and pre-order
        const finalBooking = {
            reservation: reservationDetails,
            preOrder: currentOrder,
            orderTotal: total.toFixed(2)
        };

        // Save the FINAL combined data to session storage
        sessionStorage.setItem("finalBooking", JSON.stringify(finalBooking));

        // SIMULATE backend submission
        console.log("--- FINAL BOOKING SUBMITTED (SIMULATION) ---");
        console.log(JSON.stringify(finalBooking, null, 2));

        // Redirect to confirmation page
        window.location.href = "confirmation.html";
    });
});