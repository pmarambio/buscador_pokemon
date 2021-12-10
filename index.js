var formulario  = document.getElementById('form')

//funcion que consulta las url de pokeapi
const consulta_url = (la_url) => {
    //console.log(la_url)
    let settings = { method: "Get" }
    const fetchData = fetch(la_url, settings)
        .then(res => res.json())
        .then( (mi_objeto) => {
            return mi_objeto
        }).catch(error => {return error}); 

    return fetchData
}

//función que arma mi plantilla
const plantilla  = (datos) => { 
    //color card según tipo
    let colores = [
        {'tipo' : 'Acero',
        'color' :'#A8A8C0'},
        {'tipo' : 'Agua',
        'color' : '#3899F8'},
        {'tipo' : 'Bicho',
        'color' : '#A8B820'},
        {'tipo' : 'Dragón',
        'color' : '#7860E0'},
        {'tipo' : 'Eléctrico',
        'color' : '#F8D030'},
        {'tipo' : 'Fantasma',
        'color' : '#6060B0'},
        {'tipo' : 'Fuego',
        'color' : '#F05030'},
        {'tipo' : 'Hada',
        'color' : '#E79FE7'},
        {'tipo' : 'Hielo',
        'color' : '#58C8E0'},
        {'tipo' : 'Lucha',
        'color' : '#A05038'},
        {'tipo' : 'Normal',
        'color' : '#A8A090'},
        {'tipo' : 'Planta',
        'color' : '#78C850'},
        {'tipo' : 'Psíquico',
        'color' : '#F870A0'},
        {'tipo' : 'Roca',
        'color' : '#B8A058'},
        {'tipo' : 'Siniestro',
        'color' : '#7A5848'},
        {'tipo' : 'Tierra',
        'color' : '#E9D6A4'},
        {'tipo' : 'Veneno',
        'color' : '#B058A0'},
        {'tipo' : 'Volador',
        'color' : '#98A8F0'},
    ];
    let poke_card = document.querySelector('#poke_card')

    poke_card.innerHTML += `<h1 id="poke_titulo">#${datos.id}  ${datos.name}</h1>`
    poke_card.innerHTML += `<img id="poke_imagen" src="${datos.sprites.front_default}" alt="">`
    poke_card.innerHTML += `<div id="poke_tipos"><p class="poke_tipos"><span class="bold">Tipo:</span></p></div>`
    poke_card.innerHTML += `<div id="poke_habilidades"><p class="poke_habilidades"><span class="bold">Habilidades:</span></p></div>`


    let poke_tipos = document.querySelector('.poke_tipos'),
        poke_habilidades = document.querySelector('.poke_habilidades')

    //consulta tipo en español
    datos.types.map((item) => {
        let tipos = consulta_url(item.type.url);
        tipos.then((t) => {
            t.names.map((lang) => {
                if(lang.language.name == 'es'){
                    colores.forEach((item) => {
                        if(item.tipo == lang.name){
                            poke_tipos.innerHTML += `<span style="background-color:${item.color}">${item.tipo}</span>`                        
                        }
                    });
                }
            })
        })
    });

    //consulta habilidades en español
    datos.abilities.map((item) => {
        let habilidades = consulta_url(item.ability.url);
        habilidades.then((item) => {
            item.names.map((lang) => {
                if(lang.language.name == 'es'){
                    poke_habilidades.innerHTML += `<span style="color: #000000">${lang.name}</span>`
                }
            })
        })
    });
    
}

//al enviar el formulario completa la plantilla
formulario.addEventListener('submit',  (e) => {
    e.preventDefault();
    document.querySelector('#poke_card').innerHTML = ''
    let el_pokemon = document.getElementById('pokemon').value
        el_pokemon = el_pokemon.toLowerCase()

    if(el_pokemon == ''){
        document.querySelector('#poke_card').style.display = 'none'
        e.preventDefault();
        
    }else{
        document.querySelector('#poke_card').style.display = 'block'

        let url = "https://pokeapi.co/api/v2/pokemon/"+ el_pokemon,
        datos_pokemon = consulta_url(url)


        console.log(datos_pokemon)

        datos_pokemon.then((item) => {
            plantilla(item);
        })

    }

    
    return false;
});

