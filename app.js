document.addEventListener("DOMContentLoaded", function() {
  // Select required elements
  const centerPanel = document.querySelector(".center-panel");
  const contactTab = document.querySelector(".contact-tab");
  const contactPanel = document.querySelector(".contact-panel");
  const closeButton = document.querySelector("#close-button");
  const contactButton = document.querySelector("#contact-button");
  const projectButton = document.getElementById("projects-button");
  const certificationsButton = document.getElementById("certifications-button");
  const backToTopButton = document.getElementById("back-to-top");
  const projectsSection = document.getElementById("projects-section");
  const certificationsSection = document.getElementById("certifications-section");
  const backToTopCertButton = document.getElementById("back-to-top-cert");

  const backgroundAudio = document.querySelector("#background-audio");
  const click = document.getElementById("clicksfx");
  const choose = document.getElementById("choosesfx");
  const back = document.getElementById("backsfx");
  const windowopen = document.getElementById("windowopensfx");
  const windowclose = document.getElementById("windowclosesfx");

  //Lower the volume of the background audio
  backgroundAudio.volume = 0.2;
  click.volume = 0.15;
  choose.volume = 0.15;
  back.volume = 0.15;
  windowopen.volume = 0.15;
  windowclose.volume = 0.15;

  // Set initial styles for the center panel
  centerPanel.style.opacity = "0";
  centerPanel.style.transform = "translateY(100vh)";
  centerPanel.style.visibility = "visible";

  // Apply transition and animation to show the center panel
  setTimeout(function() {
    centerPanel.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    centerPanel.style.opacity = "1";
    centerPanel.style.transform = "translateY(0)";
  }, 100);

  // Flag to track the state of the contact panel
  let contactPanelOpen = false;

  // Set initial state for projects section and certification section
  if (projectsSection) {
    projectsSection.style.opacity = "0";
    projectsSection.style.transform = "translateY(50px)";
    projectsSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  }

  if (certificationsSection) {
    certificationsSection.style.opacity = "0";
    certificationsSection.style.transform = "translateY(50px)";
    certificationsSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  }

  // Function to toggle the contact panel
  function toggleContactPanel() {
    if (contactPanelOpen) {
      // Contact panel is already open, do nothing
      return;
    }

    centerPanel.classList.remove("show"); // Hide the center panel
    contactPanel.classList.add("show"); // Show the contact panel
    contactPanelOpen = true; // Update the state of the contact panel
    contactButton.style.pointerEvents = "none"; // Disable click on contact button
  }

  // Handle click event on the contact tab
  contactTab.addEventListener("click", toggleContactPanel);

  // Handle click event on the close button
  closeButton.addEventListener("click", function() {
    // Animate the contact panel to slide down and hide
    contactPanel.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    contactPanel.style.opacity = "0";
    contactPanel.style.transform = "translateY(100%)";

    // After the animation completes, reset the styles of the contact panel and show the center panel
    setTimeout(function() {
      contactPanel.style.visibility = "hidden";
      contactPanel.style.opacity = "1";
      contactPanel.style.transform = "translateY(0)";
      centerPanel.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      centerPanel.style.opacity = "1";
      centerPanel.style.transform = "translateY(0)";
      centerPanel.style.visibility = "visible";
      contactPanelOpen = false; // Update the state of the contact panel
      contactButton.style.pointerEvents = "auto"; // Enable click on contact button
    }, 500);
  });
  
  // Continuous checking of the contact panel state
  setInterval(function() {
    if (contactPanelOpen) {
      if (contactPanel.style.visibility === "hidden") {
        // Animate the contact panel to slide up and show
        contactPanel.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        contactPanel.style.opacity = "1";
        contactPanel.style.transform = "translateY(0)";
        contactPanel.style.visibility = "visible";
      }
    } else {
      if (contactPanel.style.visibility === "visible") {
        // Animate the contact panel to slide down and hide
        contactPanel.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        contactPanel.style.opacity = "0";
        contactPanel.style.transform = "translateY(100%)";

        // After the animation completes, reset the styles of the contact panel
        setTimeout(function() {
          contactPanel.style.visibility = "hidden";
          contactPanel.style.opacity = "1";
          contactPanel.style.transform = "translateY(0)";
        }, 500);
      }
    }
  }, 100);

  // Handle scrolling animation for projects section
  function checkProjectsVisibility() {
    if (!projectsSection) return;
    
    const rect = projectsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If projects section is in viewport
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
      // Only animate if it hasn't played yet or was reset
      if (projectsSection.style.opacity === "0" || projectsSection.style.transform === "translateY(50px)") {
        projectsSection.style.opacity = "1";
        projectsSection.style.transform = "translateY(0)";
        
        // Reset project cards animation
        document.querySelectorAll('.project-card').forEach(card => {
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = ''; // Remove the animation style to let CSS take over
        });
        
        // Reset section title and button animations
        const sectionTitle = projectsSection.querySelector('.section-title');
        const viewAllBtn = projectsSection.querySelector('.view-all-btn');
        
        if (sectionTitle) {
          sectionTitle.style.animation = 'none';
          sectionTitle.offsetHeight; // Trigger reflow
          sectionTitle.style.animation = '';
        }
        
        if (viewAllBtn) {
          viewAllBtn.style.animation = 'none';
          viewAllBtn.offsetHeight; // Trigger reflow
          viewAllBtn.style.animation = '';
        }
        
        // Mark that we've played the animation
        projectsAnimationPlayed = true;
      }
    } else if (rect.top > windowHeight) {
      // Only reset when scrolling up and the section is completely below viewport
      projectsSection.style.opacity = "0";
      projectsSection.style.transform = "translateY(50px)";
    }
  }

  function checkCertificatesVisibility() {
    if (!certificationsSection) return;
    
    const rect = certificationsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If certificates section is in viewport
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
      // Only animate if it hasn't played yet or was reset
      if (certificationsSection.style.opacity === "0" || certificationsSection.style.transform === "translateY(50px)") {
        certificationsSection.style.opacity = "1";
        certificationsSection.style.transform = "translateY(0)";
        
        // Reset certificate cards animation
        document.querySelectorAll('.certificate-card').forEach(card => {
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = ''; // Remove the animation style to let CSS take over
        });
        
        // Reset section title and button animations
        const sectionTitle = certificationsSection.querySelector('.section-title');
        
        if (sectionTitle) {
          sectionTitle.style.animation = 'none';
          sectionTitle.offsetHeight; // Trigger reflow
          sectionTitle.style.animation = '';
        }
      }
    } else if (rect.top > windowHeight) {
      // Only reset when scrolling up and the section is completely below viewport
      certificationsSection.style.opacity = "0";
      certificationsSection.style.transform = "translateY(50px)";
    }
  }
  
  // Check visibility on scroll
  window.addEventListener("scroll", checkProjectsVisibility);
  window.addEventListener("scroll", checkCertificatesVisibility);
  
  // Initial check for visibility
  checkProjectsVisibility();
  checkCertificatesVisibility();

  // Handle user interaction to play the background audio
  document.addEventListener("click", function() {
    backgroundAudio.play().catch(function(error) {
      console.log(error);
    });
  });

  // Function that plays the sound effects 
  function playClick(){
    click.currentTime = 0;
    click.play();
  }
  function playChoose(){
    choose.currentTime = 0;
    choose.play();
  }
  function playBack(){
    back.currentTime = 0;
    back.play();
  }
  function playWinOpen(){
    windowopen.currentTime = 0;
    windowopen.play();
  }
  function playWinClose(){
    windowclose.currentTime = 0;
    windowclose.play();
  }

  // Add click event listeners to clickable elements

  // Click event for icons and buttons (except the back button)
  document.querySelectorAll(".social-icons img, #contact-button, #projects-button, #certifications-button").forEach(function(element) {
    element.addEventListener("click", function() {
      playClick();
    });
  });

  // Hover event for icons and buttons (except the back button)
  document.querySelectorAll(".social-icons img, #contact-button, #projects-button, #certifications-button, back-to-top").forEach(function(element) {
    element.addEventListener("mouseover", function() {
      playChoose();
    });
  });

  if (backToTopButton) {
    backToTopButton.addEventListener("mouseover", function() {
      playChoose();
    });
  }

  // Add sound effects to project cards
  document.querySelectorAll(".project-card").forEach(function(card) {
    // Flag to track if hover sound has been played
    let hoverSoundPlayed = false;
    
    card.addEventListener("mouseenter", function() {
      if (!hoverSoundPlayed) {
        playChoose();
        hoverSoundPlayed = true;
      }
    });
    
    card.addEventListener("mouseleave", function() {
      // Reset the flag when mouse leaves the card
      hoverSoundPlayed = false;
    });
  });

  document.querySelectorAll(".certificate-card").forEach(function(card) {
    // Flag to track if hover sound has been played
    let hoverSoundPlayed = false;
    
    card.addEventListener("mouseenter", function() {
      if (!hoverSoundPlayed) {
        playChoose();
        hoverSoundPlayed = true;
      }
    });
    
    card.addEventListener("mouseleave", function() {
      // Reset the flag when mouse leaves the card
      hoverSoundPlayed = false;
    });
  });

  document.querySelectorAll(".certificate-link").forEach(function(link) {
    link.addEventListener("click", function() {
      playClick();
    });
    
    // Also add hover sound effect
    link.addEventListener("mouseover", function() {
      playChoose();
    });
  });

  // Click event for the back button
  document.querySelector("#close-button").addEventListener("click", function() {
    playBack();
  });

  // Click event for opening the contact details panel
  document.querySelector(".contact-tab").addEventListener("click", function() {
    playWinOpen();
  });

  // Click event for closing the contact details panel
  document.querySelector("#close-button").addEventListener("click", function() {
    playWinClose();
  });

  // Smooth scroll to projects section when projects button is clicked with animation
  projectButton.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Prepare the animation for projects section
    if (projectsSection) {
      projectsSection.style.opacity = "0";
      projectsSection.style.transform = "translateY(50px)";
    }
    
    // Smooth scroll to the projects section
    projectsSection.scrollIntoView({ behavior: "smooth" });
    
    // Animate in the projects section after a short delay
    setTimeout(function() {
      if (projectsSection) {
        projectsSection.style.opacity = "1";
        projectsSection.style.transform = "translateY(0)";
      }
    }, 300);
  });

  if (certificationsButton) {
    certificationsButton.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Prepare the animation for certifications section
      if (certificationsSection) {
        certificationsSection.style.opacity = "0";
        certificationsSection.style.transform = "translateY(50px)";
      }
      
      // Smooth scroll to the certifications section
      certificationsSection.scrollIntoView({ behavior: "smooth" });
      
      // Animate in the certifications section after a short delay
      setTimeout(function() {
        if (certificationsSection) {
          certificationsSection.style.opacity = "1";
          certificationsSection.style.transform = "translateY(0)";
        }
      }, 300);
      
      // Play sound effect
      playClick();
    });
  }

  // Back to top button functionality
  if (backToTopButton) {
    backToTopButton.addEventListener("click", function() {
      playClick(); // Play click sound effect
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  if (backToTopCertButton) {
    backToTopCertButton.addEventListener("click", function() {
      playClick(); // Play click sound effect
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    
    // Add hover sound effect
    backToTopCertButton.addEventListener("mouseover", function() {
      playChoose();
    });
  }

  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)'; 
      }
    });
  }, { threshold: 0.1 });

  if (certificationsSection) {
    certObserver.observe(certificationsSection);
  }
  
});