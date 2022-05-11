const artSection = document.querySelector("#art-section");

//references to buttons
const artButton = document.querySelector("#art-button");
const addButton = document.querySelector("#add-button");
const collectionButton = document.querySelector("#collection-button");

const showCollections = async (event) => {
    if(!artSection.classList.contains('hidden')) {
        artSection.classList.add("hidden");
    }

    const userId = collectionButton.getAttribute("data-user");
    
    const response = await fetch('/api/collections/user/' + userId, {
        method: 'GET',
    }); 

    const collections = await response.json();

    console.log(collections);
};

collectionButton.addEventListener('click', showCollections);

artButton.addEventListener('click', () => {
    if(artSection.classList.contains('hidden')) {
        artSection.classList.remove("hidden");
        artSection.classList.add("flex");
    }
});