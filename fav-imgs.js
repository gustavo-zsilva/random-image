// variables
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const deleteAllBtn = document.querySelector('.delete-all-btn');
const main = document.querySelector('main');

const imagesDiv = document.querySelector('.images');

const modal = document.querySelector('.modal');
const modalExitImage = modal.querySelector('.exit-image');
const modalDeleteButton = modal.querySelector('button');

let imageSource;

// Events
deleteAllBtn.ondblclick = () => deleteAllImages();
modalExitImage.onclick = () => modalClassHandler();
modalDeleteButton.onclick = () => deleteImage();

// Methods
function renderImages() {
    favorites.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.addEventListener('click', viewImage);
        imagesDiv.appendChild(img);
    })
}

function viewImage(event) {
    imageSource = event.target.src;

    const modalImageTag = modal.querySelector('.modal-image');

    modalImageTag.src = imageSource;

    modalClassHandler();
}

function modalClassHandler() {
    if (modal.classList.contains('hide')) {
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        main.style.filter = 'blur(5px)';
        return;
    }

    modal.classList.add('hide');
    main.style.filter = '';
    document.body.style.overflow = '';
}

function deleteImage() {
    const index = favorites.indexOf(imageSource);
    favorites.splice(index, 1);
    refreshPage();
}

function deleteAllImages() {
    favorites = [];
    refreshPage();
}

function refreshPage() {
    saveToStorage();
    location.reload();
    checkPageEmpty();
}

function checkPageEmpty() {
    const sleepyImg = main.querySelector('.sleepy-img')

    const textArray = [
        'Por que você não favorita mais imagens acessando o link abaixo?',
        'Explore e favorite mais imagens acessando o link abaixo!',
        'Você pode acessar o link abaixo e favoritar imagens de seu gosto para popular esta área!'
    ]

    let randomIndex = Math.floor(Math.random() * textArray.length)

    if (imagesDiv.innerHTML.length === 0) {
        main.querySelector('p')
        .textContent = `Esta seção ainda está vazia. ${textArray[randomIndex]}`;

        sleepyImg.style.width = '50px';
    }
}

function saveToStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

renderImages();
checkPageEmpty();
