document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contact_form");

  /* ================= CONTACT FORM (EMAILJS) ================= */

  if (!form) {
    console.warn("❌ contact_form not found on this page");
    return; // ✅ do nothing silently
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const selectedRadio = document.querySelector('input[name="type"]:checked');

    // ✅ Extra safety checks
    if (!nameInput || !emailInput || !messageInput) {
      alert("Form fields are missing. Please reload the page.");
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    /* ✅ Validation */
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!selectedRadio) {
      alert("Please select Query or Feedback.");
      return;
    }

    const type = selectedRadio.value;

    /* ✅ Send Email via EmailJS */
    emailjs.send("service_yow7uoi", "template_8tnxstc", {
      title: type,
      name,
      email,
      message,
      type
    })
    .then(() => {
      alert("✅ Email sent successfully!");
      form.reset();
    })
    .catch(error => {
      alert("❌ Failed to send email. Please try again.");
      console.error("EmailJS Error:", error);
    });
  });

});