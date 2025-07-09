document.addEventListener("DOMContentLoaded", function () {
    const teamContainer = document.getElementById("team-container");

    if (teamContainer) {
        fetch("images/team.csv")
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(csvData => {
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        let teamMembers = results.data;
                        
                        teamContainer.innerHTML = ""; // Clear loading state

                        if (teamMembers.length === 0) {
                            teamContainer.innerHTML = `<p class="text-center w-100">Team information is currently unavailable.</p>`;
                            return;
                        }

                        teamMembers.forEach(member => {
                            // --- Build Highlights List ---
                            let highlightsHTML = '';
                            if (member.Highlights) {
                                const highlights = member.Highlights.split(';').map(item => item.trim());
                                highlightsHTML = `
                                    <ul class="highlights-list">
                                        ${highlights.map(item => `<li><i class="fas fa-check-circle"></i> ${item}</li>`).join('')}
                                    </ul>
                                `;
                            }
                            
                            // --- Build Expertise Tags ---
                            let expertiseHTML = '';
                            if (member.Expertise) {
                                const tags = member.Expertise.split(',').map(tag => tag.trim());
                                expertiseHTML = `
                                    <div class="expertise-tags">
                                        ${tags.map(tag => `<span class="expertise-tag">${tag}</span>`).join('')}
                                    </div>
                                `;
                            }

                            // --- Build Social Links ---
                            let socialLinksHTML = '';
                            if (member.LinkedIn && member.LinkedIn.trim() !== '') {
                                socialLinksHTML += `
                                    <a href="${member.LinkedIn}" target="_blank" class="social-icon" aria-label="LinkedIn Profile">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                `;
                            }
                             // You can add more social links here (e.g., Twitter)
                             // if (member.Twitter && member.Twitter.trim() !== '') { ... }


                            // --- FINAL "V3" CARD HTML ---
                            const memberHTML = `
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="team-card-v3">
                                    <div class="card-header">
                                        <img src="${member.Image}" alt="${member.Name}" class="team-photo-v3">
                                    </div>
                                    <div class="card-body">
                                        <h4 class="team-name">${member.Name}</h4>
                                        <p class="team-role">${member.Role}</p>
                                        
                                        ${highlightsHTML}
                                        ${expertiseHTML}
                                    </div>
                                    <div class="card-footer">
                                        <div class="social-links">
                                            ${socialLinksHTML}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                            teamContainer.innerHTML += memberHTML;
                        });
                    }
                });
            })
            .catch(error => {
                console.error("Error loading team data:", error);
                teamContainer.innerHTML = `<p class="text-center w-100 text-danger">Could not load team data.</p>`;
            });
    }
});