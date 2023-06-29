const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnEdit = document.getElementById('btn-edit');
const checkStatus = document.getElementById('status');
const checkSpecies = document.getElementById('species');
const checkGender = document.getElementById('gender');
const checkOrigin = document.getElementById('origin');
const cardBody = document.querySelector('.card-body');

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

 

  // PESQUISANDO ID DO PERSONAGEM 

   btnGo.addEventListener('click', async (event) => {
    event.preventDefault();
  
  // verificando se o id existe

    if(characterId.value === ''){
      alert("Digite o número de um personagem!");
    } else {

    const result = await fetchApi(characterId.value);
    const newCard = 
            `<div class="card">
            <button class="btn-close" onclick="removeCard(event)">✖</button>
            <button class="btn-edit" onclick="openModal('#edit-card')">🖉</button>
            <div class="card-header"> 
              <p class="card-title">${result.name}</p>
            </div>
            <div class="card-img">
              <img src="${result.image}" alt="${result.name}"/>
            </div>
            <div class="card-body">
              <p id="p-gender"><b><span>Gender:<span></b> ${result.gender}</p>
              <p id="p-species"><b><span>Species:<span></b> ${result.species}</p>
              <p id="p-status"><b><span>Status:<span></b> ${result.status}</p>
              <p><b><span>Origin:<span></b> ${result.origin.name}</p>
             
            </div>
          </div>
             `
            const cardsList = document.querySelector("#cards-list")
            cardsList.innerHTML = newCard + cardsList.innerHTML
            addCardsEvents()
            closeModal('#add-character')
    }
  });

// Eventos de mouse leave e mouse enter

const handleTickerMouseEnter = (event) => {
    const card = event.target
    const btnClose = card.querySelector(".btn-close")
    const btnEdit = card.querySelector(".btn-edit")
    btnClose.style.display = "block"
    btnEdit.style.display = "block"
}

const handleTickerMouseLeave = (event) => {
  const card = event.target
  const btnClose = card.querySelector(".btn-close")
  const btnEdit = card.querySelector(".btn-edit")
  btnClose.style.display = "none"
  btnEdit.style.display = "none"
}

const addCardsEvents = () => {
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        card.addEventListener("mouseenter", handleTickerMouseEnter)
        card.addEventListener("mouseleave", handleTickerMouseLeave)
    })
}



const renderCards = () => {
  const divCardsList = document.querySelector("#cards-list")
  divCardsList.innerHTML = ''

    if(characterId.value === ''){
      alert("Digite o número de um personagem!");
    } else {

    const newCard = 
            `<div class="card" id="character">
            <button class="btn-close" onclick="removeCard(event)">✖</button>
            <button class="btn-edit" onclick="editCard(event)">🖉</button>
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
            const cardsList = document.querySelector("#cards-list")
            cardsList.innerHTML = newCard + cardsList.innerHTML
            addCardsEvents()
            closeModal('#add-character')
    }
}

const infos = ['name', 'status', 'species', 'gender', 'origin', 'episode'];
 const newInfos = {
   name: 'Nome',
   status: 'Status',
   species: 'Espécie',
   gender: 'Gênero',
   origin: 'Origem'
 }

// removendo e editando o card

const removeCard = (event) => {
    const btnClose = event.target
    const card = btnClose.closest('.card')

    card.remove()
}


const editCard = (event) => {

  if(checkStatus.checked){
    const btnEdit = event.target
    const pStatus = document.getElementById('p-status')
    pStatus.remove()
    closeModal('#edit-card')
  } else if(checkGender.checked){
    const btnEdit = event.target
    const pGender = document.getElementById('p-gender')
    pGender.remove()
    closeModal('#edit-card')
  } else if(checkSpecies.checked){
    const btnEdit = event.target
    const pSpecies = document.getElementById('p-species')
    pSpecies.remove()
    closeModal('#edit-card')
  } else if(checkOrigin.checked) {
    const btnEdit = event.target
    const pOrigin = document.getElementById('p-origin')
    pOrigin.remove()
  }
}

const modal = document.querySelector(".modal")
modal.addEventListener("click", handleModalClose)

 // CHAVES PARA CRIAR O FILTRO 

  btnEdit.addEventListener('click', async (event) => {
  event.preventDefault();
  
    
  });
  



//addCardsEvents()

