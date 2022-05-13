// listen to filter option and get the route data
const artfilter = document.querySelector(".filter-price");
const artSort = document.querySelector('.sort-price');
const artSearch = document.querySelector('#search-button');

// event listen for filter option to be click
artfilter.addEventListener('change', (event) => {
    const filtervalue = artfilter.value;
    let max;
    let min;
    // if the user click onto one of these options it will show them with the price range they selected
    if (filtervalue === '$50-$200'){
        max = 200;
        min = 50;
    } else if (filtervalue === '$200-$400'){
        max = 400;
        min = 200;
    } else if (filtervalue === '$400-$800'){
        max = 800;
        min = 400;
    };
    // redirecting to a different route
    if (max && min) {
        document.location.replace('/filter/'+max +'/' +min);
        
    };
});
// event listen for sort option
artSort.addEventListener('change', (event) => {
    const sortValue = artSort.value;
    // redirect to a sort route from low to high
    if (sortValue === 'Lower to Higher') {
        document.location.replace('/sort/low');
         // redirect to a sort route from high to low
    } else if (sortValue === 'Higher to Lower') {
        document.location.replace('/sort/high');
    };
});

document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener('click', (event) => {
        artId = event.target.getAttribute("data-number");
        document.location.replace('/art/' + artId);
    });
});

artSearch.addEventListener('click', (event) => {
    const searchValue = document.querySelector('#search-text').value;

    if(searchValue) {
        document.location.replace('/search/' + searchValue);
    }
});

document.querySelector("#reset-search").addEventListener('click', (event) => {
    document.location.replace('/');
});