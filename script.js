const productos = [
  {
    id: 1,
    nombre: "Cheesecake de Maracuyá",
    categoria: "postres",
    precio: 3500,
    imagen: "maracuya.jpeg"
  },
  {
    id: 2,
    nombre: "Galletas Doble Chocolate",
    categoria: "galletas",
    precio: 1500,
    imagen: "galletas-chispas.jpeg"
  },
  {
    id: 3,
    nombre: "Galletas Red Velvet",
    categoria: "galletas",
    precio: 1500,
    imagen: "galletas-redvelvet.jpeg"
  },
  {
    id: 4,
    nombre: "Tronco Navideño de Chocolate",
    categoria: "especiales",
    precio: 10000,
    imagen: "tronco.jpeg"
  },
  {
    id: 5,
    nombre: "Mantequilla de Ajo y Perejil (5.5 oz)",
    categoria: "salados",
    precio: 2500,
    imagen: "mantequilla-ajo.jpeg"
  },
  {
    id: 6,
    nombre: "Patacones Artesanales (700 g)",
    categoria: "salados",
    precio: 2700,
    imagen: "patacones.jpeg"
  },
  {
    id: 7,
    nombre: "Chocolates Artesanales (Cajita)",
    categoria: "chocolates",
    precio: 1500,
    imagen: "chocolates.jpeg"
  },
  {
    id: 8,
    nombre: "Pupusas de Mi Tierra",
    categoria: "salados",
    precio: 1500,
    imagen: "pupusas.jpeg"
  },
  {
    id: 9,
    nombre: "Arroz con Leche",
    categoria: "especiales",
    precio: 1000,
    imagen: "arroz-leche.jpg"
  },
  {
    id: 10,
    nombre: "Carlota Oreo",
    categoria: "especiales",
    precio: 2000,
    imagen: "calota-oreo.jpeg"
  },
  {
    id: 11,
    nombre: "Carlota de Fresa",
    categoria: "especiales",
    precio: 1000,
    imagen: "carlota-fresa.jpg"
  },
  {
    id: 12,
    nombre: "Carlota de Mango",
    categoria: "especiales",
    precio: 1000,
    imagen: "carlota-mango.jpg"
  }
];

let carrito = [];

// MOSTRAR PRODUCTOS
function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) {
    console.error("No se encontró el contenedor de productos.");
    return;
  }

  contenedor.innerHTML = "";

  lista.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    const foto = document.createElement("img");
    foto.src = producto.imagen;
    foto.alt = producto.nombre;

    foto.onerror = function() {
      this.alt = "Imagen no encontrada: " + producto.imagen;
      this.style.backgroundColor = "#f3e1d3";
      this.style.padding = "10px";
      this.style.boxSizing = "border-box";
    };

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = "₡" + producto.precio.toLocaleString("es-CR");

    const boton = document.createElement("button");
    boton.textContent = "Agregar al Carrito 🛒";
    boton.onclick = function() {
      agregarAlCarrito(producto.id);
    };

    tarjeta.appendChild(foto);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(boton);

    contenedor.appendChild(tarjeta);
  });
}

// FILTRAR CATEGORÍAS
function filtrarCategoria(categoria) {
  if (categoria === "todos") {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(
      producto => producto.categoria === categoria
    );

    mostrarProductos(filtrados);
  }
}

// AGREGAR AL CARRITO
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if (producto) {
    carrito.push(producto);
    actualizarCarrito();
  }
}

// ACTUALIZAR CARRITO
function actualizarCarrito() {
  const listaHtml = document.getElementById("lista-carrito");
  const totalHtml = document.getElementById("total-precio");

  listaHtml.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    total += item.precio;

    const li = document.createElement("li");

    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.gap = "10px";
    li.style.marginBottom = "8px";

    li.textContent =
      item.nombre + " - ₡" +
      item.precio.toLocaleString("es-CR");

    listaHtml.appendChild(li);
  });

  totalHtml.textContent = total.toLocaleString("es-CR");
}

// ENVIAR PEDIDO POR WHATSAPP
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("¡Tu carrito está vacío! Agrega algunos productos.");
    return;
  }

  const telefono = "50660229035";

  let mensaje =
    "¡Hola Dulces y Postres M! Me gustaría hacer el siguiente pedido:\n\n";

  carrito.forEach(producto => {
    mensaje +=
      "* 1x " + producto.nombre +
      " (₡" + producto.precio.toLocaleString("es-CR") + ")\n";
  });

  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio,
    0
  );

  mensaje +=
    "\n*Total estimado:* ₡" +
    total.toLocaleString("es-CR");

  mensaje +=
    "\n\n¿Me confirman si tienen disponibilidad para encargo? ¡Gracias!";

  const url =
    "https://wa.me/" + telefono +
    "?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
}

// INICIAR LA TIENDA
document.addEventListener("DOMContentLoaded", function() {
  mostrarProductos(productos);
  actualizarCarrito();
});
