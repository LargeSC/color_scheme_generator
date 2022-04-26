

let savedData = [
    ['#9B5C29', '#A08229', '#9FA529', '#7DAB29', '#58B029'],
    ['#298F9B', '#296FA0', '#294DA5', '#2A29AB', '#5329B0'],
    ['#402611', '#6A3E1B', '#935624', '#757575', '#8F8F8F'],
    ['#292929', '#424242', '#935624', '#BD6E2D', '#D58849'],
    ['#7D2889', '#882995', '#37A229', '#39AE29', '#3ABC28'],
    ['#285589', '#295B95', '#A26A29', '#AE7029', '#BC7728']
]
const savedMainContainer = document.getElementById('saved-scheme-container')

renderSaved()

function renderSaved(){
    savedMainContainer.innerHTML =""
    getSavedSchemes()

    let index = -1
    const savedHtml = savedData.map(dataSet => {
        index ++
        return `
            <div class="saved-scheme-container">
                <div class="saved-scheme">
                    <div class="saved-color" style="background:${dataSet[0]}"></div>
                    <div class="saved-color" style="background:${dataSet[1]}"></div>
                    <div class="saved-color" style="background:${dataSet[2]}"></div>
                    <div class="saved-color" style="background:${dataSet[3]}"></div>
                    <div class="saved-color" style="background:${dataSet[4]}"></div>
                </div>
                <div class="saved-title-container">
                    <h5 class="saved-title">Saved Scheme #${index+1}</h5>
                    <button class="del-saved-btn" data-index="${index}">-</button>
                </div>
            </div>
        `
    }).join('')

    savedMainContainer.innerHTML = savedHtml

    // Here we create the delete buttons for each saved scheme
    const delButtons = document.getElementsByClassName("del-saved-btn")
    for(let button of delButtons){
        button.addEventListener('click',()=>{
            const schemeToDelete = button.dataset.index
            savedData.splice(schemeToDelete,1)
            setSavedSchemes()
            renderSaved()
        })
    }
}



function getSavedSchemes() {
    savedData = JSON.parse(localStorage.getItem("schemes"))
}

function setSavedSchemes(){
    localStorage.setItem("schemes",JSON.stringify(savedData))
}
