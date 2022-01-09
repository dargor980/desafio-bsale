let total = 0;
let totalProducts = 0;
const listCategories = [];
let cart = {}

const containerProducts = document.querySelector("#container-products");
const containerCategorias = document.querySelector("#lista-categorias");
const containerCart = document.querySelector("#container-cart");
const containerTotalCart = document.querySelector("#total-cart");
const containerTotalProducts = document.querySelector("#container-total-products");







document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  getCart();
  drawCart();
  let products = fetchProductsByCategory();
  calculateTotal();
  updateTotal();
  dropProduct(cart);




});


const actualCategory = () => {
  let url = window.location.href;
  let newUrl = new URL(url);
  let paramValue = newUrl.searchParams.get("id");
  let category = listCategories.find(item => item.id == paramValue);

  let tituloCategoria = document.querySelector("#titulo-categoria");
  tituloCategoria.textContent = category.name;


}

const fetchCategories = async () => {
  try {
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
          listCategories.push(i);
        }
        setCategories(listCategories);
      })
      .finally(() => {
        const spinner = document.querySelector("#spinner");
        spinner.classList.add("d-none");
        actualCategory();
      });
  } catch (error) {

    console.log(error);
  }
}

const fetchProductsByCategory = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
}







const setProductsByCategory = (data) => {
  const template = document.querySelector("#template-products").content;
  const fragment = document.createDocumentFragment();
  data.forEach(product => {
    if (product.url_image == "" || product.url_image == null) {
      template.querySelector("img").setAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg");
    } else {
      template.querySelector("img").setAttribute('src', product.url_image);
    }
    template.querySelector("#product-name").textContent = product.name;
    template.querySelector("#product-price").textContent = product.price;
    if (product.discount > 0) {
      template.querySelector("#product-discount").textContent = "-" + product.discount + "%";
    } else {
      template.querySelector("#container-discount").classList.add("d-none");
    }
    template.querySelector('button').dataset.id = product.id;
    const copy = template.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerProducts.appendChild(fragment);
}



const setCategories = (data) => {
  const templateCat = document.querySelector("#template-categories").content;
  const fragment = document.createDocumentFragment();
  data.forEach(category => {
    templateCat.querySelector("a").setAttribute('href', `/src/categorias.html?id=${category.id}`);
    templateCat.querySelector("a").textContent = category.name;
    const copy = templateCat.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerCategorias.appendChild(fragment);

}






const searchProducts = async () => {
  try {

  } catch (error) {
    console.log(error);
  }
}

const buyBtn = (data) => {
  const buttons = document.querySelectorAll('.buy');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const producto = data.find(item => item.id == button.dataset.id)
      producto.cantidad = 1;
      if (cart.hasOwnProperty(producto.id)) {
        producto.cantidad += cart[producto.id].cantidad;
      }
      cart[producto.id] = { ...producto };

      localStorage.setItem('cart', JSON.stringify(cart));

      drawCart();
      updateTotal();

    });
  });
}


const drawCart = () => {
  containerCart.innerHTML = "";
  const template = document.querySelector("#template-cart").content;
  const fragment = document.createDocumentFragment();
  if (Object.keys(cart).length == 0) {
    containerCart.innerHTML = `<h2 class="text-center text-white"> No hay productos en el carrito</h2>`;
  }

  Object.values(cart).forEach(product => {
    template.querySelector("img").setAttribute('src', product.url_image);
    template.querySelector("#product-name").textContent = product.name;
    template.querySelector("#product-price").textContent = "$" + product.price;
    template.querySelector("#product-cantidad").textContent = product.cantidad;
    template.querySelector(".delete").dataset.id = product.id;
    template.querySelector(".addbtn").dataset.id = product.id;
    template.querySelector(".removebtn").dataset.id = product.id;
    const copy = template.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerCart.appendChild(fragment);

  dropProduct(cart);
  buttonsAddRemove(cart);
}

const dropProduct = (data) => {
  const buttons = document.querySelectorAll('.delete');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      delete cart[button.dataset.id];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateTotal();
      drawCart();
    });
  });
}

const getCart = () => {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  drawCart();

}

const calculateTotal = () => {
  total = 0;
  totalProducts = 0;
  Object.values(cart).forEach(product => {
    total += product.price * product.cantidad;
    totalProducts += product.cantidad;
  });
  containerTotalProducts.innerHTML="";
  const badgeCart = document.querySelector('.badge-cart');
  badgeCart.innerHTML = totalProducts;
  const template = document.querySelector("#total-products-template").content;
  const fragment = document.createDocumentFragment();
  template.querySelector("#total-products").textContent = "Carrito | " +totalProducts+ " Productos";
  const copy = template.cloneNode(true);
  fragment.appendChild(copy);
  containerTotalProducts.appendChild(fragment);
}

const buttonsAddRemove = (data) => {
  const buttonsAdd = document.querySelectorAll('.addbtn');
  const buttonsRemove = document.querySelectorAll('.removebtn');
  buttonsAdd.forEach(button => {
    button.addEventListener('click', () => {
      Object.values(data).forEach(product => {
        if(product.id == button.dataset.id){
          product.cantidad++;
        }
      })
      
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateTotal();
      drawCart();
    });
  });

  buttonsRemove.forEach(button => {
    button.addEventListener('click', () => {
      Object.values(data).forEach(product => {
        if(product.id == button.dataset.id){
          product.cantidad--;
          if(product.cantidad == 0){
            delete cart[product.id];
          }
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart));
      updateTotal();
      drawCart();
    });
  });
}

const updateTotal = () => {
  calculateTotal();
  containerTotalCart.innerHTML = "";
  const template = document.querySelector("#template-total").content;
  const fragment = document.createDocumentFragment();

  template.querySelector("#total").textContent = "$" + total;
  const clone = template.cloneNode(true);
  fragment.appendChild(clone);
  containerTotalCart.appendChild(fragment);
}

function openCart() {
  document.getElementById("sidebarCart").style.width = "600px";
  document.getElementById("main").style.marginRight = "250px";
}
function closeCart() {
  document.getElementById("sidebarCart").style.width = "0";
  document.getElementById("main").style.marginRight = "250px";
}
