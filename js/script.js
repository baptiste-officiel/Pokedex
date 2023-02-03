// On déclare ici l'url "global" de l'api 
let url = 'https://pokeapi.co/api/v2/pokemon';


// On fait une requ^te à l'api afin d'aller chercher la liste de tous les pokemons 
fetch(url+'?offset=0&limit=10000').then(response => response.json()).then(data => { 
    // console.log(data);
    // let results = data.results;
    // for (pokemon of results){
    //     console.log(pokemon.name)
    // }

    let results = data.results;
    // console.log("🚀 ~ file: script.js:9 ~ fetch ~ results", results)

    // On initialise ici deux variables afin de les utiliser ensuite pour afficher 20 pokemons supplémentaires à la fois 
    let nombreInit = 0
    let nombreMax = 20;

    // A l'initialisation on veut voir apparaitre les 20 premiers pokemons de la liste avec leur nom et une image donc on boucle à travers le tableau de Pokemons (results) et on attribue à chaque "result" le nom du Pokemon et sa photo
    for (let i = nombreInit; i < nombreMax; i++) {
        // console.log(i)
        let result = results[i];
        // console.log('bite', [i])
        // console.log(result.name)
        
        let nom = document.createElement('h5');
        nom.innerText = result.name; 
        // console.log("🚀 ~ file: script.js:17 ~ fetch ~ nom", nom);
        
        let img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + [i+1] + ".png";
        // console.log("🚀 ~ file: script.js:8 ~ fetch ~ img", img)

        let div = document.createElement('div');
        div.classList.add('poke-card');
        document.querySelector('.pokemons').appendChild(div);
        
        let image = document.createElement('img');
        image.src = img ;
        div.appendChild(image);
        
        div.appendChild(nom);
        

        // let infosBouton = document.createElement('button');
        // infosBouton.classList.add('more');
        // infosBouton.innerText = 'more';
        // div.appendChild(infosBouton);

        div.addEventListener('mouseenter', function(){
            fetch(url+'/'+[i+1]).then(response => response.json()).then(data => {
                let infos = document.createElement('div');
                infos.classList.add('infos');
                div.appendChild(infos);

                // let closeBouton = document.createElement('button');
                // closeBouton.classList.add('more');
                // closeBouton.innerText = 'fermer';
                // infos.appendChild(closeBouton)

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
                    infos.classList.add('hide');
                })
            })
        })

    }

    let bouton = document.getElementById('bouton');
    
    // On intègre ici un bouton qui servira à afficher les 20 pokemons suivants 
        bouton.addEventListener('click', function(e){
            // e.preventDefault();
            nombreInit+=20;
            nombreMax+=20;
            for (let i = nombreInit; i < nombreMax; i++) {
                // console.log(i)
                let result = results[i];
                // console.log('bite', [i])
                // console.log(result.name)
                
                let nom = document.createElement('h5');
                nom.innerText = result.name; 
                // console.log("🚀 ~ file: script.js:17 ~ fetch ~ nom", nom);
                
                let img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + [i+1] + ".png";
                // console.log("🚀 ~ file: script.js:8 ~ fetch ~ img", img)
        
                let div = document.createElement('div');
                document.querySelector('.pokemons').appendChild(div);
        
                let image = document.createElement('img');
                image.src = img ;
                div.appendChild(image);
                
                div.appendChild(nom);
                
            }
        })
        // console.log("🚀 ~ file: script.js:18 ~ bouton.addEventListener ~ nombreMax", nombreMax)





    
    

    
    // console.log("🚀 ~ file: script.js:12 ~ fetch ~ image", image);

    // let nom = document.createElement('h5');
    // nom.innerText = data.name; 
    // console.log("🚀 ~ file: script.js:16 ~ fetch ~ nom", nom)

    
    // let pokemon = document.getElementById('pokemon');

    // let div = document.createElement('div');
    // document.querySelector('.pokemons').appendChild(div);
    // div.appendChild(nom);

    // console.log("🚀 ~ file: script.js:20 ~ fetch ~ image", image)
    
});
