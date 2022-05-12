// listen to filter option and get the route data
const artfilter = document.querySelector(".filter-price")
artfilter.addEventListener('change', (event) => {
    const filtervalue = artfilter.value
    let max 
    let min 
    if (filtervalue === '$50-$200'){
        max = 200
        min = 50
    } else if (filtervalue === '$200-$400'){
        max = 400
        min = 200
    } else if (filtervalue === '$400-$800'){
        max = 800
        min = 400
    } 
    if (max && min) {
        document.location.replace('/filter/'+max +'/' +min)
        
    }
})
            