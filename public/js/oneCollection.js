
async function getCollection() {
    const response = await fetch("/api/collections/:id", {
        method: "GET",
      });
}




const allButtons = document.querySelectorAll(".viewButton");

for(let i=0; i<allButtons.length; i++) {
    allButtons[i].addEventListener("click", function() {
        location.href = `/collections/${theCollection.artPiece[i].id}`;
    })
}