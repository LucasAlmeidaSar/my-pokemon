/* 
================================================================================
    Lista Geral de Pokemons
================================================================================
*/ 

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => 
    Array(500)
        .fill()
        .map((_, index) => fetch(getPokemonUrl(index+1))
        .then(response => response.json()))


const generateHTML = pokemons => 
    pokemons.reduce((acumulator, {id, name, types, stats}) => {
    const elementTypes = types.map( typeInfo => typeInfo.type.name)

    acumulator += 
        `<li 
        class="card ${elementTypes[0]}" 
        data-js="card" 
        data-id="${id}"
        data-name="${name}"
        data-type="${elementTypes[0]}">
            <img 
                class="card-image"  
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
            <h2 class="card-title">${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            <div class="card-container">   
                <ul class="card-list">
                    <li class="card-list-item">
                        <p>Hp: ${stats[0].base_stat}</p>
                    </li>
                    <li class="card-list-item">
                        <p>Attack: ${stats[1].base_stat}</p>
                    </li>
                    <li class="card-list-item">
                        <p>Defense: ${stats[2].base_stat}</p>
                    </li>
                </ul>    
            </div>            
        </li>`
    return acumulator
}, '')       
          

const insertHTML = pokemons => {
    const ul = document.querySelector('[data-js="pokemons"]')
    ul.innerHTML = pokemons 
}


const pokemonPromises = generatePokemonPromises()

const generateLis = Promise.all(pokemonPromises)
                            .then(generateHTML)
                            .then(insertHTML)
                            

  

/*
================================================================================
    Modal
================================================================================
*/

// Elements
const ulPokemons = document.querySelector('[data-js="pokemons"]')
const modalContainer = document.querySelector('[data-js="modal-container"]')
const modal = document.querySelector('[data-js="modal"]')
const modalIcon = document.querySelector('[data-js="modal-icon"]')
const modalPokemonName = document.querySelector('[data-js="pokemon-name"]')
const btnClose = document.querySelector('[data-js="modal-close"]')

const hpElement = document.querySelector('[data-js="hp"]')
const atkElement = document.querySelector('[data-js="atk"]')
const defElement = document.querySelector('[data-js="def"]')
const satkElement = document.querySelector('[data-js="sp-atk"]')
const sdefElement = document.querySelector('[data-js="sp-def"]')

const status = document.querySelector('[data-js="status"]')
const tipo = document.querySelector('[data-js="tipo"]')
const habilidade = document.querySelector('[data-js="habilidade"]')
const especie = document.querySelector('[data-js="especie"]')

const showModal = (li) => {    
    modalContainer.classList.add('ativo')
}

const hideModal = () => {    
    const secondClass = modal.classList[1]
    const ulHabilidade = document.querySelector('[data-js="habilidades-list"]')

    modalContainer.classList.remove('ativo')
    modal.classList.remove(secondClass)
    ulHabilidade.innerHTML = ''

}

const setUpModal = (li) => {
    const elementType = li.dataset.type
    const id = li.dataset.id
    const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

    modal.classList.add(elementType)
    modalIcon.style.backgroundImage = `url("${urlImg}")`
    modalIcon.setAttribute('href', `${urlImg}`)
    modalPokemonName.innerHTML = `${li.dataset.name}`
    
    modalStatus(id)
    modalTipo(id)
    modalHabilidade(id)
    modalEspecie(id)
}

const generateModal = () => {
    ulPokemons.addEventListener('click' , event => {
        var ClickedElement = event.target

        const liClicked = () => {
            while (!ClickedElement.dataset.js) {
                ClickedElement = ClickedElement.parentElement
            }
            return ClickedElement
        }
        const li = liClicked()
        
        if (li.dataset.js === 'card') {
            showModal(li) 
            setUpModal(li)
        }

    })
}

generateModal()



/* 
================================================================================
    Páginas do Modal
================================================================================
*/
const buttons = document.querySelectorAll('.modal-side-bar-item')
const modals = document.querySelectorAll('[data-modal]')
const btnStatus = document.querySelector('[data-js="status"]')
const statusPanel = document.querySelector('[data-js="modal-status"]')
const btnTipo = document.querySelector('[data-js="tipo"]')
const tipoPanel = document.querySelector('[data-js="modal-tipo"]')
const btnHabilidades = document.querySelector('[data-js="habilidades"]')
const habilidadesPanel = document.querySelector('[data-js="modal-habilidades"]')
const btnEspecie = document.querySelector('[data-js="especie"]')
const especiePanel = document.querySelector('[data-js="modal-especie"]')

const activePanel = {
    status() {
        buttons.forEach(btn => {
            if(btn.dataset.js !== 'status') btn.classList.remove('ativo')
        })
        
        modals.forEach(modal => {
            if(modal.dataset.js !== 'status') modal.classList.remove('ativo')
        })
        
        statusPanel.classList.add('ativo')
        btnStatus.classList.add('ativo')
    },

    tipo() {
        buttons.forEach(btn => {
            if(btn.dataset.js !== 'tipo') btn.classList.remove('ativo')
        })

        modals.forEach(modal => {
            if(modal.dataset.js !== 'tipo') modal.classList.remove('ativo')
        })

        tipoPanel.classList.toggle('ativo')
        btnTipo.classList.toggle('ativo')
    },

    habilidade() {
        buttons.forEach(btn => {
            if(btn.dataset.js !== 'habilidade') btn.classList.remove('ativo')
        })

        modals.forEach(modal => {
            if(modal.dataset.js !== 'habilidade') modal.classList.remove('ativo')
        })

        habilidadesPanel.classList.toggle('ativo')
        btnHabilidades.classList.toggle('ativo')
    },

    especie() {
        buttons.forEach(btn => {
            if(btn.dataset.js !== 'especie') btn.classList.remove('ativo')
        })

        modals.forEach(modal => {
            if(modal.dataset.js !== 'especie') modal.classList.remove('ativo')
        })

        especiePanel.classList.toggle('ativo')
        btnEspecie.classList.toggle('ativo')
    }
}




/* 
================================================================================
    STATUS
================================================================================
*/

const modalStatus = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await (await fetch(url)).json()    
    setUpStatusInfo(pokemon)
    activePanel.status()
    btnStatus.addEventListener('click', activePanel.status) 
}

const setUpStatusInfo = async pokemon => {
    const hp = pokemon.stats[0].base_stat
    const atk = pokemon.stats[1].base_stat
    const def = pokemon.stats[2].base_stat
    const satk = pokemon.stats[3].base_stat
    const sdef = pokemon.stats[4].base_stat

    const hpMax = 255
    const atkMax = 165
    const defMax = 230
    const satkMax = 154
    const sdefMax = 230
    
    const getPercent = (attribute, attributeMax) =>  (attribute / attributeMax) * 100
    
    const hpPercent   = getPercent(hp, hpMax)   
    const atkPercent  = getPercent(atk, atkMax) 
    const defPercent  = getPercent(def, defMax) 
    const satkPercent = getPercent(satk, satkMax) 
    const sdefPercent = getPercent(sdef, sdefMax) 

    hpElement.innerHTML = hp
    atkElement.innerHTML = atk
    defElement.innerHTML = def
    satkElement.innerHTML = satk
    sdefElement.innerHTML = sdef

    hpElement.style.width = `${hpPercent}%`
    atkElement.style.width = `${atkPercent}%`
    defElement.style.width = `${defPercent}%`
    satkElement.style.width = `${satkPercent}%`
    sdefElement.style.width = `${sdefPercent}%`

    const legendaryMythicalContainer = document.querySelector('[data-js="legendary-mythical-container"]')
    const legendaryMythicalTitle = document.querySelector('[data-js="legend-mythic-title"]')
    const legendaryMythicalStar = document.querySelector('[data-js="legend-mythic-star"]')
    const url = pokemon.species.url
    const getEspecie = async () => await (await fetch(url)).json()
    const getStatusPokemon = async () => {
        const especie = await getEspecie()
        const legendary = especie.is_legendary
        const mythical = especie.is_mythical

        if(legendary) {
            legendaryMythicalContainer.classList.remove('inativo')
            legendaryMythicalTitle.innerHTML = 'Legendary'
            legendaryMythicalStar.classList = "legend-mythic-star"
            legendaryMythicalStar.classList.add(`${pokemon.types[0].type.name}`)
            return
        }
        if(mythical){
            legendaryMythicalContainer.classList.remove('inativo')
            legendaryMythicalTitle.innerHTML = 'Mythical'
            legendaryMythicalStar.classList = "legend-mythic-star"
            legendaryMythicalStar.classList.add(`${pokemon.types[0].type.name}`)
            return
        }

        if(!legendary || !mythical){
            legendaryMythicalContainer.classList.add('inativo')
            legendaryMythicalTitle.innerHTML = ''
            legendaryMythicalStar.classList = "legend-mythic-star"
        }

    }

    getStatusPokemon()    
}




/* 
================================================================================
    TIPO
================================================================================
*/

const modalTipo = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await (await fetch(url)).json()    
    setUpTipoInfo(pokemon)
    btnTipo.addEventListener('click', activePanel.tipo ) 
}


const setUpTipoInfo = async pokemon => {
    const urlPokemonTypes = pokemon.types.length < 2 ? pokemon.types[0].type.url : pokemon.types
    const typeOfElement = typeof(urlPokemonTypes)
    const ulTypeName = document.querySelector('[data-js="tipo-list-name"]')
    const ulDamageTo = document.querySelector('[data-js="tipo-list-damage-to"]')
    const ulDamageFrom = document.querySelector('[data-js="tipo-list-damage-from"]')

    if (typeOfElement === 'string') {
        const typeUnit = await (await fetch(urlPokemonTypes)).json()
        setUpSingleType(typeUnit)
    }

    if (typeOfElement === 'object') {
        const type1 = await (await fetch(urlPokemonTypes[0].type.url)).json()
        const type2 = await (await fetch(urlPokemonTypes[1].type.url)).json()        
        setUpMultipleTypes(type1, type2)
    }

    function setUpSingleType(typeUnit){
        
        const damageToQuantity = typeUnit.damage_relations.double_damage_to.length
        const damageFromQuantity = typeUnit.damage_relations.double_damage_from.length
       
        const typeName =
            `<li class="tipo-item ${typeUnit.name}">${typeUnit.name}</li>`       
        ulTypeName.innerHTML = typeName

        // Damage To

        if(damageToQuantity === 0) {
            const damageTo =
             `<li class="tipo-item fire">No Types!</li>`
            ulDamageTo.innerHTML = damageTo
        }

        if(damageToQuantity === 1) {
            const damageTo =
             `<li class="tipo-item ${typeUnit.damage_relations.double_damage_to[0].name}">
             ${typeUnit.damage_relations.double_damage_to[0].name}
             </li>`
            ulDamageTo.innerHTML = damageTo
        }

        if(damageToQuantity > 1) {
            const damageTo = typeUnit.damage_relations.double_damage_to.reduce((accumulator, type) => {
                accumulator += 
                `<li class="tipo-item ${type.name}">${type.name}</li>`
                return accumulator
            }, '')

            ulDamageTo.innerHTML = damageTo
        }


        // Damage From

        if(damageFromQuantity === 0) {
            const damageFrom =
             `<li class="tipo-item fire">No Types!</li>`
            ulDamageFrom.innerHTML = damageFrom
        }

        if(damageFromQuantity === 1) {
            const damageFrom =
             `<li class="tipo-item ${typeUnit.damage_relations.double_damage_from[0].name}">
             ${typeUnit.damage_relations.double_damage_from[0].name}
             </li>`
             ulDamageFrom.innerHTML = damageFrom
        }

        if(damageFromQuantity > 1) {
            const damageFrom = typeUnit.damage_relations.double_damage_from.reduce((accumulator, type) => {
                accumulator += 
                `<li class="tipo-item ${type.name}">${type.name}</li>`
                return accumulator
            }, '')

            ulDamageFrom.innerHTML = damageFrom
        }
    }

    function setUpMultipleTypes(type1, type2){
        const damageToQuantityType1 = type1.damage_relations.double_damage_to.length
        const damageFromQuantityType1 = type1.damage_relations.double_damage_from.length

        const damageToQuantityType2 = type2.damage_relations.double_damage_to.length
        const damageFromQuantityType2 = type2.damage_relations.double_damage_from.length

        const damageToArray = []
        const damageFromArray = []

       
        const typesNames =
            `<li class="tipo-item ${type1.name}">${type1.name}</li>     
            <li class="tipo-item ${type2.name}">${type2.name}</li>`       
        ulTypeName.innerHTML = typesNames

        // Damage To - Type 1

        if(damageToQuantityType1 === 0 && damageToQuantityType2 === 0) {
            const damageTo =
             `<li class="tipo-item fire">No Types!</li>`
            ulDamageTo.innerHTML = damageTo
        }

        if(damageToQuantityType1 === 0 && damageToQuantityType2 !== 0) {
           ulDamageTo.innerHTML = ''
        }

        if(damageToQuantityType1 === 1) {
            let type = type1.damage_relations.double_damage_to[0].name
            damageToArray.push(type)
        }

        if(damageToQuantityType1 > 1) {
            // ulDamageTo.innerHTML = damageTo
            let types = type1.damage_relations.double_damage_to.forEach(type => {
                let name = type.name
                damageToArray.push(name)
            })           
        }

        // Damage To - Type 2

        if(damageToQuantityType2 === 1) {
            let type = type2.damage_relations.double_damage_to[0].name
            damageToArray.push(type)
        }

        if(damageToQuantityType2 > 1) {
            let types = type2.damage_relations.double_damage_to.forEach(type => {
                let name = type.name
                damageToArray.push(name)
            })
        }

        const uniqueTypes = damageToArray.filter((type, index, array) => array.indexOf(type) === index)
        const lis = uniqueTypes.reduce((accumulator, type) => {
            accumulator += 
            `<li class="tipo-item ${type}">
                ${type}
            </li>`
            
            return accumulator
        },'')

        ulDamageTo.innerHTML = lis

        

        // Damage From - Type 1

        if(damageFromQuantityType1 === 0 && damageFromQuantityType2 === 0) {
            const damageFrom =
             `<li class="tipo-item fire">No Types!</li>`
            ulDamageFrom.innerHTML = damageFrom
        }

        if(damageFromQuantityType1 === 0 && damageFromQuantityType2 !== 0) {
            const damageFrom = ''
            ulDamageFrom.innerHTML = damageFrom
        }

        if(damageFromQuantityType1 === 1) {
            let type = type1.damage_relations.double_damage_from[0].name
            damageFromArray.push(type)
        }

        if(damageFromQuantityType1 > 1) {
            let types = type1.damage_relations.double_damage_from.forEach(type => {
                let name = type.name
                damageFromArray.push(name)
            })
        }

        // Damage To - Type 2

        if(damageFromQuantityType2 === 1) {
            let type = type2.damage_relations.double_damage_from[0].name
            damageFromArray.push(type)
        }

        if(damageFromQuantityType2 > 1) {
            let types = type2.damage_relations.double_damage_from.forEach(type => {
                let name = type.name
                damageFromArray.push(name)
            })
        }

        const uniqueTypesFrom = damageFromArray.filter((type, index, array) => array.indexOf(type) === index)
        const lisFrom = uniqueTypesFrom.reduce((accumulator, type) => {
            accumulator += 
            `<li class="tipo-item ${type}">
                ${type}
            </li>`
            
            return accumulator
        },'')

        ulDamageFrom.innerHTML = lisFrom
    }

}





/* 
================================================================================
    HABILIDADE
================================================================================
*/

const modalHabilidade = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await (await fetch(url)).json()    
    setUpHabilidadeInfo(pokemon)
    btnHabilidades.addEventListener('click', activePanel.habilidade)
}

const setUpHabilidadeInfo = async pokemon => {
    const urlPokemonAbilities = pokemon.abilities.length < 2 ? pokemon.abilities[0].ability.url : pokemon.abilities
    const typeOfElement = typeof(urlPokemonAbilities)
    const ulHabilidade = document.querySelector('[data-js="habilidades-list"]')    
    
    if (typeOfElement === 'string') {
        const singleAbility = await (await fetch(urlPokemonAbilities)).json()
        const description = singleAbility.effect_entries.filter(descri => descri.language.name === 'en')        

        const li = 
        `<li class="habilidades-item">                      
            <h3 class="habilidade-name">${singleAbility.name}</h3>                        
            <p class="habilidade-description">${description[0].short_effect}</p>                         
        </li>`

        ulHabilidade.innerHTML = li
    }

    if (typeOfElement === 'object') {
        urlPokemonAbilities.forEach(async (_, index) => {
            const ability = await (await fetch(urlPokemonAbilities[index].ability.url)).json()
            const description = ability.effect_entries.filter(descri => descri.language.name === 'en')            

            const li = 
            `<li class="habilidades-item">                      
                <h3 class="habilidade-name">${ability.name}</h3>                        
                <p class="habilidade-description">${description[0].short_effect}</p>                         
            </li>`

            ulHabilidade.innerHTML += li
        })
        
        
    }
}





/* 
================================================================================
    ESPÉCIE
================================================================================
*/

const modalEspecie = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await (await fetch(url)).json()    
    setUpEspecieInfo(pokemon)
    btnEspecie.addEventListener('click', activePanel.especie )
}

const setUpEspecieInfo = async pokemon => {
    const url = pokemon.species.url
    const especie = await (await fetch(url)).json()
    const ulEspecie = document.querySelector('[data-js="especie-list"]')    
    const urlNextEvolution = especie.evolution_chain.url 
    const evolution = await (await fetch(urlNextEvolution)).json()
    
    const habitat = especie.habitat === null ? 'No habitat' : especie.habitat.name

    const evolution1 = evolution.chain.species.name
    if(evolution.chain.evolves_to.length === 0){
        var evolution2 = 'No evolves'
        var evolution3 = 'No evolves'
    }
    if(evolution.chain.evolves_to.length !== 0){
        var evolution2 = evolution.chain.evolves_to[0].species.name
        var evolution3 = evolution.chain.evolves_to[0].evolves_to.length === 0 ? 'No evolves' : evolution.chain.evolves_to[0].evolves_to[0].species.name
    }
    

    const lis = 
    `
    <li class="especie-item"><strong>Specie:</strong> ${especie.name}</li>
    <li class="especie-item"><strong>Capture rate:</strong> ${especie.capture_rate}</li>
    <li class="especie-item"><strong>Color:</strong> ${especie.color.name}</li>
    <li class="especie-item"><strong>Evolution 1:</strong> 
        <a class="especie-link" data-js="especie-link" href="javascript:void(0)">
            ${evolution1}
        </a> 
    </li>
    <li class="especie-item"><strong>Evolution 2:</strong>
        <a class="especie-link" data-js="especie-link" href="javascript:void(0)">
            ${evolution2}
        </a>
    </li>
    <li class="especie-item"><strong>Evolution 3:</strong>
        <a class="especie-link" data-js="especie-link" href="javascript:void(0)">
            ${evolution3}
        </a>
    </li>
    <li class="especie-item"><strong>Habitat:</strong> ${habitat}</li>
    <li class="especie-item"><strong>Shape:</strong> ${especie.shape.name}</li>
    `

    ulEspecie.innerHTML = lis
}




/* 
================================================================================
    Campo de Busca
================================================================================
*/
const inputSearch = document.querySelector('#filter')
const btnSearch  = document.querySelector('[data-js="btnSearchPokemon"]')
const btnAll = document.querySelector('[data-js="btnAllPokemons"]')
const btnFilter = document.querySelector('[data-js="btnFilterPokemon"]')
const modalFilter = document.querySelector('[data-js="modal-filter"]')
const btnFilterApply = document.querySelector('[data-js="btn-filter-apply"]')
const filtredType = document.querySelector('[data-js="filtred-type"]')
const filtredTypeElement = document.querySelector('[data-js="filtred-type-element"]')
const filtredTypeCount = document.querySelector('[data-js="filtred-type-count"]')

const filterAll = () => {
    const generateLis = Promise.all(pokemonPromises)
                                .then(generateHTML)
                                .then(insertHTML)
                                
    inputSearch.value = ''
    inputSearch.focus()
    btnAll.classList.remove('inativo')
    modalFilter.classList.add('inativo')
    filtredType.classList.add('inativo')
    btnFilter.classList.remove('ativo')

}

btnFilter.addEventListener('click', () => {
    modalFilter.classList.toggle('inativo')
})

btnFilterApply.addEventListener('click', () => {
    modalFilter.classList.add('inativo')    
})

btnAll.addEventListener('click' , filterAll)


const urlUniquePokemon = name => `https://pokeapi.co/api/v2/pokemon/${name}`

btnSearch.addEventListener('click' , () => {
    const urlPokemon = urlUniquePokemon(inputSearch.value.toLowerCase())

    const getPokemon = async () => await (await fetch(urlPokemon)).json()

    const logPokemonUnique = async () => {
        const pokemon = await getPokemon()
        generateUniqueHTML(pokemon)
    }
    logPokemonUnique()
    inputSearch.value = ''
    inputSearch.focus()
    btnAll.classList.add('inativo')
    filtredType.classList.add('inativo')
})


const generateUniqueHTML = ({name, id, stats, types}) => {
    const elementTypes = types.map( typeInfo => typeInfo.type.name)
    const li = 
    `<li 
        class="card unique ${elementTypes[0]}" 
        data-js="card" 
        data-id="${id}"
        data-name="${name}"
        data-type="${elementTypes[0]}">
        <img 
            class="card-image"  
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
        <h2 class="card-title">${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        <div class="card-container">   
            <ul class="card-list">
                <li class="card-list-item">
                    <p>Hp: ${stats[0].base_stat}</p>
                </li>
                <li class="card-list-item">
                    <p>Attack: ${stats[1].base_stat}</p>
                </li>
                <li class="card-list-item">
                    <p>Defense: ${stats[2].base_stat}</p>
                </li>
            </ul>    
        </div>            
    </li> `

    insertUniqueHTML(li)
}

const insertUniqueHTML = li => ulPokemons.innerHTML = li




/* 
================================================================================
    Eventos
================================================================================
*/

btnClose.addEventListener('click' , hideModal)


// Link de espécie dentro do modal

const ulEspecie = document.querySelector('[data-js="especie-list"]')

ulEspecie.addEventListener('click', event => {
    const clickedElement = event.target
    
    if(clickedElement.tagName === 'A'){
        const pokemonName = clickedElement.innerText.toLowerCase()
        const urlPokemon = urlUniquePokemon(pokemonName)

        const getPokemon = async () => await (await fetch(urlPokemon)).json()

        const generateHTML = async () => {
            const pokemon = await getPokemon()
            generateUniqueHTML(pokemon)
        }
        generateHTML()
        inputSearch.value = ''
        inputSearch.focus()
        btnAll.classList.add('inativo')

        hideModal()
    }
    

})




/* 
================================================================================
    Filtrar por Elemento do Pokemon
================================================================================
*/

const arrayPokemons = document.querySelector('ul').children

const selectFilter = document.querySelector('.elements-select')

const filtrarElemento = () => {
    const valorInput = selectFilter.value.toLowerCase()
    
    if(valorInput !== '0'){
        const arrayFilter = Array.from(arrayPokemons)        
            .filter(el => el.querySelector('.card-subtitle')
            .textContent.includes(valorInput))

        const results = arrayFilter.length

        filtredType.classList.remove('inativo')
        filtredTypeElement.innerHTML = valorInput

        filtredTypeCount.innerHTML = results

        return arrayFilter
    }
}

const generateFilterHTML = pokemons =>{
    const li = pokemons.reduce((accumulator, pokemon) => {
        accumulator += 
        `<li 
                class="${pokemon.className}" 
                data-js="card" 
                data-id="${pokemon.dataset.id}"
                data-name="${pokemon.dataset.name}"
                data-type="${pokemon.dataset.type}">
                ${pokemon.innerHTML}             
                </li>`
        return accumulator
    },'')
    return li
}

const filterByElement = () => {
    const pokemons = filtrarElemento()  
    const arrayLis =  generateFilterHTML(pokemons)
    insertHTML(arrayLis)
    btnAll.classList.add('inativo')
    btnFilter.classList.add('ativo')
    selectFilter.value = '0'
}

const btnApplyFilter = document.querySelector('.btn-filter-apply')

btnApplyFilter.addEventListener('click' , () => {
  const generateLis = Promise.all(pokemonPromises)
                                .then(generateHTML)
                                .then(insertHTML)
                                .then(filterByElement)  
})




/* 
================================================================================
    Scroll
================================================================================
*/

const btnToTop = document.querySelector('[data-js="btn-to-top"]')

onscroll = () => {
    document.documentElement.scrollTop >= '500' ?
        btnToTop.classList.remove('inativo') :
        btnToTop.classList.add('inativo')    
    
}




/* 
================================================================================
    Buscando valores específicos
================================================================================
*/

// Caputrando os valores máximos de cada atributo
const verifyMaxSpAtk = Promise.all(pokemonPromises)
.then(pokemons => pokemons.reduce((accumulator, pokemon) => {
    var hp = pokemon.stats[4].base_stat
    return Math.max(accumulator, hp)
}, 0)).then()

//Pokemons que possuem quantidade específica de habilidades
const verifyNoAbilityPokemon = Promise.all(pokemonPromises)
.then(pokemon => pokemon.filter(pokemon => pokemon.abilities.length === 1))
.then()


//Pokemons que possuem os atributos mais fortes
const verifyMaxHpPokemon = Promise.all(pokemonPromises)
.then(pokemon => pokemon.filter(pokemon => pokemon.stats[0].base_stat === 255))
.then()
