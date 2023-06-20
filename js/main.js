const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

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

// const urlApi = 'https://rickandmortyapi.com/api/character/';

const fetchApi = (value) => {
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  
    return result;
  }

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
  
  btnGo.addEventListener('click', async (event) => {
    event.preventDefault();
  
    if(characterId.value === ''){
      return content.innerHTML = 'É necessário fazer um filtro.';
    }
  
    const result = await fetchApi(characterId.value);
    const newTicker = 
            `<div class="card">
            <div class="card-header">
              <p class="card-title">${result.name}</p>
            </div>
            <div class="card-img">
              <img src="${result.image}" alt="${result.name}"/>
            </div>
            <div class="card-body">
              <p><b>Gender:</b> ${result.gender}</p>
              <p><b>Species:</b> ${result.species}</p>
              <p><b>Status:</b> ${result.status}</p>
              <p><b>Origin:</b> ${result.origin.name}</p>
             
            </div>
          </div>
             `
            const tickersList = document.querySelector("#tickers-list")
            tickersList.innerHTML = newTicker + tickersList.innerHTML
            addTickersEvents()
            closeModal('#add-stock')
  });
  

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


// const handleAddTicker = async (event) => {
//     event.preventDefault() // impede que o form seja enviado
//     const ticker = event.target.ticker.value // pega o valor do input ticker

//     const h2Tickers = document.querySelectorAll(".ticker h2")

//     let tickerWasFound = false
//     h2Tickers.forEach((h2) => {
//         if(h2.textContent === ticker){
//             alert("Ticker já adicionado!")
//             tickerWasFound = true
//         }
//     })
//     if(tickerWasFound){
//         return
//     }

//     console.log('teste')

//     try{
//         const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=HAUCFV4MBFM2A2Z1`) // faz a requisição na API
//         const data = await response.json() // transforma a resposta JSON em objeto
//         const price = data["Global Quote"]["05. price"]
//         const previousClosePrice = data["Global Quote"]["08. previous close"]
//         if(price && previousClosePrice){
//             const priceFormatted = parseFloat(price).toFixed(2)
//             const previousClosePriceFormatted = parseFloat(previousClosePrice).toFixed(2)
//             let priceChange = ''
//             let Symbol = ''
//             if (priceFormatted !== previousClosePriceFormatted) {
//                 if (priceFormatted > previousClosePriceFormatted) {
//                     priceChange = 'increase'
//                     Symbol = '▲'
//                 } else {
//                     priceChange = 'decrease'
//                     Symbol = '▼'
//                 }
//             }

//             const newTicker = 
//             `<div class="ticker">
//                 <button class="btn-close" onclick="removeTicker(event)">x</button>
//                 <button class="btn-refresh" onclick="refreshTicker(event)">R</button>
//                 <h2>${ticker}</h2>
//                 <p class="${priceChange}">${Symbol} $ ${priceFormatted}</p>
//             </div>
//             `
//             const tickersList = document.querySelector("#tickers-list")
//             tickersList.innerHTML = newTicker + tickersList.innerHTML
//             addTickersEvents()
//             closeModal('#add-stock')
//         }else{
//             alert(`Ticker ${ticker} não encontrado!`)
//         }
//     } catch (error){
//         alert(error)
//     }
// }

// const refreshTicker = async (event) => {
//     const divTicker = event.target.closest('.ticker')
//     const ticker = divTicker.querySelector('h2').textContent
//     const pPrice = divTicker.querySelector('p')
//     const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=HAUCFV4MBFM2A2Z1`) // faz a requisição na API
//     const data = await response.json() // transforma a resposta JSON em objeto
//     const price = data["Global Quote"]["05. price"]
//     const previousClosePrice = data["Global Quote"]["08. previous close"]
//     if(price && previousClosePrice){
//         const priceFormatted = parseFloat(price).toFixed(2)
//         const previousClosePriceFormatted = parseFloat(previousClosePrice).toFixed(2)
//         let priceChange = ''
//         let Symbol = ''
//         if(priceFormatted !== previousClosePriceFormatted){
//             if(priceFormatted > previousClosePriceFormatted){
//                 priceChange = 'increase'
//                 Symbol = '▲'
//             }else{
//                 priceChange = 'decrease'
//                 Symbol = '▼'
//             }
//         }
//         pPrice.innerHTML = `${Symbol} ${priceFormatted}`
//         pPrice.className = priceChange
//     }else{
//         alert(`Ticker ${ticker} não encontrado para atualização!`)
//     }
// }


const handleTickerMouseEnter = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close")
    const btnRefresh = ticker.querySelector(".btn-refresh")
    btnClose.style.display = "block"
    btnRefresh.style.display = "block"
}

const addTickersEvents = () => {
    const tickers = document.querySelectorAll(".ticker")
    tickers.forEach((ticker) => {
        ticker.addEventListener("mouseenter", handleTickerMouseEnter)
        ticker.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}

const handleTickerMouseLeave = (event) => {
    const ticker = event.target
    const btnClose = ticker.querySelector(".btn-close")
    const btnRefresh = ticker.querySelector(".btn-refresh")
    btnClose.style.display = "none"
    btnRefresh.style.display = "none"
}

// const removeTicker = (event) => {
//     const btnClose = event.target
//     const ticker = btnClose.closest('.ticker')
//     ticker.remove()
// }

const removeTicker = (event) => {
    const btnClose = event.target
    const ticker = btnClose.closest('.ticker')
    const h2Ticker = ticker.querySelector('h2')
    const tickerName = h2Ticker.textContent
    // const tickerIndex = tickersList.findIndex((ticker) => {
    //     return ticker.name === tickerName
    // })
    // tickersList.splice(tickerIndex, 1)
    // renderTickers()
    newTickerList = tickersList.filter((ticker) => {
        return ticker.name !== tickerName
    })
    tickersList = newTickerList
    renderTickers()
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose)

addTickersEvents()

