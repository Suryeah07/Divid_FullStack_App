  const themeButtons = document.querySelectorAll(".theme-toggle");
  const menuButton = document.getElementById("menu_toggle");
  const dropdown = document.querySelector(".dropdown");

  /* ================= THEME TOGGLE ================= */

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeButtons.forEach(btn => btn.textContent = "☀️");
  } else {
    themeButtons.forEach(btn => btn.textContent = "🌙");
  }

  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      themeButtons.forEach(btn => {
        btn.textContent = isDark ? "☀️" : "🌙";
      });
    });
  });

  /* ================= MENU TOGGLE ================= */

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      dropdown.classList.remove("show");
    }
  });



