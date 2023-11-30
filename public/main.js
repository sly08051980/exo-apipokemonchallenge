console.log("script chargé");

fetch('/pokemonList')
  .then(response => {
    if (!response.ok) {
      throw new Error('pas d internet');
    }
    return response.json();
  })
  .then(jsonData => {
    // console.log(jsonData);
    // for (let index = 0; index < jsonData.length; index++) {
    //     const element = jsonData[index];
    //     console.log(element);
    //     let pokemonLi = document.createElement("li");
    //     let pokemonUl= document.createElement("ul");

    //     let pokemonTable= document.getElementById('pokemonList');

    //     pokemonTable.appendChild(pokemonUl);
    //     pokemonLi.innerHTML=element;
    //     pokemonUl.appendChild(pokemonLi);
        
    // }
    jsonData.forEach(element => {
let pokemonTr= document.createElement('tr');
let pokemonNomTd = document.createElement("td");
pokemonNomTd.innerHTML=element.nom;
pokemonTr.appendChild(pokemonNomTd);

let pokemonTypeTd=document.createElement("td");
pokemonTypeTd.innerHTML=element.type;
pokemonTr.appendChild(pokemonTypeTd);

let pokemonImageTd=document.createElement("td");
let pokemonImage = document.createElement('img');
pokemonImage.src=element.imageSrc;
pokemonImageTd.appendChild(pokemonImage);
pokemonTr.appendChild(pokemonImageTd);

let pokemonDelete = document.createElement("button");
pokemonDelete.innerHTML="Supprimer";
pokemonTr.appendChild(pokemonDelete);

let pokemonTable=document.getElementById('pokemonList');
pokemonTable.appendChild(pokemonTr)


        
    });

  })
  .catch(error => console.error('Fetch error:', error));