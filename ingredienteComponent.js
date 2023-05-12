export class IngredienteComponent {
    constructor(frutasContainer, ingrediente, callback, contador) {
        this.ingrediente = ingrediente;
        this.callback = callback;
        this.contador = contador;
        var container = document.createElement("div");
        frutasContainer.appendChild(container);
        container.className = "ingrediente_container";

        var foto = document.createElement("div");
        container.appendChild(foto);
        foto.className = "ingrediente_foto_container";

        var img = document.createElement("img");
        foto.appendChild(img);
        img.src = ingrediente.foto;
        img.className = "fruta_foto";

        var textos = document.createElement("div");
        container.appendChild(textos);
        textos.className = "fruta_textos_container";

        var nombre = document.createElement("p");
        nombre.innerHTML = ingrediente.nombre;
        textos.appendChild(nombre);
        nombre.className = "fruta_name";

        var precio = document.createElement("p");
        precio.innerHTML = "Precio: " + ingrediente.precio;
        textos.appendChild(precio);
        precio.className = "fruta_precio";

        var disponibleP = document.createElement("p");
        disponibleP.className = "fruta_disponible";

        if (ingrediente.disponible) {
            disponibleP.innerHTML = "Disponible: Si";
        } else {
            disponibleP.innerHTML = "Disponible: No";
            disponibleP.classList.add("fruta_disponible_no");
        }

        textos.appendChild(disponibleP);

        this.cantidad = document.createElement('p');
        textos.appendChild(this.cantidad);
        this.cantidad.innerHTML = 'Cantidad: ' + this.contador;
        this.cantidad.className = 'fruta_cantidad';

        var botones = document.createElement("div");
        container.appendChild(botones);
        botones.className = "fruta_button_container";

        var agregarBtn = document.createElement('button');
        agregarBtn.innerHTML = 'Agregar'
        agregarBtn.className = 'frutas_agregarBtn';
        botones.appendChild(agregarBtn);
        agregarBtn.onclick = this.onAgregarBtn.bind(this);
        agregarBtn.disabled = !this.ingrediente.disponible;
        if (!ingrediente.disponible) {
            agregarBtn.classList.add('frutas_agregarBtn_disabled');
        }
    }

    onAgregarBtn() {
        this.callback(this.ingrediente);
        this.contador += 1;
        this.cantidad.innerHTML = 'Cantidad: ' + this.contador;
    }
}