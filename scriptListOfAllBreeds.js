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
async function getBreedImage(breedName) {
    try {
        const breedImage = await axios.get(`https://dog.ceo/api/breed/${breedName.slice(1,-1)}/images/random`);
        return breedImage.data.message;
    } catch (err) {
        console.error(err);
    }
}

// main function for printing list of dogs 
async function listDogs() {
    const listDogs = await getListDogs();
    console.log(listDogs);

    const breeds = Object.keys(listDogs)
    console.log(breeds);

    const promises = breeds.map((name) => {
        let breed = getBreedImage(JSON.stringify(name)).then((image) => {
            return {name, image};
        });
        return breed;
    });

    const breedsWithImages = await Promise.all(promises);
    console.log(breedsWithImages);

    for (let breed of breedsWithImages) {
        childToContainer(toFigureContainer(breed));
    }
}

// returns element inside <figure><figure/>
const toFigureContainer = (element) => {
    const figureContainer = document.createElement(`figure`);
    figureContainer.appendChild(toImgContainer(element.image));
    figureContainer.appendChild(toFigCaptureContainer(element.name));
    return figureContainer;
}

// returns image inside <img/> with class.
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

// Adds a child to the output space
const childToContainer = child => {
    DOM.outputListOfAllBreeds.appendChild(child);
}

listDogs();
DOM.buttonRefresh.onclick = () => {
    listDogs();
}