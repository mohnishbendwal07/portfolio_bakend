// Force page to open at top
window.onload = () => window.scrollTo(0, 0);

// Smooth navbar scroll
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    // Scroll
    target.scrollIntoView({ behavior: "smooth" });

    // RESET animations
    resetAnimations(target);
  });
});

// Button scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Typing animation
const text = ["Frontend Developer", "Data Science Enthusiast", "Problem Solver"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  current = text[i];

  if (!deleting) {
    document.querySelector(".typing").textContent = current.substring(0, j++);
    if (j > current.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    document.querySelector(".typing").textContent = current.substring(0, j--);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % text.length;
    }
  }

  setTimeout(type, deleting ? 50 : 100);
}
type();

// Skill animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.width = bar.getAttribute("data-width");
    }
  });
});


function resetAnimations(section) {

  // Reset skill bars
  section.querySelectorAll(".progress-bar").forEach(bar => {
    bar.style.width = "0";
  });

  // Re-trigger after small delay
  setTimeout(() => {
    section.querySelectorAll(".progress-bar").forEach(bar => {
      bar.style.width = bar.getAttribute("data-width");
    });
  }, 300);

}

async function loadProjects() {
  try {
    const res = await fetch(" https://portfolio-bakend-k738.onrender.com");
    const data = await res.json();

    const container = document.querySelector(".project-container");
    container.innerHTML = "";

    data.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.log("Error:", error);
  }
}

loadProjects();