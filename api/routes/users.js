import express from 'express';
import { getDb } from '../data/database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = express.Router();
const db = getDb();
dotenv.config();
const secret = process.env.SECRET;

// GET Users - hela listan
router.get('/', async (req, res) => {
  try {
    await db.read();
    const users = db.data.users;
    console.log('Visar user-lista', users);
    res.send(users);
  } catch (error) {
    console.log('Detta är vad vi får tillbaka i user-listan', error);
    res.status(500).send('Ett fel inträffade med att hämta användarna.');
  }
});

router.post('/login', async (req, res) => {
  await db.read();
  const users = db.data.users;
  console.log(req.body);
  const username = req.body.name;
  const userPassword = req.body.password;

  if (!req.body || !username || !userPassword) {
    res.status(400).send('Användaruppgifter ofullständiga.');
    return;
  }

  const foundName = users.find((user) => user.name === username);
  const foundPassword = users.find((user) => user.password === userPassword);

  if (!foundName || !foundPassword) {
    console.log('Felaktigt användarnamn eller lösenord');
    res.sendStatus(401);
    return;
  }

  const day = 3600 * 24;
  const payload = { userId: foundName.id };

  let token = jwt.sign(payload, secret, { expiresIn: day });
  console.log('signed JWT: ' + token);
  res.send({ id: foundName.id, token: token });
});

// Lägg till användare
router.post('/', async (req, res) => {
  await db.read();
  const users = db.data.users;
  const username = req.body.name;
  const userPassword = req.body.password;

  function generateId() {
    let id = Math.floor(Math.random() * 1000);
    while (users.find((user) => user.id === id)) {
      id = Math.floor(Math.random() * 1000);
    }
    return id;
  }

  let newUser = {
    id: generateId(),
    name: username,
    password: userPassword,
  };

  const existingUser = users.find((user) => user.name === newUser.name);

  if (existingUser) {
    res.status(409).send(
      'Konto redan registrerat. Prova med att logga in eller har glömt lösenord?'
    );
    return;
  }

  if (!req.body || !newUser.name || !newUser.password) {
    res.status(400).send('Användaruppgifter EJ Korrekt.');
    return;
  }

  users.push(newUser);
  db.write();
  res.sendStatus(200);
});

// Ta bort användare
router.delete('/:id', async (req, res) => {
  await db.read();

  const id = Number(req.params.id);
  const userToDelete = db.data.users.find((user) => user.id === id);

  if (!userToDelete) {
    return res.status(400).send('Kunde inte hitta användaren.');
  } else {
    db.data.users = db.data.users.filter((user) => user.id !== id);
    await db.write();
    console.log('Användare borttagen');
    return res.sendStatus(200);
  }
});

export default router;
