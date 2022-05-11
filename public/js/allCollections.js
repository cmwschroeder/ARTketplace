//Function that displays collections as carousels
var collections;

async function displayCollections() {
  //Grab json data sent out by api request
  const response = await fetch("/api/collections", {
    method: "GET",
  });
  collections = await response.json();
  console.log(collections);

  //initialize empty html string
  var generatedString = "";

  //Nested for loop to make collections and populate artworks that belong to each collection
  for (let i = 0; i < collections.length; i++) {
    if (collections[i].artPieces.length) {
      generatedString += `
    <h1 class="card-title ml-4 text-accent" style="font-size:x-large; text-transform: uppercase">${
      collections[i].title
    }</h1>
    <div class="carousel rounded-box">
    <div  style="margin-bottom: 2vw; background-color: black">
    <div class="card-body">
      
      <div class="owl-carousel owl-theme" id="carousel${i + 1}">`;

      for (let x = 0; x < collections[i].artPieces.length; x++) {
        generatedString += `
        
        
        <div class="item">
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img class="h-auto" src="${collections[i].artPieces[x].image}" alt="Image" /></figure>
        <div class="card-body">
            <h2 class="card-title">${collections[i].artPieces[x].title}</h2>
            <p class="text-accent">${collections[i].artPieces[x].description}</p>
            <h1>$${collections[i].artPieces[x].price}</h1>       
        </div>
        </div>
        </div> 
        `;
      }
      generatedString += `
        </div>
      </div>
        <div>  
            <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg viewCollectionButton" id="${collections[i].id}" style="margin-bottom: 1vw; margin-left:1vw">View Collection</button>
        </div>
      </div>
    </div>
      `;
    }

    //Append generated string to the collections page
    $("#addCarouselHere").append().html(generatedString);

    $(`.owl-carousel`).owlCarousel({
      loop: true,
      margin: 40,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2000,
      stagePadding: 0,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 3,
        },
      },
    });
  }

  //Add event listeners to view collection buttons
  var allButtons = document.querySelectorAll(".viewCollectionButton");

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      location.href = `/collection/:${collections[i].id}`;
    });
  }
}

displayCollections();
