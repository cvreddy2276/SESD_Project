document.addEventListener("DOMContentLoaded", () => {
    const reservationForm = document.getElementById("reservation-form");

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Stop the form from submitting
        
        // 1. Get data from the form
        const formData = new FormData(reservationForm);
        const reservationDetails = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            date: formData.get("date"),
            time: formData.get("time"),
            guests: formData.get("guests"),
        };

        // 2. Save data to sessionStorage
        // This persists data just for this "session" (until browser tab is closed)
        sessionStorage.setItem("reservationDetails", JSON.stringify(reservationDetails));

        // 3. Redirect to the next page (menu)
        window.location.href = "menu.html";
    });
});