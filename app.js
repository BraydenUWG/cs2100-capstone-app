let pokemonList = [];

document.addEventListener("DOMContentLoaded", async () => {
    const pokemonNames = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

    pokemonList = await Promise.all(
        pokemonNames.map(async (name, index) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            console.log(data);
            
            return {
                name: name,
                types: data.types.map(type => type.type.name),
                sprite: data.sprites.front_default,
                shinySprite: data.sprites.front_shiny
            };
        })
    );

    filterReccomendations();
});

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
        
        //shiny chance for fun points
        if (Math.floor(Math.random() * 8192) + 1 == 1) {
            sprite.src = pokemonList.find(pokemon => pokemon.name === pokemonName).shintSprite;
            sprite.hidden = !sprite.src;
        }

        else {
            sprite.src = pokemonList.find(pokemon => pokemon.name === pokemonName).sprite;
            sprite.hidden = !sprite.src;
        }

        types.textContent = pokemonList.find(pokemon => pokemon.name === pokemonName).types.join("/");

    calcTypes();
    });
});

let removeTypes = [];

function calcTypes() {

    const allTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
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
    removeTypes = missingTypes;

    document.querySelector(".allTypes").textContent = missingTypes.join(" / ");
    filterReccomendations();
}

function filterReccomendations() {
    const fireRed = ["sandshrew", "sandslash", "vulpix", "ninetails", "bellsprout", "weepinbell", "victreebell", "slowpoke", "slowbro", "staryu", "starmie", "magmar", "pincir"];
    const leafGreen = ["ekans", "arbok", "oddish", "gloom", "vileplume", "psyduck", "golduck", "growlithe", "arcanine", "shellder", "cloyster", "scyther", "electabuzz"];
    const red = ["sandshrew", "sandslash", "vulpix", "ninetails", "meowth", "persian", "bellsprout", "weepinbell", "victreebell", "magmar", "pincir"];
    const blue = ["ekans", "arbok", "oddish", "gloom", "vileplume", "mankey", "primeape", "growlithe", "arcanine", "scyther", "electabuzz"];
    const yellow = ["weedle", "kakuna", "beedrill", "ekans", "arbok", "raichu", "meowth", "persian", "koffing", "weezing", "jynx", "electabuzz", "magmar"];
    const tradeEvos = ["alakazam", "machamp", "golem", "gengar"];
    const preEvos = ["venusaur", "charizard", "blastoise", "butterfree", "beedrill", "pidgeot", "raticate", "fearow", "arbok", "raichu", "sandslash", "nidoqueen", "nidoking", "clefable", "ninetales", "wigglytuff", "golbat", "vileplume", "parasect", "venomoth", "dugtrio", "persian", "golduck", "primeape", "arcanine", "poliwrath", "alakazam", "machamp", "victreebel", "tentacruel", "golem", "rapidash", "slowbro", "magneton", "farfetchd", "dodrio", "dewgong", "muk", "cloyster", "gengar", "onix", "hypno", "kingler", "electrode", "exeggutor", "marowak", "hitmonlee", "hitmonchan", "weezing", "rhydon", "chansey", "tangela", "kangaskhan", "seadra", "seaking", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "gyarados", "lapras", "ditto", "vaporeon", "jolteon", "flareon", "porygon", "omastar", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dragonite", "mewtwo", "mew"];
    const unobtainoble = ["mew"];
    let filteredPokemon = pokemonList;
    const versionSelect = document.getElementById("version").value;
    const tradesSelect = document.getElementById("trade").checked;
    const finalSelect = document.getElementById("final").checked;

    if ((removeTypes.length)) {
        filteredPokemon = filteredPokemon.filter(pokemon =>
            pokemon.types.every(type => removeTypes.includes(type))
        );
    }   

    filteredPokemon = filteredPokemon.filter(pokemon => !unobtainoble.includes(pokemon.name));

    if (versionSelect == 1) {
        filteredPokemon = filteredPokemon.filter(pokemon => !red.includes(pokemon.name));
    }

    else if (versionSelect == 2) {
        filteredPokemon = filteredPokemon.filter(pokemon => !blue.includes(pokemon.name));
    }

    else if (versionSelect == 3) {
        filteredPokemon = filteredPokemon.filter(pokemon => !yellow.includes(pokemon.name));
    }

    else if (versionSelect == 4) {
        filteredPokemon = filteredPokemon.filter(pokemon => !fireRed.includes(pokemon.name));
    }

    else if (versionSelect == 5) {
        filteredPokemon = filteredPokemon.filter(pokemon => !leafGreen.includes(pokemon.name));
    }

    //add technicalitys for kadabra graveler machoke and haunter later

    if (tradesSelect == 1) {
        filteredPokemon = filteredPokemon.filter(pokemon => !tradeEvos.includes(pokemon.name));
    }

    if (finalSelect == 1) {
        filteredPokemon = filteredPokemon.filter(pokemon => preEvos.includes(pokemon.name));
    }

    const container = document.getElementById("recc");

    container.innerHTML = "";

    filteredPokemon.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        card.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprite}">
            <p>${pokemon.types.join("/")}</p>
            `;

        container.appendChild(card);
    });
}

const finalUpdate = document.getElementById("final");

finalUpdate.addEventListener("change", async () => {
    filterReccomendations();
});

const tradeUpdate = document.getElementById("trade");

tradeUpdate.addEventListener("change", async () => {
    filterReccomendations();
});

const versionUpdate = document.getElementById("version");

versionUpdate.addEventListener("change", async () => {
    filterReccomendations();
});