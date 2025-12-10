// CON LA DOM TRAVERSING & MANIPULATION potremo prendere degli elementi dalla pagina per poi decidere di ALTERARLI per:
// - contenuto
// - stile
// - posizione nel documento

// ⚠️IMPORTANTE - Lavorare con il DOM è un processo che si compone di DUE FASI

// 1) SELEZIONE DELL'ELEMENTO INTERESSATO (DOM Traversing) - prima raggiungo e ottengo l'elemento che mi interessa
// 2) MANIPOLAZIONE DELL'ELEMENTO (DOM Manipulation) - lo modifico nelle sue caratteristiche: contenuto, stile, ecc...

// 1. METODI DI SELEZIONE
console.dir(document);

// questo è un modo molto poco pratico di raggiungere gli elementi seguendo la catena dei cosiddetti Nodi (DOM Nodes)
console.dir(document.body.children[0].children[1].children[1]);

// Ci sono metodi migliori:
// partendo da document che è un oggetto disponibile sempre globalmente, uso dei metodi suoi per ricavare determinati elementi o collezioni di elementi

// 1) SELEZIONE PER ID
const firstSection = document.getElementById("first-section"); // mi torna la <section id="first-section"> con questo id,
//  oppure se non la trova mi torna null
console.log(firstSection);

const menu = document.getElementById("menu"); // mi torna l'elemento <ul id="menu">
console.log(menu);

// 2) SELEZIONE PER CLASSE
// ritorna SEMPRE una HTMLCollection con i DOM Nodes all'interno.
// se trovo un solo elemento con quella classe, sarà una collection di 1 elemento.
// ⚠️ NON tornerà l'elemento SINGOLO!

const descriptions = document.getElementsByClassName("section-description"); // HTMLCollection(3) [p.section-description, p.section-description, p.section-description]
console.log(descriptions);

for (let i = 0; i < descriptions.length; i++) {
  console.log(descriptions[i]);
}

// 3) SELEZIONE PER TAG (ELEMENTNAME)
// si comporta come la selezione per classe, tornando SEMPRE una Collection, anche eventualmente vuota
// N.B. se stai cercando un elemento singolo per tag, dovrai selezionarlo dalla sua collection con un [0]
const header = document.getElementsByTagName("header")[0];
console.log(header);

const h1 = document.getElementsByTagName("h1")[0];
console.log(h1);

// SELEZIONE TRAMITE SELETTORI CSS

// 4) querySelector - 1 elemento ritornato oppure null se non trovato
const thirdSection = document.querySelector("#third-section"); // torna il nodo corrispondente o null
// se stai cercando un elemento singolo tramite id, conviene usare il getElementById!
console.log(thirdSection);

const thirdSectionH4 = document.querySelector("#third-section h4");
console.log(thirdSectionH4);

const sectionQS = document.querySelector("section"); // ottengo la PRIMA section (anche se ce ne sono più di una)
console.log(sectionQS);
// se ne volevi più di una usa querySelectorAll (vedi sotto)

// quindi è conveniente da usare quando abbiamo un unico elemento con quel tag nella pagina
const h1QS = document.querySelector("h1"); // ottengo già il primo h1 (e anche l'unico della pagina) NON LA COLLEZIONE
console.log(h1QS);

// 5) querySelectorAll - più elementi ritornati in una NodeList oppure NodeList vuota se non trovati elementi corrispondenti alla selezione
const allSectionsButLast = document.querySelectorAll("section:not(#second-section)");
console.log(allSectionsButLast);

const allLisOfSecondSection = document.querySelectorAll("#second-section ul li");
console.log(allLisOfSecondSection);

const footerLinks = document.querySelectorAll(".footer-link");
console.log(footerLinks);

// con il querySelectorAll otteniamo una NodeList che è una collezione più recente rispetto alla HTMLCollection e
// quindi possiamo usare il forEach per ciclarla (ma anche il for funzionerebbe)
footerLinks.forEach((link) => console.log(link));

// esempio su come convertire una lista più semplice in un vero e proprio array con tutti i metodi che conosciamo
const footerLinksMap = Array.from(footerLinks).map((link) => `<span>${link.innerText}</span>`);
console.log(footerLinksMap);

// 2. MANIPOLARE GLI ELEMENTI DEL DOM

// manipolare il testo (modifichiamo il contenuto degli elementi)
console.log(h1.innerText); // leggo il testo prima della modifica

h1.innerText = "Ti ho modificato aAHAHhahaAHa";

const subtitle = document.querySelector(".subtitle");
console.dir(subtitle);
subtitle.innerHTML =
  "<span class='inner-content'> Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. In atque sequi repellendus iure ipsa sint nostrum nemo ratione harum fuga.</span>";

// cambiamo lo stile tramite inline-style

// cambiando più proprietà in un colpo solo
// header.style = "background-color: red; color: white;";

// o cambiando una alla volta
header.style.backgroundColor = "blue";
header.style.color = "white";

// applicare / rimuovere una classe
// firstSection.classList.add("bigAndBold");

const main = document.querySelector("main");
main.classList.remove("toBeRemoved");

console.log(main.classList.contains("main-element"));

const divToDestroy = document.getElementById("toDestroy");

// metodo per rimuovere l'elemento e non venire renderizzato, ma rimane presente nel DOM (per future modifiche)
// divToDestroy.style.display = "none";

// per distruggerlo veramente userò il metodo .remove() che ogni DOM Node possiede

divToDestroy.remove(); // l'elemento viene completamente rimosso dal DOM

// CREARE NUOVI ELEMENTI

const newDiv = document.createElement("div");
newDiv.className = "my-new-div";
newDiv.id = "my-last-div";
newDiv.style.backgroundColor = "aqua";

const newP = document.createElement("p");
newP.innerText = "sono un p dentro al div";

console.log(newDiv); // qui lo vediamo plasmarsi IN MEMORIA (ma non sarà ancora nella pagina)

// ora dobbiamo scegliere dove inserirlo
// tramite appendChild sul genitore, specifico quale figlio voglio inserirgli all'interno (in fondo)
// document.body.appendChild(newDiv);

newDiv.appendChild(newP);
main.appendChild(newDiv);
