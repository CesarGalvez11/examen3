// Generamos un número aleatorio entre 1 y 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Guardamos la referencia a los elementos HTML relevantes
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

// Inicializamos el contador de intentos
let guessCount = 1;
let resetButton;

// Añadimos un escucha de eventos al botón "Enviar respuesta"
guessSubmit.addEventListener("click", checkGuess);

// Función para manejar la lógica del juego al verificar el intento del jugador
function checkGuess() {
  // Obtenemos el valor ingresado por el jugador y lo convertimos a un número
  let userGuess = Number(guessField.value);

  // Mostramos los intentos anteriores
  if (guessCount === 1) {
    guesses.textContent = "Intentos anteriores: ";
  }
  guesses.textContent += userGuess + " ";

  // Comprobamos si el número ingresado es correcto
  if (userGuess === randomNumber) {
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "¡¡¡Fin del juego!!!";
    setGameOver();
  } else {
    lastResult.textContent = "¡Incorrecto!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "¡El número es muy bajo!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "¡El número es muy grande!";
    }
  }

  // Incrementamos el contador de intentos y preparamos el campo de texto para el siguiente intento
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// Función para finalizar el juego y permitir que el jugador reinicie
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Iniciar nuevo juego";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

// Función para restablecer el juego a su estado inicial
function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1;
}