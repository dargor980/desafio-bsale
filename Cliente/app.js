let total = 0;
let totalProducts = 0;
const listCategories = [];
let cart = {}

const containerProducts = document.querySelector("#container-products");
const containerCategorias = document.querySelector("#lista-categorias");
const containerCart = document.querySelector("#container-cart");
const containerTotalCart = document.querySelector("#total-cart");
const containerTotalProducts = document.querySelector("#container-total-products");
const containerCategoriasIndex = document.querySelector("#container-categorias");
let category = "";

/**
 * Inicialización.
 */
document.addEventListener("DOMContentLoaded", () => {

  fetchCategories().then(() => {
    getCart();
    drawCart();
    calculateTotal();
    updateTotal();
    dropProduct(cart);
    if(getPathName() == "/" || getPathName() == "/index.html"){
        drawCategories();
        const spinner = document.querySelector("#spinner");
        spinner.classList.add("d-none");
    }
    if(getPathName() == "/src/categorias.html" ){ 
      let nameCategory = listCategories.find(category => category.id == getParam("id"));
      const tituloCategoria = document.querySelector("#titulo-categoria");
      tituloCategoria.textContent = nameCategory.name;
      if(getParam("filter")){
        getFilterProducts()
      }else{
  
        fetchProductsByCategory();
      }
    }
    if(getPathName() == "/src/search.html"){
      if(getParam("filter")){
        filterSearch();
      }else{
        searchProductsByName();
      }
      
    }
  });
});

/**
 * Obtener valor del parametro de la url
 * @param {*} param 
 * @returns  string
 */
const getParam = (param) => {
  let url = new URL(window.location.href);
  let paramValue = url.searchParams.get(param);
  return paramValue;
}


/**
 * Obtiene path de la url en el que se encuentra.
 * @returns path de la url 
 * 
 */
const getPathName = () => {

  return window.location.pathname;
}



/**
 * 
 * Obtiene las categorias de los productos
 * @returns void
 */
const fetchCategories = async () => {
  try {
    let response = await fetch("http://127.0.0.1:3000/api/categorias", {
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
    
  } catch (error) {
    
    console.log(error);
  }
}


/**
 * 
 * Obtiene los productos por categoria
 * @returns void
 */
const fetchProductsByCategory = async () => {
  try {
    let categoryId = getParam("id");
    const idForm = document.querySelector("#id-cat");
    idForm.value = categoryId;
    let dato = [];
    let response = await fetch(`http://127.0.0.1:3000/api/categoria/${categoryId}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
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
    .finally(() => {
      const spinner = document.querySelector("#spinner");
      spinner.classList.add("d-none");
      
    });
  } catch (error) {
    console.log(error);
  }
}



/**
 * 
 * Obtiene los productos por nombre
 * @returns void
 */
const searchProductsByName = async () => {
  try {
    let search = getParam("search"); 
    let dato = [];
    let response = await fetch(`http://127.0.0.1:3000/api/search/${search}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }

    })
    .then(response => response.json())
    .then(data =>{
      for(let i of data["data"]){
        dato.push(i);
      }
    })
    .finally(() => {
      const spinner = document.querySelector("#spinner");
      const title = document.querySelector("#titulo-search");
      const searchFilter = document.querySelector("#search-filter");
      searchFilter.value = search;
      title.textContent = `Resultados de la búsqueda para: "${search}"`;
      spinner.classList.add("d-none");
      setProductsByCategory(dato);
      buyBtn(dato);
    });
  } catch (error) {
    console.log(error);
  }
}


/**
 * Renderiza los productos en la página 
 * @param {*} data productos
 * @returns void 
 */
const setProductsByCategory = (data) => {
  const template = document.querySelector("#template-products").content;
  const fragment = document.createDocumentFragment();
  
  data.forEach(product => {
    if (product.url_image == "" || product.url_image == null) {
      template.querySelector("img").setAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg");
    } else {
      template.querySelector("img").setAttribute('src', product.url_image);
      template.querySelector("img").setAttribute('alt', product.name);
    }
    template.querySelector("#product-name").textContent = product.name;
    template.querySelector("#product-price").textContent = product.price;
    if (product.discount != '0') {
      template.querySelector("#product-discount").textContent = "-" + product.discount + "%";
      template.querySelector("#container-discount").classList.remove("d-none");
    } else {
      template.querySelector("#container-discount").classList.add("d-none");
    }
    template.querySelector('button').dataset.id = product.id;
    const copy = template.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerProducts.appendChild(fragment);
}


/**
 * Renderiza las categorias en el navbar
 * @param {array} data 
 * @returns void
 */
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

/**
 * Renderiza las categorias en la página principal.
 * @returns void
 */
const drawCategories = () => {
  const template = document.querySelector("#template-categorias").content;
  const fragment = document.createDocumentFragment();
  listCategories.forEach(category => {
    template.querySelector("a").setAttribute('href', `src/categorias.html?id=${category.id}`);
    template.querySelector("h3").textContent = category.name;
    const copy = template.cloneNode(true);
    fragment.appendChild(copy);
  });
  containerCategoriasIndex.appendChild(fragment);
}

/**
 * Obtiene y renderiza los productos de la categoria filtrados
 * @returns void
 */
const getFilterProducts =  async () =>{
  try{
    let dato = [];
    let categoria = getParam("id");
    let filter = getParam("filter");
    let response = await fetch(`http://127.0.0.1:3000/api/categoria/${categoria}/filter/${filter}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      for(let i of data["data"]){
        dato.push(i);
      }
    })
    .finally(() => {
      setProductsByCategory(dato);
      buyBtn(dato);
      const idCat = document.querySelector("#id-cat");
      idCat.value = getParam("id");
      const spinner = document.querySelector("#spinner");
      spinner.classList.add("d-none");
    });

  } catch(error){
    console.log(error);
  }

}


/**
 * 
 * Obtiene los productos de la busqueda filtrados
 * @returns void
 */
const filterSearch = async () => {
  try{
    let dato = [];
    let search = getParam("search");
    let filter = getParam("filter");
    let response = await fetch(`http://127.0.0.1:3000/api/search/${search}/filter/${filter}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }

    })
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      for (let i of data["data"]){
        dato.push(i);
      }
    })
    .finally(() => {
      setProductsByCategory(dato);
      buyBtn(dato);
      const searchFilter = document.querySelector("#search-filter");
      searchFilter.value = search;
      const title = document.querySelector("#titulo-search");
      title.textContent= `Resultados de la búsqueda para: "${search}"`;
      const spinner = document.querySelector("#spinner");
      spinner.classList.add("d-none");
    })
  } catch(error){
    console.log(error);

  }
}





/**
 * Evento que añade producto al carrito
 * @param {array} data 
 * @returns void
 */
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

/**
 * Renderiza el carrito de compras
 *
 * @returns void
 */
const drawCart = () => {
  containerCart.innerHTML = "";
  const template = document.querySelector("#template-cart").content;
  const fragment = document.createDocumentFragment();
  if (Object.keys(cart).length == 0) {
    containerCart.innerHTML = `<h2 class="text-center text-white"> No hay productos en el carrito</h2>`;
  }

  Object.values(cart).forEach(product => {
    if(product.url_image == "" || product.url_image == null || product.url_image == "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg" ){
      template.querySelector("img").setAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/d/da/Imagen_no_disponible.svg");
    }else{
      template.querySelector("img").setAttribute('src', product.url_image);
    }
    template.querySelector("img").setAttribute('alt', product.name);
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

/**
 * 
 * Agrega el evento de eliminar todos los productos de un tipo del carrito.
 * @param {array} data 
 * @returns void
 */
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

/**
 * Obtiene los productos del carrito
 * @returns void
 */
const getCart = () => {
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  drawCart();
}

/**
 * 
 * Calcula el total del carrito
 * @returns void
 */
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

/**
 * Agrega el evento de aumentar y disminuir la cantidad de productos en los botones
 * @param {array} data 
 * @returns void
 */
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



/**
 * Actualiza el total del carrito
 * @returns void
 */
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

/**
 * Abre el carrito de compras
 * @returns void
 */
function openCart() {
  document.getElementById("sidebarCart").style.width = "600px";
  document.getElementById("main").style.marginRight = "250px";
}

/**
 * Cierra el carrito de compras
 * @returns void
 */
function closeCart() {
  document.getElementById("sidebarCart").style.width = "0";
  document.getElementById("main").style.marginRight = "250px";
}
