const boxInput = document.getElementById("boxInput")
const liContainer = document.getElementById("liContainer")
const time = document.getElementById("time")
const good = document.getElementById("good")
const input = document.getElementById("input")
const icon = document.getElementById("icon")

// darkmode
icon.addEventListener('click', () => {
    document.body.classList.toggle("dark-theme")
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "/images/sun.png"
    } else {
        icon.src = "/images/moon.png"
    }
})

// pengaturan cursor
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Interpolasi posisi
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;

    currentX += dx * 0.1;
    currentY += dy * 0.1;

    // Hitung arah rotasi ke kursor
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    cursor.style.transform = `translate(${currentX - 40}px, ${currentY - 40}px) rotate(${angle}deg)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// pengaturan greeting
const name = prompt("silahkan isi nama kakak") || "kakak"

let currentDateTime = new Date();
let currentHours = currentDateTime.getHours()
let currentMinutes = currentDateTime.getMinutes()
let currentDate = currentDateTime.toDateString()

if (currentHours >= 4 && currentHours <= 9) {
    good.textContent = `Good Morning, ${name}!`
} else if (currentHours >= 10 && currentHours <= 14) {
    good.textContent = `Good Afternoon, ${name}!`
} else if (currentHours >= 15 && currentHours <= 18) {
    good.textContent = `Good Evening, ${name}!`
} else {
    good.textContent = `Good Night, ${name}!`
}
function Time(num) {
    return ("0" + num).slice(-2)
}
let currentTime = Time(currentHours) + ":" + Time(currentMinutes)

time.textContent = currentTime
day.textContent = currentDate

// pengaturan todolist baru
function addTodo() {
    if (boxInput.value !== "") {
        let newLi = document.createElement("li")
        newLi.innerHTML = boxInput.value
        liContainer.appendChild(newLi)
        let span = document.createElement("span")
        span.innerHTML = "❌"
        newLi.appendChild(span)
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });

    }
    boxInput.value = ""
    saveData()
}

// pengaturan edit todo
liContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveData()
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove()
        saveData()
    }
}, false
)

// fitur tekan enter 
boxInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo()
    }
})


// local storage
function saveData() {
    localStorage.setItem("data", liContainer.innerHTML)
}

function showData() {
    liContainer.innerHTML = localStorage.getItem("data")
}

function clearAll() {
    localStorage.clear()
    liContainer.innerHTML = ""
    Swal.fire({
        position: "middle",
        icon: "success",
        title: "All clear",
        showConfirmButton: false,
        timer: 1500
    });
}

showData()

