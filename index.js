const columnsWrapper = document.getElementById('color-scheme-app--colors')
const colorPicker = document.getElementById('color-picker')
const colorSubmit = document.getElementById('color-submit')
const copiedColorMessage = document.getElementById('copied-color-message')
const baseUrl = 'https://www.thecolorapi.com/scheme'
const numberColors = '&count=5'
const colorModeSelector = document.getElementById('color-mode-selector')

let colorValue = colorPicker.value.replace('#', '?hex=')
let mode = '&mode=monochrome'
let mainUrl = `${baseUrl}${colorValue}${mode}${numberColors}`
console.log(mainUrl + ' ' + colorValue + ' ' + colorPicker.value)

function updateVariables() {
    colorValue = colorPicker.value.replace('#', '?hex=')
    mode = `&mode=${colorModeSelector.value}`
    mainUrl = `${baseUrl}${colorValue}${mode}${numberColors}`
}

getScheme()

colorPicker.addEventListener('input', function(){
    updateVariables()
})

colorModeSelector.addEventListener('input', function(){
    updateVariables()
})

colorSubmit.addEventListener('click', function(){
    getScheme()
})

columnsWrapper.addEventListener('click', function(e) {
    console.log(e.target.innerText)
    navigator.clipboard.writeText(e.target.innerText)
    copiedColorMessage.classList.add('show')
    copiedColorMessage.textContent = `
        ${e.target.innerText} copied to clipboard
    `
    removeClipboardMessage()
})

function removeClipboardMessage() {
    setTimeout(() => {
        copiedColorMessage.classList.remove('show')
    }, 1500)
}

function getScheme() {
    fetch(mainUrl)
        .then(res => res.json())
        .then(data => {
            let getColumnHtml = ''
            for (let i=0; i < data.colors.length; i++) {
                let colorColumnHtml = `
                    <div class="color-scheme-app--colors--column">
                        <div class="color-scheme-app--colors--color" style="background-color: ${data.colors[i].hex.value}">
                            <span class="sr-only">${data.colors[i].hex.value}</span>
                        </div>
                        <div class="color-scheme-app--colors--color--footer">
                            <p>${data.colors[i].hex.value}</p>
                        </div>
                    </div>
                `
                getColumnHtml += colorColumnHtml
            }
            columnsWrapper.innerHTML = getColumnHtml
        })
}

