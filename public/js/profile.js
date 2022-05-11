//references to sections we will hide and show based on what buttons are clicked
const artSection = document.querySelector("#art-section");
const collectionSection = document.querySelector("#collection-section");

//references to buttons
const artButton = document.querySelector("#art-button");
const collectionButton = document.querySelector("#collection-button");

//This function will fetch all collections owned by the user and add all art pieces to the sections
//fore each collection, dynamically creates HTML
const showCollections = async (event) => {
    //give the button clicked a loading animation while we make fetch requests
    collectionButton.classList.add('loading');

    //Hides the art section if it isn't hidden
    if(!artSection.classList.contains('hidden')) {
        artSection.classList.add("hidden");
    }
    //Shows the collection section if it is hidden
    if(collectionSection.classList.contains('hidden')) {
        collectionSection.classList.remove("hidden");
    }

    //Get the user id that we will use to fetch the collections this user owns
    const userId = collectionButton.getAttribute("data-user");
    
    //Fetch the collections from the user
    const response = await fetch('/api/collections/user/' + userId, {
        method: 'GET',
    }); 

    //Turn response into object we can parse
    const collections = await response.json();

    //clear the inner html of collection section in case this isn't the first time we've hit the button
    collectionSection.innerHTML = "";

    for(let i = 0; i < collections.length; i++) {
        var collectionHeader = document.createElement('h2');
        collectionHeader.textContent = collections[i].title + " Collection:";
        collectionHeader.classList.add("text-3xl", "m-5");
        collectionSection.appendChild(collectionHeader);

        var currCollection = document.createElement('div');
        currCollection.classList.add('w-full', 'flex', 'flex-row', 'flex-wrap', 'justify-around');
        collectionSection.appendChild(currCollection);
        for(let j = 0; j < collections[i].artPieces.length; j++) {
            //create the card which will hold all content
            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'm-3');

            //create the figure that will hold an image
            var artFigure = document.createElement('figure');
            var artImage = document.createElement('img');
            artImage.classList.add('h-48');
            artImage.setAttribute('src', collections[i].artPieces[j].image);
            artImage.setAttribute('alt', 'Art Piece');
            artFigure.appendChild(artImage);

            //create a card body
            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            //create a div that will hold the price and whether if is for sale in the center
            var priceDiv = document.createElement('div');
            priceDiv.classList.add('w-full', 'text-center');
            var priceTextEl = document.createElement('p');
            priceTextEl.classList.add('text-3xl');
            priceTextEl.textContent = "$" + collections[i].artPieces[j].price;
            var forSaleEl = document.createElement('p');
            forSaleEl.classList.add('text-xl');
            //set text depending on whether it is up for sale or not
            if(collections[i].artPieces[j].is_for_sale) {
                forSaleEl.textContent = 'Up for sale';
            }
            else {
                forSaleEl.textContent = 'Not up for sale';
            }
            priceDiv.appendChild(priceTextEl);
            priceDiv.appendChild(forSaleEl);

            //create title and description text elements
            var artTitleEl = document.createElement('h2');
            artTitleEl.classList.add('card-title');
            artTitleEl.textContent = collections[i].artPieces[j].title;
            var artDescrEl = document.createElement('p');
            artDescrEl.textContent = collections[i].artPieces[j].description;

            //create an edit button
            var editButtonDiv = document.createElement('div');
            editButtonDiv.classList.add('card-actions', 'justify-end');
            var editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-secondary');
            editButton.textContent = 'Edit';
            editButtonDiv.appendChild(editButton);

            //append everything together and to page
            cardBody.appendChild(priceDiv);
            cardBody.appendChild(artTitleEl);
            cardBody.appendChild(artDescrEl);
            cardBody.appendChild(editButtonDiv);

            cardDiv.appendChild(artFigure);
            cardDiv.appendChild(cardBody);

            currCollection.appendChild(cardDiv);
        };

        //insert a divider between collections but not after last collection
        if(i != (collections.length - 1)) {
            var dividerEl = document.createElement('div');
            dividerEl.classList.add('divider', 'w-full');
            currCollection.appendChild(dividerEl);
        }
    };

    //remove loading animation from button
    collectionButton.classList.remove('loading');
};

collectionButton.addEventListener('click', showCollections);

//event listener for viewing all owned art pieces, hides the collections list, shows the list
//of art pieces.
artButton.addEventListener('click', () => {
    if(artSection.classList.contains('hidden')) {
        artSection.classList.remove("hidden");
        artSection.classList.add("flex");
    }
    if(!collectionSection.classList.contains('hidden')) {
        collectionSection.classList.add('hidden');
    }
});