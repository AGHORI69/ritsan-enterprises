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
// PREBOOK FORM

document.getElementById("prebookForm")?.addEventListener("submit", async function(e){

e.preventDefault();

const business = document.getElementById("business").value;
const owner = document.getElementById("owner").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const requirements = document.getElementById("requirements").value;

try{

const response = await fetch("/prebook",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({business,owner,email,phone,requirements})
});

const data = await response.json();

alert(data.message);

}catch(err){

alert("Pre-booking failed");

}

});