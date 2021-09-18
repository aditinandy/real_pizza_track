// alert('hello from app.js');
import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll('.add-to-cart');
let cardCounter = document.querySelector('#cardCounter');

function updateCart(pizza) {
    // send req to server
    // we use axios
    axios.post('/update-cart', pizza).then(res => {
        // console.log(res);
        cardCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            // layout: 'top-right'
            progressBar: false
        }).show();
     }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 3000,
            text: 'Something went wrong..',
            layout: 'top-left'
            // progressBar: false
        }).show();
     })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // console.log(e);
        // let pizza = btn.dataset.pizza;
        let pizza = JSON.parse(btn.dataset.pizza); // convert in object
        updateCart(pizza);
        // console.log(pizza);
    })

})