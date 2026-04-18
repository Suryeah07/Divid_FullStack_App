document.addEventListener("DOMContentLoaded", () => {

    const views = {
        home: document.getElementById("registerhome"),
        register: document.getElementById("register_form"),
        login: document.getElementById("login_form"),
    };

    const signUpBtn = document.getElementById("registerbutton");
    const loginBtn = document.getElementById("loginbutton");
    const backBtns = document.querySelectorAll(".backBtn");

    /* ---------- RENDER ---------- */
    function renderView() {
        const hash = location.hash.replace("#", "") || "home";

        Object.values(views).forEach(v => v.classList.add("hidden"));

        if (views[hash]) {
            views[hash].classList.remove("hidden");
        } else {
            views.home.classList.remove("hidden");
        }
    }

    /* ---------- EVENTS ---------- */
    signUpBtn?.addEventListener("click", () => {
        location.hash = "register";
    });

    loginBtn?.addEventListener("click", () => {
        location.hash = "login";
    });

    backBtns.forEach(btn => {
        btn.addEventListener("click", () => history.back());
    });

    window.addEventListener("hashchange", renderView);

    /* ---------- INIT ---------- */
    renderView();
});

document.addEventListener("DOMContentLoaded", () => {

  const registerForm = document.getElementById("register_form");
  const loginForm = document.getElementById("login_form");

  
/* ================= SIGN UP ================= */
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("reg_name").value.trim();
      const email = document.getElementById("reg_email").value.trim();
      const password = document.getElementById("reg_password").value;
      const confirm = document.getElementById("reg_confirm").value;

      if (!name || !email || !password || !confirm) {
        alert("Please fill all fields");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.some(user => user.email === email);
      if (exists) {
        alert("Email already registered");
        return;
      }

      // ✅ Save user
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      /* ✅ SEND SUCCESS EMAIL */
      emailjs.send(
        "service_yow7uoi",       // ✅ Your Service ID
        "template_cwt9ec9",       // ✅ Your Template ID
        {
          user_name: name,
          user_email: email
        }
      )
      .then(() => {
        alert("✅ Account created! Email sent successfully.");
      })
      .catch(error => {
        console.error("Email error:", error);
        alert("✅ Account created, but email failed.");
      });

      registerForm.reset();
      location.hash = "";

    });
  }



  /* ================= LOGIN ================= */
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const email = document.getElementById("login_email").value.trim();
      const password = document.getElementById("login_password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        user => user.email === email && user.password === password
      );

      if (!user) {
        alert("❌ Invalid email or password");
        return;
      }

      // ✅ Store logged-in user
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert(`✅ Welcome, ${user.name}!`);
      loginForm.reset();
      // redirect if needed
      window.location.href = "dashboard.html";
    });
  }

});