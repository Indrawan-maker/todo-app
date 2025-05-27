const boxInput = document.getElementById("boxInput")
const liContainer = document.getElementById("liContainer")


function addTodo(){
    if(boxInput.value !== "") {
        let newLi = document.createElement("li")
        newLi.innerHTML = boxInput.value
        liContainer.appendChild(newLi)
        let span = document.createElement("span")
        span.innerHTML = "❌"
        newLi.appendChild(span)
    } else {
        alert("masukan input!")
    }
    boxInput.value = ""
    saveData()
}

liContainer.addEventListener("click", function (e){
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveData()
    } else if (e.target.tagName ===  "SPAN") {
        e.target.parentElement.remove()
        saveData()
    }
},false
)

function saveData () {
    localStorage.setItem("data", liContainer.innerHTML)
}

function showData () {
    liContainer.innerHTML = localStorage.getItem("data")
}

showData()

