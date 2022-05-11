const artSection = document.querySelector("#art-section");
const collectionSection = document.querySelector("#collection-section");

//references to buttons
const artButton = document.querySelector("#art-button");
const addButton = document.querySelector("#add-button");
const collectionButton = document.querySelector("#collection-button");

const showCollections = async (event) => {
    if(!artSection.classList.contains('hidden')) {
        artSection.classList.add("hidden");
    }
    if(collectionSection.classList.contains('hidden')) {
        collectionSection.classList.remove("hidden");
    }

    const userId = collectionButton.getAttribute("data-user");
    
    const response = await fetch('/api/collections/user/' + userId, {
        method: 'GET',
    }); 

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

            //create a div that will hold the price in the center
            var priceDiv = document.createElement('div');
            priceDiv.classList.add('w-full', 'text-center');
            var priceTextEl = document.createElement('p');
            priceTextEl.classList.add('text-3xl');
            priceTextEl.textContent = "$" + collections[i].artPieces[j].price;
            priceDiv.appendChild(priceTextEl);

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
    };
};

collectionButton.addEventListener('click', showCollections);

artButton.addEventListener('click', () => {
    if(artSection.classList.contains('hidden')) {
        artSection.classList.remove("hidden");
        artSection.classList.add("flex");
    }
    if(!collectionSection.classList.contains('hidden')) {
        collectionSection.classList.add('hidden');
    }
});