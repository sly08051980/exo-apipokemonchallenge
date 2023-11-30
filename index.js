const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

class CartePokemon {
  static cartesPokemon = new Map();

  constructor(nom, type, imageSrc) {
    this.id = CartePokemon.getNextId();
    this.nom = nom;
    this.type = type;
    this.imageSrc = imageSrc;

    if (CartePokemon.cartesPokemon.has(this.id)) {
      throw new Error('Une carte avec cet ID existe déjà.');
    }

    CartePokemon.cartesPokemon.set(this.id, this);
  }

  static getNextId() {
   
    console.log("test",CartePokemon.cartesPokemon.size);
    return CartePokemon.cartesPokemon.size + 1;
  }
}

const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Écoute http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/pokemonList', (req, res) => {
  res.sendFile(__dirname + '/pokemonList.json');
});

app.post('/cartes', (req, res) => {
  const nom = req.body.nom;
  const type = req.body.type;
  const image = req.body.imageSrc;

  let jsonData = [];
  fs.readFile('pokemonList.json', 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }

    jsonData = JSON.parse(data);

    const carte = new CartePokemon(nom, type, image);
    jsonData.push(carte);

    fs.writeFile('pokemonList.json', JSON.stringify(jsonData), function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('Fichier ajouté');
      res.sendFile(__dirname + '/public/index.html');
    });
  });
});
