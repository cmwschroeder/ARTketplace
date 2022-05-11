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

const addArt = async (req,res) => {
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

    if(title && description && imageLink && price) {
        const response = await fetch('/profile/artpiece', {
            method: 'POST',
            body: JSON.stringify({ title, description, imageLink, price, forSale }),
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

addArtButton.addEventListener('click', addArt);