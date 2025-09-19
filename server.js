const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let users = {}; // Stockage IP -> nom utilisateur
let userCount = 1;

// Remplace par ton webhook Discord
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1418545814858371184/9YBR-zeBbwC2TDcs4FqUqtKC9WmOui2rtabpcNUFMSVZlg8_4fkqSHSvJVHwB84_JTcT';

app.post('/send', async (req, res) => {
    const ip = req.body.ip;
    const message = req.body.message;

    if(!ip || !message) return res.status(400).send('IP ou message manquant');

    let username;
    if(users[ip]) {
        username = users[ip]; // IP connue
    } else {
        username = `Utilisateur ${userCount++}`;
        users[ip] = username; // Nouvelle IP
    }

    try {
        await axios.post(WEBHOOK_URL, {
            username: username,
            content: message
        });
        res.send({ status: 'ok', username });
    } catch(err) {
        console.error(err);
        res.status(500).send('Erreur Discord');
    }
});

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
