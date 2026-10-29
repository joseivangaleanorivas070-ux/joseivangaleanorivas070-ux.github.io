// kroMan — web pública. Dos detalles con personalidad:
//  1) el globo de la portada cambia entre el original y la traducción;
//  2) el camaleón cambia el color de la web al tocarlo (y se recuerda).

// Colores del camaleón: tinte, tinte claro y cuánto girar el verde del logo.
const COLORES = [
  { nombre: "verde", tinte: "#2db86b", claro: "#c7efd6", giro: "0deg" },
  { nombre: "ámbar", tinte: "#f2b632", claro: "#fbe8b7", giro: "-103deg" },
  { nombre: "coral", tinte: "#ff6b5a", claro: "#ffd6cf", giro: "-139deg" },
  { nombre: "cielo", tinte: "#3aa0ff", claro: "#cfe6ff", giro: "65deg" },
];

function aplicarColor(i) {
  const c = COLORES[i % COLORES.length];
  const root = document.documentElement.style;
  root.setProperty("--tinte", c.tinte);
  root.setProperty("--tinte-claro", c.claro);
  root.setProperty("--giro", c.giro);
  return c;
}

// El color elegido se recuerda en este navegador (si se puede).
let actual = 0;
try {
  actual = Number(localStorage.getItem("kroman-color")) || 0;
} catch {}
aplicarColor(actual);

document.querySelectorAll(".chameleon").forEach((boton) => {
  boton.addEventListener("click", () => {
    actual = (actual + 1) % COLORES.length;
    const c = aplicarColor(actual);
    boton.setAttribute("aria-label", `Cambiar el color de la web (ahora: ${c.nombre})`);
    const dice = document.querySelector("[data-camaleon-dice]");
    if (dice) dice.textContent = actual === 0 ? "¡Tócame otra vez!" : `¡Ahora soy ${c.nombre}!`;
    try {
      localStorage.setItem("kroman-color", String(actual));
    } catch {}
  });
});

// Globo de la demostración: original ↔ traducción.
document.querySelectorAll(".demo-bubble").forEach((globo) => {
  globo.addEventListener("click", () => {
    const on = globo.getAttribute("aria-pressed") !== "true";
    globo.setAttribute("aria-pressed", String(on));
    globo.querySelector(".en").setAttribute("aria-hidden", String(on));
    globo.querySelector(".es").setAttribute("aria-hidden", String(!on));
  });
});
