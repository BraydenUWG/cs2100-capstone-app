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

        //note: add/remove types to array or list or somethting for recommendations. (Maybe do this in a different function entirely, would be kinda a pain to do it here. have this function call another function (after everything is done here) that calculcates the types)

        types.textContent = data.types
            .map(type => type.type.name)
            .join("/");
    });
});



//probablt need 2-3 more functions, one to calculate current types & display thieir weaknesses. one to display the recommended options (remember to calculate for game ver, evos, trades). maybe one for a button to quickly add a recomendation to your party.