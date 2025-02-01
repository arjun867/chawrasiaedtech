document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    let formData = new FormData(this);

    fetch("https://chawrasiaedtech.com/store_data.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log("Response from PHP:", data);
        document.getElementById("formResponse").innerHTML = data.includes("Array") 
            ? "✅ Data sent successfully!" 
            : "❌ Error: " + data;
    })
    .catch(error => console.error("Fetch Error:", error));
});
