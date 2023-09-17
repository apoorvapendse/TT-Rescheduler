document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the "Request Slot" element
    const requestSlot = document.querySelector(".request-slot");
  
    // Add a hover effect using CSS
    requestSlot.addEventListener("mouseover", function () {
      requestSlot.style.backgroundColor = "#f7af7b"; // Change the background color on hover
      requestSlot.style.color = "#0f0d0d"; // Change the text color on hover
      requestSlot.style.cursor = "pointer"; // Change the cursor to a pointer on hover
    });
  
    requestSlot.addEventListener("mouseout", function () {
      requestSlot.style.backgroundColor = "transparent"; // Reset the background color
      requestSlot.style.color = "#f7af7b"; // Reset the text color
    });
  
   