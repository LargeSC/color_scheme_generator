/*Changes in this version:
Improvements in UX:
 - Selector triggers scheme creation without need to click on button
Improvements in UI:
 - Larger buttons for mobile UX

*/

let hexesInScheme = [];
const colorContainer = document.getElementById("color-container")
const getSchemeBtn = document.getElementById("get-scheme")
const schemeSelector = document.getElementById("scheme-selector")
const modal = document.getElementById("modal")
const saveBtn = document.getElementById("save-scheme")

getScheme()

getSchemeBtn.addEventListener('click',getScheme)
schemeSelector.addEventListener('change',getScheme)

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
        console.log(hexesInScheme)
        renderScheme()
    })
}

function renderScheme(){
    const colorsHtml = hexesInScheme.map(hex =>{
        return `
        <div class="color-container">
            <div class="color" style="background:${hex}" data-hex="${hex}"></div>
            <p>${hex}</p>
        </div>`
        // return `
        // <div class="color">
        //     <div class="color" style="background:${hex}" onclick=copyColor('${hex}')></div>
        //     <p onclick=copyColor('${hex}')>${hex}</p>
        // </div>`
    }).join('')

    colorContainer.innerHTML = colorsHtml
    
    const colorsEl = document.getElementsByClassName("color")
    
    for (let element of colorsEl){
        element.addEventListener('click',()=>{
            copyColor(element.dataset.hex)
        })
    }

    saveBtn.classList.remove("saved")
}



saveBtn.addEventListener('click', saveScheme)

function saveScheme(){
    let itemsStored    
    if(localStorage.getItem("schemes")){
        itemsStored = JSON.parse(localStorage.getItem("schemes"))
    } else {
        itemsStored = []
    }
    itemsStored.push(hexesInScheme)
    saveBtn.classList.add("saved")
    localStorage.setItem("schemes",JSON.stringify(itemsStored))
}

function copyColor(hex){
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = hex;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    modal.style.opacity = "1"
    setTimeout(()=> modal.style.opacity = 0, 350)
}

