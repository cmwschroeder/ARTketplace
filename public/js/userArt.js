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

//references to the button and image that popperjs will link together
const previewArtButton = document.querySelector("#preview-button");
const previewImageEl = document.querySelector("#preview-img");

//create a popper instance by passing in the two elements being linked
const popperInstance = Popper.createPopper(previewArtButton, previewImageEl);

//Add art function, will take what is in the input fields and 
const addArt = async (event) => {
    //get values in collection input fields to make sure they aren't both filled in
    const newCollection = newCollectionEl.value;
    const whichCollection = whichCollectionEl.value;

    //if they are both filled in then tell the user since they shouldn't both be filled in
    if(newCollection && (whichCollection != "No Collection")) {
        alert("Only fill in one collection box, or neither if you don't want to add this to a collection");
        return;
    }

    //grab values in all other input fields
    const title = titleEl.value;
    const description = descriptionEl.value;
    const imageLink = imageLinkEl.value;
    const price = priceEl.value;
    const forSale = forSaleEl.checked;


    //set up variables that we will send to the server to tell them what to do with collections
    var hasCollection = false;
    var collection;

    //check to make sure all fields we need filled in are filled in
    if(title && description && imageLink && price) {
        //logic to figure out if we are adding a new collection to the database, using an old collection, or using no colleciton
        if(newCollection) {
            hasCollection = true;
            collection = newCollection;
        } else if (whichCollection != "No Collection") {
            hasCollection = true;
            collection = whichCollection;
        } else {
            collection = "";
        }

        //use a post request to inform the server to add this art piece and data to the database
        const response = await fetch('/user/art/', {
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
    //tell the user that all of the fields were not filled in so the art wasn't added
    else {
        alert("One of the fields was not filled in, fill in all fields except optionally collections");
        return;
    }

};

//This function will update an art piece that already exists
const updateArt = async (event) => {
    //get values in collection input fields to make sure they aren't both filled in
    const newCollection = newCollectionEl.value;
    const whichCollection = whichCollectionEl.value;

    //if they are both filled in then tell the user since they shouldn't both be filled in
    if(newCollection && (whichCollection != "No Collection")) {
        alert("Only fill in one collection box, or neither if you don't want to add this to a collection");
        return;
    }

    //grab values in all other input fields
    const title = titleEl.value;
    const description = descriptionEl.value;
    const imageLink = imageLinkEl.value;
    const price = priceEl.value;
    const forSale = forSaleEl.checked;

    //set up variables that we will send to the server to tell them what to do with collections
    var hasCollection = false;
    var collection;

    //check to make sure all fields we need filled in are filled in
    if(title && description && imageLink && price) {
        //logic to determine what we are doing with the collection
        if(newCollection) {
            hasCollection = true;
            collection = newCollection;
        } else if (whichCollection != "No Collection") {
            hasCollection = true;
            collection = whichCollection;
        } else {
            collection = "";
        }

        //get the id of the current art by parsing the URL we are at
        const pathName = window.location.pathname.split("/");
        const artId = pathName[pathName.length - 1];

        //use a put request with the art id to tell the database to update this art piece
        const response = await fetch('/user/art/' + artId, {
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
    //tell the user that they didn't have all fields inputted so the art wasn't updated
    else {
        alert("One of the fields was not filled in, fill in all fields except optionally collections");
        return;
    }
};

//Delete art function that will delete the art that we are updating
const deleteArt = async (event) => {
    //get the id of the current art by parsing the URL we are at
    const pathName = window.location.pathname.split("/");
    const artId = pathName[pathName.length - 1];
    //send a delete request to the server with the id of the art telling it to delete that art piece from the db
    const response = await fetch('/user/art/' + artId, {
        method: 'DELETE',
    });

    //if we were able to delete the art go to profile, if not tell the user
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to delete art');
    }
};

//Preview art by clicking on the button and either showing or hiding a tooltip contianing the art using popperjs
previewArtButton.addEventListener('click', (event) => {
    //don't do anything if there is nothing put in the image link, except hide the image if it is up already
    if(imageLinkEl.value) {
        //if the tooltip is hidden then show and give the image source the text in the input field
        if(previewImageEl.classList.contains("hidden")) {
            previewImageEl.setAttribute("src", imageLinkEl.value);
            previewImageEl.classList.remove("hidden");
            //call update to update the postion on the page or else the tooltip will show up randomly to the right until a scroll happens
            popperInstance.update();
        }
        //if the tooltip is shown then just hide it
        else {
            previewImageEl.classList.add("hidden");
        }
    } 
    //if the image is shown but we deleted the image text we can just hide the tooltip
    else {
        if(!previewImageEl.classList.contains("hidden")) {
            previewImageEl.classList.add("hidden");
        }
    }
});

//only add event listeners to buttons that exist on page
if(addArtButton) {
    addArtButton.addEventListener('click', addArt);
};
if(deleteArtButton) {
    deleteArtButton.addEventListener('click', deleteArt);
    udpateArtButton.addEventListener('click', updateArt);
}