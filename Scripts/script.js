var isDark;
var loader = document.getElementById("loader");
var icon = document.getElementById("dark-icon");

localStorage.getItem("is-dark") == "true" ? (isDark = true) : (isDark = false);

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (isDark) isDark = false;
  else isDark = true;
  // Storing the current theme in the browser's local storage
  localStorage.setItem("is-dark", isDark);
};

if (isDark) document.body.classList.toggle("dark-theme");

window.addEventListener("load", function () {
  loader.style.display = "none";
});
