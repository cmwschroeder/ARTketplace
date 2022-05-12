const buyNow = document.querySelector('#buy-btn');

const buyArt = async (event) => {
    console.log('Button was clicked!-----------------------------------------------------');
    const response = await fetch(window.location.pathname, {
        method: 'PUT'
    })
    if(response.ok){
        alert("Congratualations! It's yours!")
    }else{
        alert("Sorry, Failed to Purchase.")
    }
}

buyNow.addEventListener('click', buyArt);