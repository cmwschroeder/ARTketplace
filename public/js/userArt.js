//references to input fields on page
const titleEl = document.querySelector("#title");
const descriptionEl = document.querySelector("#description");
const imageLinkEl = document.querySelector("#image-link");
const priceEl = document.querySelector("#price");
const whichCollectionEl = document.querySelector("#which-collection");
const newCollectionEl = document.querySelector("#new-collection");
const forSaleEl = document.querySelector("#for-sale");

//references to the buttons
const addArtButton = document.querySelector("#add-art");
const deleteArtButton = document.querySelector("#delete-art");
const udpateArtButton = document.querySelector("#update-art");


const previewArtButton = document.querySelector("#preview-button");
const previewImageEl = document.querySelector("#preview-img");

const popperInstance = Popper.createPopper(previewArtButton, previewImageEl);

const addArt = async (event) => {
    const newCollection = newCollectionEl.value;
    const whichCollection = whichCollectionEl.value;

    if(newCollection && (whichCollection != "No Collection")) {
        alert("Only fill in one collection box, or neither if you don't want to add this to a collection");
        return;
    }

    const title = titleEl.value;
    const description = descriptionEl.value;
    const imageLink = imageLinkEl.value;
    const price = priceEl.value;
    const forSale = forSaleEl.checked;


    var hasCollection = false;
    var collection;

    if(title && description && imageLink && price) {
        if(newCollection) {
            hasCollection = true;
            collection = newCollection;
        } else if (whichCollection != "No Collection") {
            hasCollection = true;
            collection = whichCollection;
        } else {
            collection = "";
        }

        const response = await fetch('/profile/artpiece', {
            method: 'POST',
            body: JSON.stringify({ title, description, imageLink, price, forSale, hasCollection, collection }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if we were able to create the art listing go to profile, if not tell the user
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to add art');
        }
    }
    else {
        alert("One of the fields was not filled in, fill in all fields except optionally collections");
        return;
    }

};

const updateArt = async (event) => {
    const newCollection = newCollectionEl.value;
    const whichCollection = whichCollectionEl.value;

    if(newCollection && (whichCollection != "No Collection")) {
        alert("Only fill in one collection box, or neither if you don't want to add this to a collection");
        return;
    }

    const title = titleEl.value;
    const description = descriptionEl.value;
    const imageLink = imageLinkEl.value;
    const price = priceEl.value;
    const forSale = forSaleEl.checked;

    var hasCollection = false;
    var collection;

    if(title && description && imageLink && price) {
        if(newCollection) {
            hasCollection = true;
            collection = newCollection;
        } else if (whichCollection != "No Collection") {
            hasCollection = true;
            collection = whichCollection;
        } else {
            collection = "";
        }

        const response = await fetch(window.location.pathname, {
            method: 'PUT',
            body: JSON.stringify({ title, description, imageLink, price, forSale, hasCollection, collection }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if we were able to update the art listing go to profile, if not tell the user
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to add art');
        }
    }
    else {
        alert("One of the fields was not filled in, fill in all fields except optionally collections");
        return;
    }
};

const deleteArt = async (event) => {
    const response = await fetch(window.location.pathname, {
        method: 'DELETE',
    });

    //if we were able to delete the art go to profile, if not tell the user
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to delete art');
    }
};

previewArtButton.addEventListener('click', (event) => {
    if(imageLinkEl.value) {
        if(previewImageEl.classList.contains("hidden")) {
            previewImageEl.setAttribute("src", imageLinkEl.value);
            previewImageEl.classList.remove("hidden");
            popperInstance.update();
        }
        else {
            previewImageEl.classList.add("hidden");
        }
    }
});

if(addArtButton) {
    addArtButton.addEventListener('click', addArt);
};
if(deleteArtButton) {
    deleteArtButton.addEventListener('click', deleteArt);
    udpateArtButton.addEventListener('click', updateArt);
}