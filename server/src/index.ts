import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';

const PORT = 19001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//if database.json does not exist, create it with an empty array
if (!readFileSync('database.json', 'utf8')) {
    writeFileSync('database.json', JSON.stringify([]));
}

interface User {
    gender: 'male' | 'female',
    name: {
        title: string,
        first: string,
        last: string
    },
    location: {
        street: {
            number: number,
            name: string
        },
        city: string,
        state: string,
        country: string,
        postcode: number,
        coordinates: {
            latitude: string,
            longitude: string
        },
        timezone: {
            offset: string,
            description: string
        },
        login: {
            uuid: string,
            username: string,
            password: string,
            salt: string,
            md5: string,
            sha1: string,
            sha256: string
        },
        dob: {
            date: string,
            age: number
        },
        registered: {
            date: string,
            age: number
        },
        phone: string,
        cell: string,
        id: {
            name: string,
            value: string
        },
        picture: {
            large: string,
            medium: string,
            thumbnail: string
        },
        nat: string
    }
}

app.get('/user', async (req, res) => {
    console.log("GET /user");

    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (offset < 0 || limit < 0) {
        res.status(400).send({ error: 'offset and limit must be positive' });
        return;
    }

    if (limit > 20) {
        res.status(400).send({ error: 'limit must be less than 20' });
        return;
    }

    //get users form database.json
    const database = readFileSync('database.json', 'utf8');
    const users: User[] = JSON.parse(database);

    const tempUsers = await fetch(`https://randomuser.me/api/?results=${limit}&seed=abc&nat=us`).then(res => res.json()).then(res => res.results);

    res.send(tempUsers);
});

app.post('/user', async (req, res) => {
    console.log("POST /user");
    const user = req.body as User;

    if (!user) {
        res.status(400).send({ error: 'user is required' });
        return;
    }

    const database = readFileSync('database.json', 'utf8');
    const users: User[] = JSON.parse(database);
    users.push(user);
    writeFileSync('database.json', JSON.stringify(users));

    res.send(user);
});


app.get('*', async (req, res) => {
    console.log("GET *");
    res.status(404).send({ error: 'not found' });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
