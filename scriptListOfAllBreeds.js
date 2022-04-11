"use strict"

import * as DOM from "./domListOfAllBreeds.js"

// gets list of dogs
async function getListDogs() {
    try {
        const listDogs = await axios.get(`https://dog.ceo/api/breeds/list/all`);
        console.log(listDogs);
        return listDogs.data.message;
    } catch (err) {
        console.error(err);
    }
    
}

// gets an image link of a specific breed
async function getRandomBreedImage(breedName) {
    try {
        const breedImage = await axios.get(`https://dog.ceo/api/breed/${breedName.slice(1,-1)}/images/random`);
        return breedImage.data.message;
    } catch (err) {
        console.error(err);
    }
}

// returns image inside <img/> with attributes
const toImgContainer = image => {
    const imageContainer = document.createElement(`img`);
    imageContainer.src = image;
    imageContainer.classList.add("dogBox");
    imageContainer.height = 250;
    imageContainer.width = 250;
    return imageContainer;
}

// returns element inside <figcaption><figcaption/>
const toFigCaptureContainer = element => {
    const figCaptionContainer = document.createElement(`figcaption`);
    figCaptionContainer.textContent = `${element}`;
    return figCaptionContainer;
}

// returns element inside <figure><figure/> that has a .name and .image
const toFigureContainer = (element) => {
    const figureContainer = document.createElement(`figure`);
    figureContainer.appendChild(toImgContainer(element.image));
    figureContainer.appendChild(toFigCaptureContainer(element.name));
    return figureContainer;
}

// Adds a child to the output space
const childToOutput = child => {
    DOM.outputListOfAllBreeds.appendChild(child);
}

// main function for printing list of dogs 
async function listDogs() {
    // gets list of breeds stored as keys
    const listDogs = await getListDogs();

    // turns keys to Array
    const breeds = Object.keys(listDogs)

    // gets random breed images for each breed
    const promises = breeds.map((name) => {
        let breedWithImage = getRandomBreedImage(JSON.stringify(name)).then((image) => {
            return {name, image};
        });
        return breedWithImage;
    });

    // actions the promises
    const breedsWithImages = await Promise.all(promises);

    // adds the breed+img to output
    for (let breedWithImage of breedsWithImages) {
        childToOutput(toFigureContainer(breedWithImage));
    }
}

// on pageload
listDogs();

// interaction  
DOM.buttonRefresh.onclick = () => listDogs();