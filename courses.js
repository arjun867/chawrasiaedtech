document.addEventListener("DOMContentLoaded", function () {
    fetch("images/Course_Catalog.csv") // Ensure correct file path
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                header: true, // Read CSV headers automatically
                skipEmptyLines: true,
                complete: function (results) {
                    let courses = results.data;
                    let courseContainer = document.getElementById("course-container");

                    // Get unique categories and modes
                    let categories = Array.from(new Set(courses.map(course => course["Category"]))).sort();
                    let modes = Array.from(new Set(courses.map(course => course["Mode"]))).sort();

                    // Populate category filter dropdown
                    let categoryDropdown = document.getElementById("categoryFilter");
                    categories.forEach(category => {
                        let option = document.createElement("option");
                        option.value = category;
                        option.textContent = category;
                        categoryDropdown.appendChild(option);
                    });

                    // Populate mode filter dropdown
                    let modeDropdown = document.getElementById("modeFilter");
                    modes.forEach(mode => {
                        let option = document.createElement("option");
                        option.value = mode;
                        option.textContent = mode;
                        modeDropdown.appendChild(option);
                    });

                    // Function to display courses based on filters
                    function displayCourses(filteredCourses) {
                        courseContainer.innerHTML = ""; // Clear existing content

                        filteredCourses.forEach(course => {
                            let courseName = course["Course Name"];
                            let paymentLink = course["Payment Link"]; // Get Stripe payment link from CSV
                            let googleFormInquiry = "contact.html"; // Replace with actual inquiry form
                            let googleFormPayment = "https://docs.google.com/forms/d/e/1FAIpQLSchJEW6cWG2wuzBeDR7dHL8DxGZ7XRB6qAl15uMGH9FThqPnA/viewform?usp=header"; // Replace with actual payment form

                            // Google Form URLs with pre-filled course name
                            let formInquiryWithCourse = `${googleFormInquiry}?entry.1234567890=${encodeURIComponent(courseName)}`;
                            let formPaymentWithCourse = `${googleFormPayment}?entry.1234567890=${encodeURIComponent(courseName)}&entry.0987654321=${encodeURIComponent(paymentLink)}`;

                            let courseHTML = `
                                <div class="col-md-6 col-lg-3 mb-4">
                                    <div class="course-card">
                                        <h3 class="course-title">${courseName}</h3>
                                        <p class="course-duration"><strong>Duration:</strong> ${course["Duration"]}</p>
                                        <p class="course-mode"><strong>Mode:</strong> ${course["Mode"]}</p>
                                        <p class="course-desc">${course["Modules"]}</p>
                                        <p class="course-price"><strong>Price:</strong> ${course["Price (USD)"]}</p>
                                        <div class="btn-group">
                                            <a href="${formInquiryWithCourse}" class="btn btn-outline-primary">Know More</a>
                                            <a href="${formPaymentWithCourse}" class="btn btn-primary">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                            courseContainer.innerHTML += courseHTML;
                        });
                    }

                    // Filter function based on selected filters
                    function applyFilters() {
                        let selectedCategory = document.getElementById("categoryFilter").value;
                        let selectedMode = document.getElementById("modeFilter").value;

                        // Filter courses based on selected category and mode
                        let filteredCourses = courses.filter(course => {
                            let categoryMatch = selectedCategory === "all" || course["Category"] === selectedCategory;
                            let modeMatch = selectedMode === "all" || course["Mode"] === selectedMode;
                            return categoryMatch && modeMatch;
                        });

                        displayCourses(filteredCourses); // Display filtered courses
                    }

                    // Display all courses initially
                    displayCourses(courses);

                    // Event listener for filter application
                    document.getElementById("categoryFilter").addEventListener("change", applyFilters);
                    document.getElementById("modeFilter").addEventListener("change", applyFilters);
                }
            });
        })
        .catch(error => console.error("Error loading CSV:", error));
});
