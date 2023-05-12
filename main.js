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

	function mostrarIngredientesPorTipo() {

		var ingredientes = [];

		switch (tipoDeListaActual) {
			case FRUTAS:
				ingredientes = data.frutas;
				break;
			case VERDURAS:
				ingredientes = data.verduras;
				break;
			case TOPPINGS:
				ingredientes = data.toppings;
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
		console.log(ingredientesSeleccionados);
		var total = 0;
		for (let index = 0; index < ingredientesSeleccionados.length; index++) {
			const fruta = ingredientesSeleccionados[index];
			total += fruta.precio;
		}

		mainSubTitle.innerHTML = "Smoothie Price: " + total;
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
		mainSubTitle.innerHTML = "Smoothie Price: 0";
		mostrarIngredientesPorTipo();
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

