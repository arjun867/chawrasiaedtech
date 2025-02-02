document.addEventListener("DOMContentLoaded", function () {
    fetch("images/team.csv") // Ensure correct file path
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    let teamMembers = results.data;
                    let teamContainer = document.getElementById("team-container");

                    teamContainer.innerHTML = ""; // Clear existing content

                    teamMembers.forEach(member => {
                        let memberHTML = `
                            <div class="team-member">
                                <div class="team-card">
                                    <img src="${member.Image}" alt="${member.Name}" class="team-photo">
                                    <h4>${member.Name}</h4>
                                    <p>${member.Role}</p>
                                </div>
                            </div>
                        `;
                        teamContainer.innerHTML += memberHTML;
                    });
                }
            });
        })
        .catch(error => console.error("Error loading team data:", error));
});
