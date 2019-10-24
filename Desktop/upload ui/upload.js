const addFileButton = document.querySelector('#addfileinput')
const uploadButton = document.getElementById('uploadbutton')
const uploadForm = document.getElementById('fileuploadform')

//adding listener while someone adds a file
addFileButton.addEventListener('change', verifyFile)
//add event to form submit
uploadForm.addEventListener('submit', sendFile)

function verifyFile(e) {
    let allowedFiles = ['zip', 'rar', '7zip']
    let filePath = e.target.value

    let filePathSplitted = filePath.split('.')
    let fileExtension = filePathSplitted[filePathSplitted.length - 1].toLowerCase()

    let fileSize = e.target.files[0].size

    let warningPara = document.getElementById('warning')
    let fileNamePara = document.getElementById('filename')

    fileNamePara.innerHTML = `<i>${e.target.files[0].name}</i>`

    //verify the file extension is zip
    if (allowedFiles.indexOf(fileExtension) == -1) {
        e.target.value = ""
        warningPara.innerHTML = 'Not a Zip File <br> Only zip files allowed <i>eg:.zip,.rar,.7zip</i>'
        fileNamePara.style.color = 'red'
        uploadButton.disabled = true
        uploadButton.style.opacity = 0.3
    } else {
        warningPara.innerText = 'File added'
        warningPara.style.color = 'blue'
        fileNamePara.style.color = 'green'
        uploadButton.disabled = false
        uploadButton.style.opacity = 1
    }
}

function sendFile(e) {
    e.preventDefault()
    let zipFile = new FormData(e.target).get('zipfile')
    let data = {
        zipfile: zipFile
    }
    fetch('https://ajin.netlify.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        //on sucess
    }).catch(err => {
        //on error
        console.log('error ' + err)
    })
}