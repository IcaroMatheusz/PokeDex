console.log("JAVASCRIPT TÁ FUNCIONANDO COMEMORE POR FAVOR")

const pokemonName = document.querySelector("#pokemon-name") //pegando o elemento pelo ID
const pokemonCode = document.querySelector("#pokemon-code")
const pokemonImage = document.querySelector("#pokemon-img")
const nameInput = document.querySelector("#name")
const buttonSubmit = document.querySelector("#btn-submit")

buttonSubmit.addEventListener('click', async function (event) {

    event.preventDefault();

    let nameValue = nameInput.value

    try {

        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameValue}`)

        if (!resp.ok) {
            throw new Error("Esse pokemon nao existe vc ta louco")
        } 

        console.log(resp)

        const poke = await resp.json()

        pokemonName.textContent = `${poke.name}`
        pokemonCode.textContent = `${poke.order}`
        pokemonImage.src = `${poke.sprites.front_default}`

        console.log(poke)

    } catch (error) {
        pokemonName.textContent = error.message
    }

})