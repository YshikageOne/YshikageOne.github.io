document.addEventListener("DOMContentLoaded", function() {
  // Select required elements
  const centerPanel = document.querySelector(".center-panel");
  const contactTab = document.querySelector(".contact-tab");
  const contactPanel = document.querySelector(".contact-panel");
  const closeButton = document.querySelector("#close-button");
  const contactButton = document.querySelector("#contact-button");
  const backgroundAudio = document.querySelector("#background-audio");
  const click = document.getElementById("clicksfx");
  const choose = document.getElementById("choosesfx");
  const back = document.getElementById("backsfx");
  const windowopen = document.getElementById("windowopensfx");
  const windowclose = document.getElementById("windowclosesfx");

  // Lower the volume of the background audio
  backgroundAudio.volume = 0.5; // Set the volume to 0.5 (50% volume)

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
document.querySelectorAll(".social-icons img, #contact-button").forEach(function(element) {
  element.addEventListener("click", function() {
    playClick();
  });
});

// Hover event for icons and buttons (except the back button)
document.querySelectorAll(".social-icons img, #contact-button").forEach(function(element) {
  element.addEventListener("mouseover", function() {
    playChoose();
  });
});

// Click event for the back button
document.querySelector("#close-button").addEventListener("click", function() {
  playBack();
});

// Click event for opening the contact details panel
document.querySelector(".contact-tab").addEventListener("click", function() {
  playWindowOpen();
});

// Click event for closing the contact details panel
document.querySelector("#close-button").addEventListener("click", function() {
  playWindowClose();
});

});
