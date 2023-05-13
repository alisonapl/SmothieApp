import { IngredienteComponent } from '/ingredienteComponent.js';

window.addEventListener('load', init);
function init() {

	const FRUTAS = 1;
	const VERDURAS = 2;
	const TOPPINGS = 3;
	var tipoDeListaActual = FRUTAS;

	var mainSubTitle = document.getElementById('mainSubTitle');
	var frutasContainer = document.getElementById('frutas_container');
	var frustasBtn = document.getElementById('frustasBtn');
	var verdurasBtn = document.getElementById('verdurasBtn');
	var toppingsBtn = document.getElementById('toppingsBtn');
	var resetBtn = document.getElementById('resetBtn');

	var ingredientesSeleccionados = [];
	var data = null;

	loadIngredientes();

	frustasBtn.onclick = onFrutasBtn;
	verdurasBtn.onclick = onVerdurasBtn;
	toppingsBtn.onclick = onToppingsBtn;
	resetBtn.onclick = onResetBtn;

	if (window.localStorage.getItem('ingredientes')) {
		ingredientesSeleccionados = JSON.parse(window.localStorage.getItem('ingredientes'));
		updateTotalUI();
	}

	function mostrarIngredientesPorTipo() {

		var ingredientes = [];

		frustasBtn.classList.remove("fruta_menuBtn_seleccionada");
		verdurasBtn.classList.remove("fruta_menuBtn_seleccionada");
		toppingsBtn.classList.remove("fruta_menuBtn_seleccionada");

		switch (tipoDeListaActual) {
			case FRUTAS:
				ingredientes = data.frutas;
				frustasBtn.classList.add("fruta_menuBtn_seleccionada");
				break;
			case VERDURAS:
				ingredientes = data.verduras;
				verdurasBtn.classList.add("fruta_menuBtn_seleccionada");
				break;
			case TOPPINGS:
				ingredientes = data.toppings;
				toppingsBtn.classList.add("fruta_menuBtn_seleccionada");
				break;
			default:
				break;
		}

		frutasContainer.innerHTML = "";

		for (let index = 0; index < ingredientes.length; index++) {
			const ingrediente = ingredientes[index];
			var cantidad = contarIngredientesPorNombre(ingrediente.nombre);
			var ingredienteComponent = new IngredienteComponent(frutasContainer, ingrediente, agregarIngrediente, cantidad);
		}
	}

	function loadIngredientes() {
		var request = new XMLHttpRequest();
		request.open('GET', 'https://smothieapp-default-rtdb.firebaseio.com/data.json');
		request.send();
		request.onload = function (event) {
			var jsonData = request.responseText;
			data = JSON.parse(jsonData);
			mostrarIngredientesPorTipo();
		}
	}

	function agregarIngrediente(ingrediente) {
		ingredientesSeleccionados.push(ingrediente);
		window.localStorage.setItem('ingredientes', JSON.stringify(ingredientesSeleccionados));
		console.log(ingredientesSeleccionados);
		updateTotalUI();
	}

	function updateTotalUI() {
		var total = 0;
		for (let index = 0; index < ingredientesSeleccionados.length; index++) {
			const fruta = ingredientesSeleccionados[index];
			total += fruta.precio;
		}

		mainSubTitle.innerHTML = "Precio: " + total + " colones";
	}

	function onFrutasBtn() {
		tipoDeListaActual = FRUTAS;
		mostrarIngredientesPorTipo();
	}

	function onVerdurasBtn() {
		tipoDeListaActual = VERDURAS;
		mostrarIngredientesPorTipo();
	}

	function onToppingsBtn() {
		tipoDeListaActual = TOPPINGS;
		mostrarIngredientesPorTipo();
	}

	function onResetBtn() {
		ingredientesSeleccionados = [];
		mainSubTitle.innerHTML = "Precio: 0";
		mostrarIngredientesPorTipo();
		window.localStorage.removeItem('ingredientes');
	}

	function contarIngredientesPorNombre(nombre) {
		var total = 0;
		for (let index = 0; index < ingredientesSeleccionados.length; index++) {
			const ingrediente = ingredientesSeleccionados[index];
			if (ingrediente.nombre === nombre) {
				total += 1;
			}
		}
		return total;
	}
}

