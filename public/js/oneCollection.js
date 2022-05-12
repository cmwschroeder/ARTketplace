function getCollection() {
  const allButtons = document.querySelectorAll(".viewButton");

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      location.href = `/art/${i + 1}`;
    });
  }
}

getCollection();
