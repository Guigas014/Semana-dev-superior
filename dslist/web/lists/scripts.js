const title = document.getElementsByClassName('collection')[0];
const content = document.getElementsByClassName('content')[0]


//LISTS
async function main() {

    // const content = document.getElementsByClassName('content')[0]
    

    await axios.get('http://localhost:8080/lists')
       .then((response) => {
           const list = response.data

           list.map(item => {
               const collection = document.createElement("a")
               collection.setAttribute("class", "item-collection")
            //    collection.setAttribute("href", `games.html`)
               collection.setAttribute("onclick", `toggleComponents(${item.id})`)
               collection.appendChild(document.createTextNode(item.name))
               content.append(collection)
           })

        //    console.log(response)
       })
       .catch((error) => {
           console.log(error)
       })
           
}    

//GAMES
async function toggleComponents(id) {
    const listName = document.getElementsByClassName('item-collection')
    // const content = document.getElementsByClassName('content')[0]


    //Muda o value do label de acordo com o id
    if (id === 1) {
       title.innerHTML = listName[id - 1].innerHTML
    } 
    if (id === 2) {
        title.innerHTML = listName[id - 1].innerHTML
    }
    
    //Some com a lista de tipo de jogos
    for (itemName of listName) {
        itemName.classList.add("hidden")
    }

    // listName[0].classList.add("hidden")
    // listName[1].classList.add("hidden")
    

    //REQUISIÇÃO PARA O BACKEND - GAMES
    await axios.get(`http://localhost:8080/lists/${id}/games`)
    .then((response) => {
        const games = response.data

        games.map(item => {
            const game = document.createElement("div")
            game.setAttribute("class", "game")
            // game.setAttribute("onmousedown", `moveGame()`)
            game.setAttribute("onmouseup", `setMoveGame()`)
            content.append(game)
            
            const banner = document.createElement("img")
            banner.setAttribute("alt", "banner do game")
            banner.setAttribute("src", `${item.imgUrl}`)
            game.appendChild(banner)
            
            const gameInfo = document.createElement("div")
            gameInfo.setAttribute("class", "game-info")
            game.appendChild(gameInfo)
            
            const gameTitle = document.createElement("div")
            gameTitle.setAttribute("class", "game-title")
            gameTitle.appendChild(document.createTextNode(item.title))
            gameInfo.appendChild(gameTitle)

            const gameDescription = document.createElement("div")
            gameDescription.setAttribute("class", "game-description")
            gameDescription.appendChild(document.createTextNode(item.shortDescription))
            gameInfo.appendChild(gameDescription)
            
            const gameYear = document.createElement("div")
            gameYear.setAttribute("class", "game-year")
            gameYear.appendChild(document.createTextNode(item.year))
            gameInfo.appendChild(gameYear)
            
            const key = document.createElement("span")
            key.setAttribute("class", "hidden")
            key.appendChild(document.createTextNode(item.id))
            game.appendChild(key)
            
            game.addEventListener('mousedown', moveGame)

        })

        // console.log(games)
    })
    .catch((error) => {
        console.log(error)
    })
    
}
    
//Botão Voltar
function back() {
        

    const listName = document.getElementsByClassName('item-collection')
    const typeChildElement = document.getElementsByClassName('content')[0]
        .lastChild.classList
        
    
    if (typeChildElement.value === "game") {
        //Adiciona lista de tipo de jogos
         for (itemName of listName) {
            itemName.classList.remove("hidden")
        }
        //Volta o titulo ao valor inicial
        title.innerHTML = "Minhas Coleções"
        
        //Some com a lista de games
        const games = document.getElementsByClassName('game')
        const gamesLength = document.getElementsByClassName('game').length
        for (let i = 0; i < gamesLength; i++) {
            games[0].remove()
        } 

        //Volta para o top da página
        document.scrollingElement.scroll(0, 0);
    }
    else if (typeChildElement.value === "item-collection") {
        // const lastURL = window.location.origin
        window.location.assign("/")
    }
}

function moveGame(event) {
    // console.log(listId)
    console.log(event.currentTarget.lastChild.innerHTML);
}

function setMoveGame() {
    console.log("UP")
}


main()
