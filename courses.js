document.addEventListener("DOMContentLoaded", function () {
    const courseContainer = document.getElementById("course-container");
    const filter1 = document.getElementById("filter1");
    const filter2 = document.getElementById("filter2");
    const filter3 = document.getElementById("filter3");
    let allCourses = []; // Store all courses globally

    fetch("images/Course_Catalog.csv") // Ensure correct file path
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.text();
        })
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    allCourses = results.data;
                    populateFilter1();
                    displayCourses(allCourses); // Display all courses initially
                }
            });
        })
        .catch(error => {
            console.error("Error loading or parsing CSV:", error);
            courseContainer.innerHTML = `<p class="text-center text-danger">Could not load course data. Please try again later.</p>`;
        });

    // --- POPULATE FILTERS (No changes needed here) ---

    function populateFilter1() {
        const categories = [...new Set(allCourses.map(course => course.Category1).filter(Boolean))].sort();
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            filter1.appendChild(option);
        });
    }

    function updateFilter2() {
        const selectedCat1 = filter1.value;
        filter2.innerHTML = '<option value="all">Select Sub-Category...</option>'; // Reset
        filter3.innerHTML = '<option value="all">Select Specialization...</option>'; // Reset
        filter2.disabled = true;
        filter3.disabled = true;

        if (selectedCat1 !== 'all') {
            const relevantCourses = allCourses.filter(course => course.Category1 === selectedCat1);
            const subCategories = [...new Set(relevantCourses.map(course => course.Category2).filter(Boolean))].sort();
            
            if (subCategories.length > 0) {
                subCategories.forEach(subCategory => {
                    const option = document.createElement("option");
                    option.value = subCategory;
                    option.textContent = subCategory;
                    filter2.appendChild(option);
                });
                filter2.disabled = false;
            }
        }
        applyFilters(); // Update display
    }

    function updateFilter3() {
        const selectedCat1 = filter1.value;
        const selectedCat2 = filter2.value;
        filter3.innerHTML = '<option value="all">Select Specialization...</option>'; // Reset
        filter3.disabled = true;

        if (selectedCat1 !== 'all' && selectedCat2 !== 'all') {
            const relevantCourses = allCourses.filter(course => course.Category1 === selectedCat1 && course.Category2 === selectedCat2);
            const specializations = [...new Set(relevantCourses.map(course => course.Category3).filter(Boolean))].sort();

            if (specializations.length > 0) {
                specializations.forEach(spec => {
                    const option = document.createElement("option");
                    option.value = spec;
                    option.textContent = spec;
                    filter3.appendChild(option);
                });
                filter3.disabled = false;
            }
        }
        applyFilters(); // Update display
    }

    // --- FILTER LOGIC (No changes needed here) ---

    function applyFilters() {
        const selectedCat1 = filter1.value;
        const selectedCat2 = filter2.value;
        const selectedCat3 = filter3.value;

        const filteredCourses = allCourses.filter(course => {
            const match1 = (selectedCat1 === 'all' || course.Category1 === selectedCat1);
            const match2 = (selectedCat2 === 'all' || course.Category2 === selectedCat2);
            const match3 = (selectedCat3 === 'all' || course.Category3 === selectedCat3);
            return match1 && match2 && match3;
        });

        displayCourses(filteredCourses);
    }

    // --- DISPLAY LOGIC (THIS IS THE MODIFIED SECTION) ---

    function displayCourses(coursesToDisplay) {
        courseContainer.innerHTML = ""; // Clear existing content

        if (coursesToDisplay.length === 0) {
            courseContainer.innerHTML = `<p class="text-center w-100">No courses match your selection.</p>`;
            return;
        }

        coursesToDisplay.forEach(course => {
            // This link pre-fills the course name in your Google Form. It's used for the "Know More" button.
            // IMPORTANT: Make sure to replace "YOUR_COURSE_NAME_FIELD_ID" with your actual field ID from Google Forms.
            const courseFormLink = `https://docs.google.com/forms/d/e/1FAIpQLSchJEW6cWG2wuzBeDR7dHL8DxGZ7XRB6qAl15uMGH9FThqPnA/viewform?usp=pp_url&entry.YOUR_COURSE_NAME_FIELD_ID=${encodeURIComponent(course["Course Name"])}`;
            
            // --- MODIFIED SECTION START ---
            
            // This is the new, simplified HTML for the course card.
            const courseHTML = `
                <div class="col-md-6 col-lg-4 col-xl-3 mb-4 d-flex align-items-stretch">
                    <div class="course-card d-flex flex-column">
                        <div class="flex-grow-1">
                            <h3 class="course-title">${course["Course Name"]}</h3>
                            <p><strong>Duration:</strong> ${course["Duration"]}</p>
                            <p><strong>Mode:</strong> ${course["Mode"]}</p>
                            <p class="course-desc">${course["Modules"] || 'Detailed curriculum available.'}</p>
                        </div>
                        <div class="mt-auto pt-3">
                            <a href="${courseFormLink}" class="btn btn-primary w-100" target="_blank">Know More</a>
                        </div>
                    </div>
                </div>
            `;
            // --- MODIFIED SECTION END ---

            courseContainer.innerHTML += courseHTML;
        });
    }

    // --- EVENT LISTENERS (No changes needed here) ---
    filter1.addEventListener("change", updateFilter2);
    filter2.addEventListener("change", updateFilter3);
    filter3.addEventListener("change", applyFilters);

    window.resetFilters = function() {
        filter1.value = 'all';
        filter2.value = 'all';
        filter3.value = 'all';
        filter2.disabled = true;
        filter3.disabled = true;
        displayCourses(allCourses);
    }
});