
const confettiCanvas = document.querySelector("#my-canvas");
const buyNow = document.querySelector(".enabledButton");

var confettiSettings = { target: "my-canvas" };
var confetti = new ConfettiGenerator(confettiSettings);




buyNow.addEventListener("click", async function() {
    try {
        
        const response = await fetch(window.location.pathname, {
            method: "PUT",
          });

          if(response.ok) {
              
            
            confettiCanvas.setAttribute("style", "position: fixed; top:0; left:0; width:100%; height: 100vh; z-index: 1000; visibility: visible; pointer-events: none;")
              confetti.render();
              
          }
          else {
              alert("Nopes");
          }
    } catch (error) {
        res.status(500);
    }
});


