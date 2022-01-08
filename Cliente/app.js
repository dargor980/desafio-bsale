
document.addEventListener("DOMContentLoaded", () => {
  let categories = fetchCategories();
  getCart();
  drawCart();
  console.log(cart);
  let products = fetchProductsByCategory();
  

  


});




const fetchCategories = async () => {
  try{
    let dato = [];
    let response = await fetch("http://127.0.0.1:3000/categorias", {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    
    })
        .then(response => response.json())
        .then(data => {
            for (let i of data["data"]) {
                dato.push(i);
            }
            setCategories(dato);
        })
        .finally(() => {
          const spinner = document.querySelector("#spinner");
          spinner.classList.add("d-none");
        });
  } catch (error){

    console.log(error);
  }
}

const fetchProductsByCategory = async () => {
  try{
    let url = window.location.search;
    let id = url.split("=")[1];
    let dato = [];
    let response = await fetch(`http://127.0.0.1:3000/categoria/${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        for (let i of data["data"]) {
          dato.push(i);
        }
        setProductsByCategory(dato);
        buyBtn(dato);
    })
  } catch(error){
    console.log(error);
  }
}







const containerProducts = document.querySelector("#container-products");

const setProductsByCategory = (data) => {
  const template = document.querySelector("#template-products").content;
  const fragment = document.createDocumentFragment();
  data.forEach(product => {
    if(product.url_image == "" || product.url_image == null){
      template.querySelector("img").setAttribute('src',"https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg");
    } else{
      template.querySelector("img").setAttribute('src', product.url_image);
    }
    template.querySelector("#product-name").textContent = product.name;
    template.querySelector("#product-price").textContent = product.price;
    if(product.discount > 0){
      template.querySelector("#product-discount").textContent = "-"+product.discount + "%";	
    } else {
      template.querySelector("#container-discount").classList.add("d-none");
    }
    template.querySelector('button').dataset.id = product.id;
    const copy = template.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerProducts.appendChild(fragment);
}


const containerCategorias = document.querySelector("#lista-categorias");

const setCategories = (data) => {
  const templateCat = document.querySelector("#template-categories").content;
  const fragment = document.createDocumentFragment();
  data.forEach(category => {
    templateCat.querySelector("a").setAttribute('href', `categorias.html?id=${category.id}`);
    templateCat.querySelector("a").textContent = category.name;
    const copy = templateCat.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerCategorias.appendChild(fragment);

}


let cart ={}


const containerCart = document.querySelector("#container-cart");

const buyBtn = (data) => { 
  const buttons = document.querySelectorAll('.card button');
  buttons.forEach(button => {
    button.addEventListener('click', () =>{
      console.log(button.dataset.id);
      const producto = data.find(item => item.id == button.dataset.id)
      producto.cantidad = 1;
      if(cart.hasOwnProperty(producto.id)){
        producto.cantidad += cart[producto.id].cantidad;
      } 
      cart[producto.id] = { ...producto};
      
      console.log(cart)
      localStorage.setItem('cart', JSON.stringify(cart));
      
      drawCart();
      
    });
  });
}


const drawCart = () =>{
  containerCart.innerHTML = "";
  const template = document.querySelector("#template-cart").content;
  const fragment = document.createDocumentFragment();
    Object.values(cart).forEach(product => {
      console.log(product);
      template.querySelector("img").setAttribute('src', product.url_image);
      template.querySelector("#product-name").textContent = product.name;
      template.querySelector("#product-price").textContent = "$"+product.price;
      template.querySelector("#product-cantidad").textContent = product.cantidad;
      const copy = template.cloneNode(true);
      fragment.appendChild(copy);
    });
    containerCart.appendChild(fragment);
}

const dropProduct = (data) => {
  const buttons = document.querySelectorAll('.card .delete');
  buttons.forEach(button => {
    button.addEventListener('click', () =>{
      console.log(button.dataset.id);
      const producto = data.find(item => item.id == button.dataset.id)
      delete cart[producto.id];
      cart.splice(producto.id, 1);
      drawCart();
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });
} 

const getCart = () => {
  if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
  }

}

const calculateTotal = () => {
  
}

const searchProducts = async () =>{
  try{

  } catch(error){
    console.log(error);
  }
}




function openCart() {
  document.getElementById("sidebarCart").style.width = "600px";
  document.getElementById("main").style.marginRight = "250px";
}
function closeCart() {
  document.getElementById("sidebarCart").style.width = "0";
  document.getElementById("main").style.marginRight= "250px";
}
