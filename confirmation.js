document.addEventListener("DOMContentLoaded", () => {
    const summaryDisplay = document.getElementById("summary");
    const bookingJSON = sessionStorage.getItem("finalBooking");

    if (!bookingJSON) {
        summaryDisplay.innerHTML = "<p>Could not find booking details. Please start a new reservation.</p>";
        return;
    }

    const booking = JSON.parse(bookingJSON);
    const { reservation, preOrder, orderTotal } = booking;

    // Build summary HTML
    let orderHTML = "No items pre-ordered.";
    if (preOrder.length > 0) {
        orderHTML = "<ul>";
        preOrder.forEach(item => {
            orderHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
        });
        orderHTML += `</ul><strong>Total: $${orderTotal}</strong>`;
    }

    summaryDisplay.innerHTML = `
        <p>
            <strong>Name:</strong> ${reservation.name} <br>
            <strong>Email:</strong> ${reservation.email} <br>
            <strong>Date:</strong> ${reservation.date} at ${reservation.time} <br>
            <strong>Guests:</strong> ${reservation.guests}
        </p>
        <h3>Pre-order Summary</h3>
        ${orderHTML}
    `;

    // IMPORTANT: Clear the storage so the flow is fresh for the next time
    sessionStorage.removeItem("reservationDetails");
    sessionStorage.removeItem("finalBooking");
});