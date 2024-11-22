$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Fahim Foisal";
            $("#favicon").attr("href", "assets/images/man.png");
        }
        else {
            document.title = "Fahim's Portfolio";
            $("#favicon").attr("href", "assets/images/man.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Research", "Semantic Web", "Machine Learning", "Large Language Models", "Frontend Development", "Backend Development", "Web Designing", "Android Development", "Web Development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}
function continuousLevitate(element) {
    const radius = 5;
    let angle = Math.random() * 2 * Math.PI; // Random initial angle for each element

    function animate() {
        // Update angle slightly to create a circular motion effect
        angle += 0.02;

        // Calculate x and y offsets based on angle, moving within the radius
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Apply the translation to the element
        element.style.transform = `translate(${x}px, ${y}px)`;

        // Call the next frame
        requestAnimationFrame(animate);
    }

    animate(); // Start the animation
}
// Skill section v2 starts
// background bubble effect
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas to cover the parent section
const section = document.querySelector('.skill-section');
canvas.width = section.offsetWidth;
canvas.height = section.offsetHeight;

// Handle resizing of the section
window.addEventListener('resize', () => {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
});

// Array to hold all the bubbles
const bubbles = [];

// Water bubble class
class WaterBubble {
    constructor() {
        this.radius = Math.random() * 12 + 20; // Bubble size (15 to 25px)
        this.x = Math.random() * canvas.width; // Random horizontal position
        this.y = canvas.height + this.radius; // Start below the canvas
        this.speedY = Math.random() * 0.3 + 0.2; // Slower upward speed
        this.speedX = Math.random() * 0.4 - 0.2; // Gentle side-to-side movement
        this.opacity = Math.random() * 0.3 + 0.2; // Semi-transparent bubbles
        this.color = `rgba(173, 216, 230, ${this.opacity})`; // Light blue color
    }

    update() {
        this.y -= this.speedY; // Move bubble upwards slowly
        this.x += Math.sin(this.y * 0.02) * this.speedX; // Gentle wobbling effect

        // Remove bubble if it goes off the top of the canvas
        if (this.y + this.radius < 0) {
            const index = bubbles.indexOf(this);
            if (index > -1) bubbles.splice(index, 1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x - this.radius / 3, this.y - this.radius / 3, this.radius / 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`;
        ctx.fill();
        ctx.closePath();
    }
}

// Function to animate the bubbles
function bubble_animator() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw and update each bubble
    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });

    // Add new bubbles over time with a lower spawn rate
    if (Math.random() < 0.02) {
        bubbles.push(new WaterBubble());
    }

    requestAnimationFrame(bubble_animator); // Loop the animation
}

// Start the animation
bubble_animator();

// Apply continuous levitation effect to each grid item
document.querySelectorAll('.grid-item').forEach(item => {
    continuousLevitate(item);
});

document.querySelectorAll('.grid-item').forEach(item => {
    const card = item.querySelector('.card');
    const title = item.getAttribute('data-title');
    // const proficiency = item.getAttribute('data-proficiency');
    // const duration = item.getAttribute('data-duration');
    // const comfortability = item.getAttribute('data-comfortability');

    // card.querySelector('h3').textContent = title;
    const progressBars = card.querySelectorAll('.progress-bar');

    // Set data-progress attributes dynamically
    // progressBars[0].setAttribute('data-progress', proficiency);
    // progressBars[1].setAttribute('data-progress', duration);
    // progressBars[2].setAttribute('data-progress', comfortability);

    // Animate progress bars on hover
    item.addEventListener('mouseenter', () => {
        // card.title = progressBars[0].getAttribute('data-progress')
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress') + '%';
            bar.style.width = targetWidth;
        });
    });

    // Reset progress bars when not hovering
    item.addEventListener('mouseleave', () => {
        progressBars.forEach(bar => {
            bar.style.width = '0'; // Reset width to 0
        });
    });
});

// Skill section v2 ends
function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .code', { interval: 600 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });