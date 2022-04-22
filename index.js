let hexesInScheme = [];
const colorContainer = document.getElementById("color-container")
const getSchemeBtn = document.getElementById("get-scheme")
const schemeSelector = document.getElementById("scheme-selector")
const modal = document.getElementById("modal")

getScheme()

getSchemeBtn.addEventListener('click',getScheme)

//TODO hacer que haya un boton con el que se pueda guardar las paletas preferidas en local storage. Hacer un lugar para poder display las distintaspaletas guardadas y hasta nombrarlas.

function getScheme(){
    const seedColor = document.getElementById("color-picker").value.substr(1)
    const schemeMode = schemeSelector[schemeSelector.selectedIndex].value
    const fetchUrl = `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}`
    

    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        const colors = data.colors
        hexesInScheme = []
        for(let color of colors){
        hexesInScheme.push(color.hex.value)
        }
        
        renderScheme()
    })
}

function renderScheme(){
    
    const colorsHtml = hexesInScheme.map(hex =>{
        return `
        <div class="color">
            <div class="color" style="background:${hex}" onclick=copyColor('${hex}')></div>
            <p onclick=copyColor('${hex}')>${hex}</p>
        </div>`
    }).join('')

    colorContainer.innerHTML = colorsHtml
}

// document.getElementById("save-scheme").addEventListener('click', saveScheme)

function saveScheme(){    
    let itemsStored = JSON.parse(localStorage.getItem("schemes"))
    localStorage.setItem("schemes",JSON.stringify(hexesInScheme))
    console.log(itemsStored)
}

function copyColor(hex){
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = hex;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    modal.style.opacity = "1"
    setTimeout(()=> modal.style.opacity = 0, 250)
}



// saveScheme(hexesInScheme)

// function getScheme() {
//     // JSON.parse(localStorage.getItem("schemes"))
//     console.log(JSON.parse(localStorage.getItem("schemes")))
// }

// getScheme()