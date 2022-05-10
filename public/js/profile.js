const artSection = document.querySelector("#art-section");

//references to buttons
const artButton = document.querySelector("#art-button");
const addButton = document.querySelector("#add-button");
const collectionButton = document.querySelector("#collection-button");

artButton.addEventListener('click', () => {
    artSection.classList.remove("hidden");
    artSection.classList.add("flex");
});