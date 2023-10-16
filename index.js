import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playground-945b0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "kumo")
const booksInDB =  ref(database, "books")


const addButton = document.getElementById("add-btn")
const inputField = document.getElementById("input-field")
const movieList =  document.getElementById("movie-list")

onValue(moviesInDB, function(snapshot){
    
    if(snapshot.exists()){
         clearList()
         let moviesArray = Object.entries(snapshot.val())
         for(let i = 0; i < moviesArray.length; i++){
             let currentMovies = moviesArray[i]
             let currentMoviesID = currentMovies[0]
             let currentMoviesValue = currentMovies[1]
             addList(currentMovies)
         }
    } else {
        if(movieList) {
            movieList.textContent = "Nothing to show here...";
            movieList.style.color = "grey";
            movieList.style.fontSize = "20px"
    }
    }
})

addButton.addEventListener("click", () => {
    let inputValue = inputField.value
    push(moviesInDB, inputValue)
    clearInput()
    //  addList(inputValue)
})

function clearInput() {
    inputField.value = ""
}

function addList(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let li = document.createElement("li")
    li.textContent = itemValue
    movieList.appendChild(li)
    
    li.addEventListener("dblclick", () =>{
    let movieLocation = ref(database, `kumo/${itemID}`)
    remove(movieLocation)
    })
}

function clearList(){
    movieList.innerHTML = ""
}

