document.addEventListener("DOMContentLoaded", function () {
    const courseContainer = document.getElementById("course-container");
    const loadingState = document.getElementById("loading-state");
    const searchBar = document.getElementById("search-bar");
    const filter1 = document.getElementById("filter1");
    const filter2 = document.getElementById("filter2");
    const filter3 = document.getElementById("filter3");
    const courseCounter = document.getElementById("course-counter");
    const resetBtn = document.getElementById("reset-filters-btn");

    let allCourses = [];

    // --- DATA FETCHING ---
    fetch("images/Course_Catalog.csv")
        .then(response => { if (!response.ok) throw new Error("Network response was not ok"); return response.text(); })
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    allCourses = results.data;
                    populateFilter(filter1, 'Category1');
                    displayCourses(allCourses);
                }
            });
        })
        .catch(error => {
            console.error("Error loading or parsing CSV:", error);
            if (loadingState) loadingState.style.display = 'none';
            courseContainer.innerHTML = `<p class="text-center w-100 text-danger">Could not load course data.</p>`;
        });

    function populateFilter(selectElement, categoryKey, filterSource = allCourses) {
        const categories = [...new Set(filterSource.map(course => course[categoryKey]).filter(Boolean))].sort();
        selectElement.innerHTML = `<option value="all">${selectElement.firstElementChild.textContent}</option>`;
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            selectElement.appendChild(option);
        });
    }

    function applyFiltersAndSearch() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCat1 = filter1.value;
        const selectedCat2 = filter2.value;
        const selectedCat3 = filter3.value;

        const filteredCourses = allCourses.filter(course => {
            const courseName = course['Course Name'] ? course['Course Name'].toLowerCase() : '';
            const shortDesc = course['ShortDescription'] ? course['ShortDescription'].toLowerCase() : '';
            const skills = course['SkillsLearnt'] ? course['SkillsLearnt'].toLowerCase() : '';

            const matchesSearch = (courseName.includes(searchTerm) || shortDesc.includes(searchTerm) || skills.includes(searchTerm));
            const matchesCat1 = (selectedCat1 === 'all' || course.Category1 === selectedCat1);
            const matchesCat2 = (selectedCat2 === 'all' || course.Category2 === selectedCat2);
            const matchesCat3 = (selectedCat3 === 'all' || course.Category3 === selectedCat3);
            
            return matchesSearch && matchesCat1 && matchesCat2 && matchesCat3;
        });
        displayCourses(filteredCourses);
    }

    function displayCourses(coursesToDisplay) {
        if (loadingState) loadingState.style.display = 'none';
        courseContainer.innerHTML = "";
        
        courseCounter.innerHTML = coursesToDisplay.length > 0
            ? `Showing <strong>${coursesToDisplay.length}</strong> of <strong>${allCourses.length}</strong> courses` : '';

        if (coursesToDisplay.length === 0) {
            courseContainer.innerHTML = `<div class="col-12 text-center not-found-message"><i class="fas fa-search-minus"></i><h3>No Courses Found</h3><p>We couldn't find any courses matching your criteria. Try adjusting your search or resetting the filters.</p></div>`;
            return;
        }

        coursesToDisplay.forEach((course, index) => {
            const courseContactLink = `course-contact.html`;

            // Build Tags
            let tagsHTML = '';
            if (course.Tags) {
                tagsHTML = course.Tags.split(',').map(tagStr => {
                    const tag = tagStr.trim();
                    let badgeClass = 'badge-primary';
                    if (tag.toLowerCase() === 'best seller') badgeClass = 'badge-success';
                    if (tag.toLowerCase() === 'new') badgeClass = 'badge-info';
                    if (tag.toLowerCase() === 'exam focus') badgeClass = 'badge-warning';
                    return `<span class="course-badge ${badgeClass}">${tag}</span>`;
                }).join('');
            }

            // Build Instructor Info
            let instructorHTML = '';
            if (course.InstructorName) {
                instructorHTML = `<div class="instructor-info">By ${course.InstructorName}`;
                if (course.InstructorLinkedIn) {
                    instructorHTML += `<a href="${course.InstructorLinkedIn}" target="_blank" class="instructor-linkedin-icon" aria-label="Instructor LinkedIn"><i class="fab fa-linkedin"></i></a>`;
                }
                instructorHTML += `</div>`;
            }

            // Build Skills List
            let skillsHTML = '';
            if (course.SkillsLearnt) {
                skillsHTML = `<ul class="details-list">${course.SkillsLearnt.split(';').map(skill => `<li><i class="fas fa-check-circle"></i>${skill.trim()}</li>`).join('')}</ul>`;
            }

            // Build Perks List
            let perksHTML = '';
            if (course.CoursePerks) {
                perksHTML = `<ul class="details-list">${course.CoursePerks.split(';').map(perk => `<li><i class="fas fa-star"></i>${perk.trim()}</li>`).join('')}</ul>`;
            }

            // Generate unique IDs for accordion elements
            const accordionId = `courseAccordion-${index}`;
            const skillsCollapseId = `skillsCollapse-${index}`;
            const perksCollapseId = `perksCollapse-${index}`;

            // --- FINAL DATA-RICH CARD HTML ---
            const courseHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="course-card-v4">
                    <div class="card-header">
                        <div class="course-icon"><i class="${course.IconClass || 'fas fa-book-open'}"></i></div>
                        <div class="course-tags">${tagsHTML}</div>
                    </div>
                    <div class="card-body">
                        <h3 class="course-title">${course["Course Name"]}</h3>
                        ${instructorHTML}
                        <p class="course-short-desc">${course.ShortDescription || 'A comprehensive course to build your skills.'}</p>
                        
                        <div class="accordion course-details-accordion" id="${accordionId}">
                            ${skillsHTML ? `
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${skillsCollapseId}">
                                        Skills You'll Gain
                                    </button>
                                </h2>
                                <div id="${skillsCollapseId}" class="accordion-collapse collapse" data-bs-parent="#${accordionId}">
                                    <div class="accordion-body">${skillsHTML}</div>
                                </div>
                            </div>` : ''}
                            
                            ${perksHTML ? `
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${perksCollapseId}">
                                        Course Perks
                                    </button>
                                </h2>
                                <div id="${perksCollapseId}" class="accordion-collapse collapse" data-bs-parent="#${accordionId}">
                                    <div class="accordion-body">${perksHTML}</div>
                                </div>
                            </div>` : ''}
                        </div>
                    </div>
                    <div class="card-footer">
                         <div class="course-meta">
                            <span><i class="fas fa-signal"></i> ${course.Level || 'All Levels'}</span>
                            <span><i class="fas fa-clock"></i> ${course.Duration || 'Flexible'}</span>
                         </div>
                         <a href="${courseContactLink}" class="btn btn-primary w-100 mt-3">Know More</a>
                    </div>
                </div>
            </div>`;
            courseContainer.innerHTML += courseHTML;
        });
    }

    // --- EVENT LISTENERS ---
    searchBar.addEventListener("input", applyFiltersAndSearch);
    filter1.addEventListener("change", () => {
        const selectedCat1 = filter1.value;
        const coursesForCat2 = (selectedCat1 === 'all') ? allCourses : allCourses.filter(c => c.Category1 === selectedCat1);
        populateFilter(filter2, 'Category2', coursesForCat2);
        filter2.disabled = (selectedCat1 === 'all');
        filter2.value = 'all';
        filter3.innerHTML = '<option value="all">All Specializations</option>';
        filter3.disabled = true;
        applyFiltersAndSearch();
    });
    filter2.addEventListener("change", () => {
        const selectedCat1 = filter1.value;
        const selectedCat2 = filter2.value;
        const coursesForCat3 = (selectedCat2 === 'all') ? allCourses.filter(c => c.Category1 === selectedCat1) : allCourses.filter(c => c.Category1 === selectedCat1 && c.Category2 === selectedCat2);
        populateFilter(filter3, 'Category3', coursesForCat3);
        filter3.disabled = (selectedCat2 === 'all');
        filter3.value = 'all';
        applyFiltersAndSearch();
    });
    filter3.addEventListener("change", applyFiltersAndSearch);
    resetBtn.addEventListener("click", () => {
        searchBar.value = '';
        filter1.value = 'all';
        filter2.value = 'all';
        filter2.disabled = true;
        filter3.value = 'all';
        filter3.disabled = true;
        displayCourses(allCourses);
    });
});