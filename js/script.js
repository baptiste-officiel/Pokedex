// On récupère la barre de recherche à laquelle on assigne une const
const input = document.querySelector('#search');

// On déclare ici l'url "global" de l'api 
let url = 'https://pokeapi.co/api/v2/pokemon';

// On déclare 2 variables, i pour l'offset de la requête et la pour la limit, ces données serviront à afficher les Pokemons 20 par 20
let i = 1;
let l = 20;

// A l'initialisation on appelle la fonction afficherPokemon avec les données initiales de i et l 
afficherPokemons(i, l);



function afficherPokemons(i, l) {

    // On fait une requ^te à l'api afin d'aller chercher la liste des Pokemons
    fetch(url + `?offset=${i}&limit=${l}`).then(response => response.json()).then(data => {

        let results = data.results;
        console.log("🚀 ~ file: script.js:12 ~ fetch ~ results", results);

        // On map à travers les résultats obtenus par la requête afin de garder les données correspondant à chaque Pokemon, puis on leur crée une card qu'on vient ajouter dans le dom
        results.map((pokemon) => {
            let pokemonName = pokemon.name;

            // i++ afin de sélectionner l'img correspondant au pokémon ainsi que les données

            let nom = document.createElement('h5');
            nom.innerText = pokemonName;

            let img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + [i] + ".png";
            console.log("🚀 ~ file: script.js:41 ~ results.map ~ i", i)

            // On crée la div card du Pokemon et on lui ajoute un id qu'on utilisera pour le mouseenter afin de sélectionner le pokemon correspondant
            let div = document.createElement('div');
            div.classList.add(`poke-card`);
            div.setAttribute('id', `${i}`)
            document.querySelector('.pokemons').appendChild(div);

            let image = document.createElement('img');
            image.src = img;
            div.appendChild(image);
            div.appendChild(nom);

            
            div.addEventListener('mouseenter', function(){
                // console.log(i);
                let i = div.getAttribute('id')
                console.log("🚀 ~ file: script.js:51 ~ div.addEventListener ~ i", i)
                fetch(url + '/' + [i]).then(response => response.json()).then(data => {
                    let infos = document.createElement('div');
                    infos.classList.add('infos');
                    div.appendChild(infos);
                    
                    console.log('Type : ' + data.types[0].type.name)
                    let type = document.createElement('p');
                    type.innerText = 'Type : ' + data.types[0].type.name;
                    infos.appendChild(type);
                    
                    // console.log(data.types)
                    let poidsEnKg = Math.round(data.weight / 2.205) + ' kg';
                    console.log('Weight : ' + poidsEnKg);
                    let poids = document.createElement('p');
                    poids.innerText = 'Weight : ' + poidsEnKg;
                    infos.appendChild(poids);
                    
                                    div.addEventListener('mouseleave', function(){
                                        infos.classList.add('hide')
                                    })
                })
            });


            i++;
        })


        })
    // });
}

// le bouton nous sert à ajouter 20 pokemons à la liste déjà existante, en rajoutant 20 à la variable de l'offset
let bouton = document.getElementById('bouton');
bouton.addEventListener('click', function () {
    i += 20;
    console.log(i, l);
    afficherPokemons(i, l)
})