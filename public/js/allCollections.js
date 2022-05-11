async function displayCollections() {
  //Grab json data sent out by api request
  const response = await fetch("/api/collections", {
    method: "GET",
  });
  const collections = await response.json();
  console.log(collections);

  var outputString = `<div class="carousel rounded-box">`
  var generatedString = ""
  
  for(let i=0; i<collections.length; i++) {
    generatedString += `
    <div  style="margin-bottom: 2vw; background-color: black">
    <div class="card-body">
      <h2 class="card-title">${collections[i].title}</h2>
      <div class="owl-carousel owl-theme">`

      for(let x=0; x<collections[i].artPieces.length; x++) {
        generatedString += `
        <div class="item">
            <img src="${collections[i].artPieces[x].image}" alt="Image" />
        </div> 
        `
      }

      generatedString += `
        </div>
      </div>
    </div>
    </div>
      `
  }

  outputString += generatedString;

  $("#addCarouselHere").append().html(outputString);
  
  
  
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
   
}

displayCollections();
