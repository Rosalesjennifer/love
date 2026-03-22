// Password verification
const CORRECT_PASSWORD = "112324";

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput");
    const errorMessage = document.getElementById("errorMessage");
    const password = passwordInput.value;

    if (password === CORRECT_PASSWORD) {
        // Hide password page and show dashboard
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        
        // Initialize the dashboard
        showSection('home');
        
        // Clear error message
        errorMessage.textContent = "";
    } else {
        // Show error message
        errorMessage.textContent = "❌ Incorrect password. Try again!";
        passwordInput.value = "";
        passwordInput.focus();
    }
}

// Allow Enter key to submit password
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("passwordInput");
    if (passwordInput) {
        passwordInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                checkPassword();
            }
        });
    }
});

// Function to show a specific section
function showSection(sectionId, event) {
    // Prevent default anchor behavior if called from onclick
    if (event) {
        event.preventDefault();
    }

    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to the clicked nav link or find it by href
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Update URL hash without jumping
    history.pushState(null, null, `#${sectionId}`);

    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Set active section on page load (after password is entered)
document.addEventListener('DOMContentLoaded', function() {
    // Check for hash in URL or default to home
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
});

// Pause all videos when switching sections (optional - for better performance)
function pauseAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });
}

// Pause videos before switching sections
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        pauseAllVideos();
    }
});