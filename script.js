// Demo Login
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234") {
        window.location.href = "main.html";
    } else {
        document.getElementById("error").innerText = "Invalid Credentials!";
    }
}

// Search Filter
function searchLocation() {
    let input = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("#locationList li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// Select Location
function selectLocation(location) {
    localStorage.setItem("location", location);
    window.location.href = "slots.html";
}

// Load Slots
if(window.location.pathname.includes("slots.html")) {
    let location = localStorage.getItem("location");
    document.getElementById("locationTitle").innerText = location + " - Available Slots";

    let slotsDiv = document.getElementById("slots");

    for(let i=1; i<=10; i++) {
        let slot = document.createElement("div");
        slot.className = "slot";
        slot.innerText = "Slot " + i;
        slot.onclick = function() {
            localStorage.setItem("slot", "Slot " + i);
            window.location.href = "booking.html";
        }
        slotsDiv.appendChild(slot);
    }
}

// Calculate Amount
function calculateAmount() {
    let hours = document.getElementById("hours").value;
    document.getElementById("amount").innerText = hours * 30;
}

// Load Booking Page Data
if(window.location.pathname.includes("booking.html")) {
    document.getElementById("slotInfo").innerText = localStorage.getItem("slot");
}

// Proceed Booking
function proceedBooking() {
    let data = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        mobile: document.getElementById("mobile").value,
        vehicleNo: document.getElementById("vehicleNo").value,
        vehicleModel: document.getElementById("vehicleModel").value,
        slot: localStorage.getItem("slot"),
        hours: document.getElementById("hours").value,
        amount: document.getElementById("amount").innerText
    };

    localStorage.setItem("receipt", JSON.stringify(data));
    window.location.href = "receipt.html";
}

// Show Receipt
if(window.location.pathname.includes("receipt.html")) {
    let data = JSON.parse(localStorage.getItem("receipt"));

    document.getElementById("receiptDetails").innerHTML =
        "Name: " + data.name + "<br>" +
        "Location: " + localStorage.getItem("location") + "<br>" +
        "Slot: " + data.slot + "<br>" +
        "Vehicle: " + data.vehicleModel + " (" + data.vehicleNo + ")<br>" +
        "Hours: " + data.hours + "<br>" +
        "Total Paid: ₹" + data.amount;
}
