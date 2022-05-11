async function displayCollections() {
  //Grab json data sent out by api request
  const response = await fetch("/api/collections", {
    method: "GET",
  });
  const collections = await response.json();
  console.log(collections);

  var outputString = ``;
  var generatedString = "";

  for (let i = 0; i < collections.length; i++) {
    generatedString += `
    <h1 class="card-title ml-4 text-accent" style="font-size:x-large; text-transform: uppercase">${collections[i].title}</h1>
    <div class="carousel rounded-box">
    <div  style="margin-bottom: 2vw; background-color: black">
    <div class="card-body">
      
      <div class="owl-carousel owl-theme" id="carousel${i+1}">`;

    for (let x = 0; x < collections[i].artPieces.length; x++) {
      generatedString += `
        
        
        <div class="item">
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img class="h-64" src="${collections[i].artPieces[x].image}" alt="Image" /></figure>
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
            <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" id="${collections[i].id}" style="margin-bottom: 1vw; margin-left:1vw">View Collection</button>
        </div>
      </div>
    </div>
      `;
  }

  outputString += generatedString;

  $("#addCarouselHere").append().html(outputString);

for(let q=0; q<collections.length; q++) {
    $(`#carousel${q+1}`).owlCarousel({
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

  
}

displayCollections();
