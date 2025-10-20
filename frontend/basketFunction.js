function addToCart(id) {
    const song = songs.find(s => s.id === id);
    if (song){
      cart.push(song);
      updateCart();
    }
}

function updateCart() {
    
}