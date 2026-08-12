const totalCharacterText = document.querySelector('#totalCharacter')
const textArea = document.querySelector('#textArea')
const openButton = document.querySelector('#openButton')
const saveButton = document.querySelector('#saveButton')

let totalCharacter = 0

openButton.addEventListener('click', async () => {
    const response = await window.fileApi.openFile()

    totalCharacter = response.content.length

    if (!response.canceled) {
        textArea.value = response.content
        totalCharacterText.innerText = `Total Character: ${totalCharacter}`
    }
})

saveButton.addEventListener('click', async () => {
    const text = textArea.value
    const response = await window.fileApi.saveFile(text)

    if (response.success) {
        alert('File saved successfully')
    }
})