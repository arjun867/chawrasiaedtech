document.addEventListener("DOMContentLoaded", function () {
    let testimonials = [
        { name: "Sanak", text: "Chawrasia EdTech has an outstanding math teacher who truly knows how to bring the subject to life. Highly recommended!" },
        { name: "Sidharth", text: "Direct & easy to understand explanations for all topics." },
        { name: "Vaishali", text: "Good patience and good technique." },
        { name: "Rafia Naaz", text: "Fantastic teacher! Clear explanations and always help students grasp even the hardest concepts." },
        { name: "Imran", text: "The teacher of Chawrasia EdTech helped me with Engineering Mathematics 1E for my electrical engineering course in the UK. He makes sure I understand everything before moving on." },
        { name: "Alliyah Maxine", text: "Sir is very kind and solves every doubt. Highly recommended!" },
        { name: "Ranju", text: "Great teacher! Makes everything clear when explaining." },
        { name: "Ajay", text: "Takes extra care to explain each concept for proper understanding. Excellent communication skills and friendly." },
        { name: "Parimal", text: "Very good Chawrasia EdTech." },
        { name: "Ashley", text: "The teachers at Chawrasia EdTech know the content very well and are great at explaining concepts." },
        { name: "Aadi Dhanda", text: "Engaging manner of teaching. Good knowledge of the subject." },
        { name: "Shiva", text: "Sir is very understanding. He guides you exactly on how to take on a concept or any problem." },
        { name: "Saagarika", text: "The tutor of Chawrasia EdTech explains topics well and adapts to the student’s pace." },
        { name: "Dev", text: "The tutors at Chawrasia EdTech are very attentive and understanding. They simplify difficult concepts for easy understanding." },
        { name: "Joseph", text: "Great tutor who helps you understand everything about circuits." },
        { name: "Iulian", text: "Great explanation by Chawrasia EdTech." },
        { name: "Li", text: "Easy to understand. Very good teaching!" },
        { name: "Gessel", text: "Good knowledge about the subject. Good presentation skills." },
        { name: "Matilde", text: "Few professors are as caring and interested in a student’s needs as Chawrasia EdTech tutors!" },
        { name: "Izhar", text: "Chawrasia EdTech has an excellent tutor who explains everything step-by-step. Highly recommended!" },
        { name: "Arsalah", text: "The tutor is patient and explains in detail where I get stuck. Highly recommend!" },
        { name: "Durvas", text: "Chawrasia EdTech has an excellent teacher. He helped me pass my final exam with quick responses and clear explanations!" },
        { name: "Keivan", text: "Chawrasia EdTech is a trustworthy platform with great tutors." },
        { name: "Nichole", text: "Very knowledgeable teacher who makes fundamentals clear using examples." },
        { name: "Thet Htut", text: "The tutor connected me with another expert for another subject I needed help with." },
        { name: "Vamsi", text: "Amazing tutor! Very patient and approachable. Listened to my problems and provided excellent lessons." },
        { name: "Yousif", text: "Chawrasia EdTech helped me find someone knowledgeable in my field of studies. Highly recommend it!" },
        { name: "Bala", text: "Great learning experience! The tutor is very thoughtful and quick to respond." },
        { name: "Kishlaya", text: "A perfect teacher with proper knowledge." },
        { name: "Sweta", text: "Very knowledgeable tutors and great help with assignments." },
        { name: "Nikhil", text: "Excellent methodology for explaining concepts. Very clear and precise!" },
        { name: "Mogasati", text: "Answers queries patiently and corrects misunderstandings." },
        { name: "Pratham", text: "Sandeep Sir is a great teacher with in-depth knowledge of the subject." },
        { name: "Prasaanth", text: "Sir is patient and explains doubts clearly." }
    ];

    let testimonialContainer = document.getElementById("testimonial-container");
    testimonialContainer.innerHTML = "";

    testimonials.forEach(testimonial => {
        let testimonialHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="testimonial-card">
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <h4 class="testimonial-name">- ${testimonial.name}</h4>
                </div>
            </div>
        `;
        testimonialContainer.innerHTML += testimonialHTML;
    });
});
