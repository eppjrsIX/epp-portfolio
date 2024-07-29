document.getElementById("back-button").addEventListener("click", function () {
  window.location.href = "../index.html#portfolio";
});

document
  .getElementById("download-button")
  .addEventListener("click", function () {
    window.open("https://www.mediafire.com/your-file-link", "_blank");
  });

// New Feature - JS Obfuscated Code
document.addEventListener("keydown", function (event) {
  // Disable Ctrl+U and Cmd+U
  if ((event.ctrlKey || event.metaKey) && event.key === "u") {
    event.preventDefault();
    return;
  }

  // Disable Ctrl+Shift+I and Cmd+Option+I (for Developer Tools)
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "I") {
    event.preventDefault();
    return;
  }

  // Disable F12 (Developer Tools)
  if (event.key === "F12") {
    event.preventDefault();
    return;
  }

  // Disable Ctrl+S (Save page)
  if ((event.ctrlKey || event.metaKey) && event.key === "s") {
    event.preventDefault();
    return;
  }

  // Disable Ctrl+P (Print page)
  if ((event.ctrlKey || event.metaKey) && event.key === "p") {
    event.preventDefault();
    return;
  }
});

// Disable right-click context menu
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
