const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');

// CONFIGURAÇÕES DO MODAL 

const openModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "flex"
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none"
}

const handleModalClose = (event) => {
    if(event.target.className === "modal"){
        event.target.style.display = "none"
    }
}

// FETCH API (pegando os dados)

const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  
    return result;
  }

  // CHAVES PARA CRIAR O FILTRO 

  /*
const keys = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
}

const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
      .map((elem) => {
        if(elem.checked === true && (Array.isArray(result[elem.name])) === true){
          const arrayResult = result[elem.name].join('\r\n');
          console.log(arrayResult);
          const newElem = document.createElement('p');
          newElem.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`;
          content.appendChild(newElem);
        } else if(elem.checked === true && (elem.name === 'origin')){
          const newElem = document.createElement('p');
          newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`;
          content.appendChild(newElem);
        } else if(elem.checked === true && typeof(result[elem.name]) !== 'object'){
          const newElem = document.createElement('p');
          newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
          content.appendChild(newElem);
        }
      });
  }
  
  */

  // PESQUISANDO ID DO PERSONAGEM 

   btnGo.addEventListener('click', async (event) => {
    event.preventDefault();
  
  // verificando se o id existe

    if(characterId.value === ''){
      alert("Digite o número de um personagem!");
    } else {
    
    const result = await fetchApi(characterId.value);
    const newTicker = 
            `<div class="card">
            <button class="btn-close"  onclick="removeTicker(event)">✖</button>
            <button class="btn-refresh" onclick="refreshTicker(event)">↺</button>
            <div class="card-header"> 
              <p class="card-title">${result.name}</p>
            </div>
            <div class="card-img">
              <img src="${result.image}" alt="${result.name}"/>
            </div>
            <div class="card-body">
              <p><b><span>Gender:<span></b> ${result.gender}</p>
              <p><b><span>Species:<span></b> ${result.species}</p>
              <p><b><span>Status:<span></b> ${result.status}</p>
              <p><b><span>Origin:<span></b> ${result.origin.name}</p>
             
            </div>
          </div>
             `
            const tickersList = document.querySelector("#tickers-list")
            tickersList.innerHTML = newTicker + tickersList.innerHTML
            addTickersEvents()
            closeModal('#add-stock')
    }
  });

/*

const handleAddTicker = (event) => {
    event.preventDefault();
    const name = document.querySelector('input').value;
    getCharacters(urlApi, name);
    render(character);
}

const render = (character) => {
    const newTicker = 
            `<div class="card">
            <div class="card-header">
              <p class="card-title">${character.name}</p>
            </div>
            <div class="card-img">
              <img src="${character.image}" alt="${character.name}"/>
            </div>
            <div class="card-body">
              <p><b>Gender:</b> ${character.gender}</p>
              <p><b>Species:</b> ${character.species}</p>
             
            </div>
          </div>
             `
            const tickersList = document.querySelector("#tickers-list")
            tickersList.innerHTML = newTicker + tickersList.innerHTML
            addTickersEvents()
            closeModal('#add-stock')
}

*/ 

const handleTickerMouseEnter = (event) => {
    const card = event.target
    const btnClose = card.querySelector(".btn-close")
    const btnRefresh = card.querySelector(".btn-refresh")
    btnClose.style.display = "block"
    btnRefresh.style.display = "block"
}

const addTickersEvents = () => {
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        card.addEventListener("mouseenter", handleTickerMouseEnter)
        card.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}

const handleTickerMouseLeave = (event) => {
    const card = event.target
    const btnClose = card.querySelector(".btn-close")
    const btnRefresh = card.querySelector(".btn-refresh")
    btnClose.style.display = "none"
    btnRefresh.style.display = "none"
}

const renderCards = () => {
  const divTickersList = document.querySelector("#tickers-list")
  divTickersList.innerHTML = ''
  tickersList.forEach((card) => {

    if(characterId.value === ''){
      alert("Digite o número de um personagem!");
    } else {

    const newTicker = 
            `<div class="card">
            <button class="btn-close"  onclick="removeTicker(event)">✖</button>
            <button class="btn-refresh" onclick="refreshTicker(event)">↺</button>
            <div class="card-header"> 
              <p class="card-title">${result.name}</p>
            </div>
            <div class="card-img">
              <img src="${result.image}" alt="${result.name}"/>
            </div>
            <div class="card-body">
              <p><b><span>Gender:<span></b> ${result.gender}</p>
              <p><b><span>Species:<span></b> ${result.species}</p>
              <p><b><span>Status:<span></b> ${result.status}</p>
              <p><b><span>Origin:<span></b> ${result.origin.name}</p>
             
            </div>
          </div>
             `
            const tickersList = document.querySelector("#tickers-list")
            tickersList.innerHTML = newTicker + tickersList.innerHTML
            addTickersEvents()
            closeModal('#add-stock')
    }
  });
}

const removeTicker = (event) => {
    const btnClose = event.target
    const card = btnClose.closest('.card')
    const cardheaderCard = card.querySelector('.card-header')
    const cardName = cardheaderCard.textContent

    /*newTickerList = tickersList.filter((card) => {
        return card.name !== cardName
    })
    tickersList = newTickerList*/
    renderCards()
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose)

addTickersEvents()

