document.addEventListener("DOMContentLoaded", function () {

  console.log("Script Loaded"); // DEBUG CHECK

  const form = document.getElementById("contactForm");

  if (!form) {
    console.log("Form not found");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("Form Submitted"); // DEBUG CHECK

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      alert(data.message);

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Email failed to send");
    }
  });

});