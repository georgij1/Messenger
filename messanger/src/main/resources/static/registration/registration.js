document.querySelector('#ava_profile').addEventListener('change', () => {
    for (let File of document.querySelector('#ava_profile').files) {
        let name_file = File.name
        let type_file = File.type
        let list_file = document.querySelector('.icon_profile')

        console.log(File)

        console.log(File.lastModifiedDate)
        console.log(File.name)
        console.log(File.size)
        console.log(File.type)

        console.log(name_file)
        console.log(type_file)

        list_file.innerHTML=`
            <div class="name_file">Имя файла - ${File.lastModifiedDate}</div>
            <div class="name_file">Имя файла - ${File.name}</div>
            <div class="name_file">Имя файла - ${File.size}</div>
            <div class="name_file">Имя файла - ${File.type}</div>
            <div class="cancel_file">Отмена</div>
        `

        console.log(document.querySelector('input').value)

        document.querySelector('.cancel_file').addEventListener('click', () => {
            for (let NameFiles of document.querySelectorAll('.name_file')) {
                list_file.removeChild(NameFiles)
            }

            File.value=''

            console.log(document.querySelector('input').files)

            list_file.removeChild(document.querySelector('.cancel_file'))
        })
    }
})

document.querySelector('.BtnShowGenerator').addEventListener('click', () => {
    document.querySelector('.result-container').classList.add('block')
    document.querySelector('.generate-btn').classList.add('block')
    document.querySelector('.BtnShowGenerator').classList.add('none')
    document.querySelector('.BtnCloseGenerator').classList.add('block')

    for (let itter of document.querySelectorAll('.input-group')) {
        itter.classList.add('block')
    }
})
document.querySelector('.BtnCloseGenerator').addEventListener('click', () => {
    document.querySelector('.result-container').classList.remove('block')
    document.querySelector('.generate-btn').classList.remove('block')
    document.querySelector('.BtnShowGenerator').classList.remove('none')
    document.querySelector('.BtnCloseGenerator').classList.remove('block')

    for (let itter of document.querySelectorAll('.input-group')) {
        itter.classList.remove('block')
    }
})

const result = document.querySelector('#result');
const passLength = document.querySelector('#length');
const passLengthResult = document.querySelector('#length-result')
const includeNumbers = document.querySelector('#numbers');
const includeSymbols = document.querySelector('#symbols');
const generateBtn = document.querySelector('#generate');
const copyPass = document.querySelector('#copy');

document.addEventListener('DOMContentLoaded', () => {
    passLength.value = 20
    passLengthResult.innerText = 20

    let onLoadLength = passLength.value
    let onLoadNumbers = includeNumbers.checked
    let onLoadSymbols = includeSymbols.checked

    result.value = generatePassword(onLoadNumbers, onLoadSymbols, onLoadLength)
})

passLength.addEventListener('change', (event) => {
    passLengthResult.innerText  = event.target.value
})

copyPass.addEventListener('click', () => {
    copy(result.value)
})

generateBtn.addEventListener('click', () => {
    const length = passLength.value
    const numbers = includeNumbers.checked
    const symbols = includeSymbols.checked

    result.value = generatePassword(numbers, symbols, length)
})

function generatePassword(number, symbol, length) {
    let generatedPassword = '';
    let variationsCount = [number, symbol].length

    for(let i = 0; i < length; i += variationsCount) {
        if (number) {
            generatedPassword += getRandomNumber()
        }

        if (symbol) {
            generatedPassword += getRandomSymbol()
        }

        generatedPassword += getRandomLower()
    }

    return generatedPassword.slice(0, length);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function copy(text) {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    document.querySelector('form').classList.add('none')
    document.querySelector('.GeneratePasswordContent').classList.add('none')
    document.querySelector('.WindowCopiedSuccess').classList.add('block')

    setTimeout(() => {
        document.querySelector('.GeneratePasswordContent').classList.remove('none')
        document.querySelector('form').classList.remove('none')
        document.querySelector('.WindowCopiedSuccess').classList.remove('block')
    }, 5000)
    return result;
}

document.querySelector('.login').addEventListener('input', (event) => {
    console.log(event.currentTarget.value)

    if (event.currentTarget.value.length > 0) {
        document.querySelector('.username').textContent = event.currentTarget.value
    }

    else {
        document.querySelector('.username').textContent = 'Имя'
    }
})