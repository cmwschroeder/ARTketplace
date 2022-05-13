const logoutModal = document.querySelector("#logoutModal");

const logout = async () => {
    console.log("GO FETCH -----");
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // display logged out modal
      logoutModal.classList.add("modal-open");
    } else {
      alert(response.statusText);
    }
  };

  const okButton = document.querySelector("#okButton");
  if(okButton) {
    okButton.addEventListener("click", function() {
      logoutModal.classList.remove("modal-open");
      document.location.replace('/');
    })
  }
  
  document.querySelectorAll('.logout-button').forEach((button) => {
    button.addEventListener('click', logout);
   });