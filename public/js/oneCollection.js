function getCollection() {
  const allButtons = document.querySelectorAll(".viewButton");

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function (event) {
      location.href = `/art/${event.target.getAttribute("id")}`;
    });
  }
}

getCollection();
