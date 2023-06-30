const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnEdit = document.getElementById('btn-edit');
const btnFilter = document.getElementById('btn-filter');
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

const fetchApi = async (value) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`)
    const data = await response.json()
    return data;
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

const handleCardMouseEnter = (event) => {
    const card = event.target
    const btnClose = card.querySelector(".btn-close")
    const btnEdit = card.querySelector(".btn-edit")
    btnClose.style.display = "block"
    btnEdit.style.display = "block"
    card.style.backgroundColor = "#678C4Da2"
    card.style.transform = "scale(1.05, 1.05)"

}

const handleCardMouseLeave = (event) => {
  const card = event.target
  const btnClose = card.querySelector(".btn-close")
  const btnEdit = card.querySelector(".btn-edit")
  btnClose.style.display = "none"
  btnEdit.style.display = "none"
  card.style.backgroundColor = "#282A36a2"
  card.style.transform = "none"
  
}


const addCardsEvents = () => {
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        card.addEventListener("mouseenter", handleCardMouseEnter)
        card.addEventListener("mouseleave", handleCardMouseLeave)
    })
}

// função filtro 

const filtrarDados = async (event) => {
  //peg o cards-list e limpa 
  event.preventDefault()
  const cardsList = document.querySelector('#cards-list')
  cardsList.innerHTML = ''

  check = document.querySelector('input[name="gender"]:checked').value
  //console.log(check)

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?gender=${check}`)
    const data = await response.json()
    //console.log(data)

    for (let i = 0; i < data.results.length; i++) {

      const nomePersonagem = data["results"][i]["name"]
      console.log(data["results"][i]["name"])
      const especiePersonagem = data["results"][i]["species"]
      const statusPersonagem = data["results"][i]["status"]
      const imgPersonagem = data["results"][i]["image"]

      const newCard = 
      `<div class="card">
      <button class="btn-close" onclick="removeCard(event)">✖</button>
      <button class="btn-edit" onclick="openModal('#edit-card')">🖉</button>
      <div class="card-header"> 
        <p class="card-title">${nomePersonagem}</p>
      </div>
      <div class="card-img">
        <img src="${imgPersonagem}" alt="${nomePersonagem}"/>
      </div>
      <div class="card-body">
        <p id="p-species"><b><span>Species:<span></b> ${especiePersonagem}</p>
        <p id="p-status"><b><span>Status:<span></b> ${statusPersonagem}</p>     
      </div>
    </div>
       `
      const cardsList = document.querySelector("#cards-list")
      cardsList.innerHTML = newCard + cardsList.innerHTML
      addCardsEvents()
      closeModal('#add-character')
    }
    
  }catch(error) {
    alert(error)
  }

  closeModal('#filter')
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
  



addCardsEvents()

