'use strict'

import * as DOM from './domListOfAllBreeds.js'

const listDogs = async () => {
    await axios.get(`https://dog.ceo/api/breeds/list/all`)
    .then(response => {
        for (let breed of Object.keys(response.data.message)) {
            console.log(breed);
        childToContainer(breedToFigure(JSON.stringify(breed)));
        }
      }).catch((err) => {
        console.log(err);
      });
}

const nameToImage = async (breedName) => {
    await axios.get(`https://dog.ceo/api/breed/${breedName.slice(1,-1)}/images/random`)
        .then(response => {
        console.log(response.data.message);
        return response.data.message;
        }).catch((err) => {
        console.log(err);
    });
}

const breedToFigure = (breed) => {
    const figureContainer = document.createElement(`figure`);
    figureContainer.appendChild(imageToContainer(nameToImage(breed)));
    figureContainer.appendChild(breedNameToContainer(breed));
    return figureContainer;
}

const imageToContainer = image => {
    console.log(image);
    const imageContainer = document.createElement(`img`);
    imageContainer.width = "128";
    imageContainer.height= "128";
    imageContainer.src = image;
    return imageContainer;
}

const breedNameToContainer = breed => {
    const breedNameContainer = document.createElement(`figcaption`);
    breedNameContainer.innerHTML = `${breed}`;
    return breedNameContainer;
}

const childToContainer = child => {
    DOM.outputListOfAllBreeds.appendChild(child);
}

listDogs();