const totalCharacterText = document.querySelector('#totalCharacter')
const textArea = document.querySelector('#textArea')
const openButton = document.querySelector('#openButton')
const saveButton = document.querySelector('#saveButton')

openButton.addEventListener('click', async () => {
    const response = await window.fileApi.openFile()

    if (!response.canceled) {
        textArea.value = response.content
        totalCharacterText.innerText = `Total Character: ${response.content.length}`
    }
})