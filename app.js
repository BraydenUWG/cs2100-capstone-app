const pokemonSlots = document.querySelectorAll(".pokemon-slot");

pokemonSlots.forEach(slot => {

    const input = slot.querySelector("input");
    const sprite = slot.querySelector(".pokemonSprite");
    const types = slot.querySelector(".pokemonTypes");

    input.addEventListener("change", async () => {

        const pokemonName = input.value.toLowerCase();

        if (!pokemonName) {
            sprite.hidden = true;
            types.textContent = "";
            calcTypes();
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            sprite.hidden = true;
            types.textContent = "Pokemon not found.";
            return;
        }

        const data = await response.json();
        console.log(data);
        
        //shiny chance for fun points
        if (Math.floor(Math.random() * 8192) + 1 == 1) {
            sprite.src = data.sprites.front_shiny;
            sprite.hidden = !sprite.src;
        }

        else {
            sprite.src = data.sprites.front_default;
            sprite.hidden = !sprite.src;
        }

        types.textContent = data.types
            .map(type => type.type.name)
            .join("/");


    calcTypes();
    });
});

function calcTypes() {

    //no fairy bcs gen 1 and 3 only
    const allTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel"];
    const yourTypes = [];

    pokemonSlots.forEach(slot => {

        const types = slot.querySelector(".pokemonTypes");

        types.textContent.split("/").forEach(type => {
            if (!yourTypes.includes(type)) {
                yourTypes.push(type);
            }
        });
    });

    const missingTypes = allTypes.filter(type => !yourTypes.includes(type));
    console.log(missingTypes);

    document.querySelector(".allTypes").textContent = missingTypes.join(" / ");
}

function filterReccomendations() {

    const pokemon = ["bulbasaur", ""];
    const fireRed = [];
    const leafGreen = [];
    const red = [];
    const blue = [];
    const yellow = [];
    const tradeEvos = [];
    const preEvos = [];
    const filteredPokemon = []

//probably have another array with each name hardcoded -> remove version exclusives, trade evos, pre evos the same way as calcTypes -> call api for all remaining in the array and dispay them. this is a lot of api calls so maybe look into cacheing them, still 151 calls when the page opens but atleast it wont do it every time you add a pokemon. its probably better to modify the first function awsell and just have everything pull from a cache, should be a super easy change.
}

function quickAdd() {
//probably just a click listner on the image -> adds name to first blank slot.
}