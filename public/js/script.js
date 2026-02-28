document.getElementById("contactForm")?.addEventListener("submit", async function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try{
        const response = await fetch("/send-email",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,email,message})
        });

        const data = await response.json();

        showPopup(data.message,"success");
        this.reset();

    }catch(err){
        showPopup("Something went wrong","error");
    }
});


function showPopup(message,type){

    const popup = document.createElement("div");
    popup.innerText = message;

    popup.style.position="fixed";
    popup.style.top="20px";
    popup.style.right="20px";
    popup.style.padding="15px 25px";
    popup.style.borderRadius="8px";
    popup.style.color="white";
    popup.style.zIndex="9999";
    popup.style.fontWeight="500";

    popup.style.background = type==="success" ? "#16a34a" : "#dc2626";

    document.body.appendChild(popup);

    setTimeout(()=>{
        popup.remove();
    },3000);
}