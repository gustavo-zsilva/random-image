// variables
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image')
const button = document.querySelector('button')
const timerText = document.querySelector('main p')

let t = 0;

// events
button.onclick = () => updateImage()
imageContainer.onclick = () => updateAll()

// Methods
function getState() {
    const imageSource = document.querySelector('.image img').src

    const index = favorites.indexOf(imageSource)
    const existsInLocalStorage = index != -1

    return { imageSource, index, existsInLocalStorage }
}

function updateAll() {
    updateFavorites()
    updateClasses()
}

function updateFavorites() {
    const { existsInLocalStorage, index, imageSource } = getState()

    existsInLocalStorage
    ? favorites.splice(index, 1)
    : favorites.push(imageSource)
    
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses() {
    const { existsInLocalStorage } = getState()

    imageContainer.classList.remove('fav')

    if (existsInLocalStorage) {
        imageContainer.classList.add('fav')
    }
}

async function updateImage() {
    await getExternalImage()
    updateClasses()
}

async function getExternalImage() {
    const response = await fetch('https://source.unsplash.com/random')

    imageContainer
    .innerHTML = `<img src="${response.url}">`

    startTimer(response.status)
}

function startTimer(reqStatus) {
    if (t === 1) { return }
    else if (reqStatus !== 200) {
        timerText.innerHTML = 'Houve um erro na requisição.'
        return;
    }

    t = 1;
    let counter = 2;
    timerText.innerHTML = `Você poderá gerar uma nova imagem em ${counter + 1} segundos.`;

    let intervalID = setInterval(() => {
        timerText.innerHTML = `Você poderá gerar uma nova imagem em ${counter} segundos.`;
        counter--;
        if (counter < 0) {
            timerText.innerHTML = 'Você já pode gerar uma nova imagem.';
            clearInterval(intervalID);
            t = 0;
        }
    }, 1000)

    // reqStatus === 200 ?
    // timerText.innerHTML = `Você já pode requisitar outra imagem.`
    // : timerText.innerHTML = 'Houve um erro na requisição.'
}

getExternalImage();


