console.log("JAVASCRIPT TÁ FUNCIONANDO COMEMORE POR FAVOR");

const pokemonName = document.querySelector("#pokemon-name"); //pegando o elemento pelo ID
const pokemonCode = document.querySelector("#pokemon-code");
const pokemonImage = document.querySelector("#pokemon-img");
const nameInput = document.querySelector("#name");
const buttonSubmit = document.querySelector("#btn-submit");
const errorMessage = document.querySelector("#error-message");
const cardPokemon = document.querySelector("#card-pokemon");
const loading = document.querySelector("#loading");

function getBestSprite(data) {
  return (
    data.sprites.versions?.["generation-v"]?.["black-white"]?.animated
      ?.front_default ||
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.front_default
  );
}

buttonSubmit.addEventListener("click", async function (event) {
  event.preventDefault();

  let nameValue = nameInput.value
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "-");

  if (nameValue === "") {
    errorMessage.textContent = "You must type a Pokemon name";

    setTimeout(() => {
      errorMessage.textContent = "";
    }, 5000);

    return;
  }

  try {
    loading.classList.remove("hidden");
    cardPokemon.style.display = "none";

    const speciesResp = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${nameValue}`,
    );

    if (!speciesResp.ok) {
      throw new Error("That pokemon doesnt exist and you're getting crazy");
      cardPokemon.style.display = "none";
    }

    loading.classList.add("hidden");
    cardPokemon.style.display = "flex";

    const speciesData = await speciesResp.json(); //pegando os dados da requisicao da api

    console.log(speciesData);

    //capturando o link URL que está dentro do JSON do dado, para buscarmos ele pelo outro endpoint e conseguir o sprite
    const pokemonUrl = speciesData.varieties[0].pokemon.url;

    const pokemonResp = await fetch(pokemonUrl); //como foi pego outro endpoint da api, tambem e preciso colocar o fetch novamente

    if (!pokemonResp.ok) {
      throw new Error("That pokemon doesnt exist and you're getting crazy");
      cardPokemon.style.display = "none";
    }

    const pokemonData = await pokemonResp.json();

    console.log(pokemonData);

    pokemonName.textContent = `${speciesData.name}`;
    pokemonCode.textContent = `${speciesData.id}`;
    pokemonImage.src = getBestSprite(pokemonData);
  } catch (error) {
    errorMessage.textContent = error.message;
    cardPokemon.style.display = "none";

    loading.classList.add("hidden");

    setTimeout(() => {
      errorMessage.textContent = "";
    }, 5000);
  }
});
