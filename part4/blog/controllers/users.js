const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
    logger.info(`GET ${request.baseUrl}`);
    const result = await User.find({}).populate('blogs').exec();
    response.json(result);
});

usersRouter.post('/', async (request, response) => {
    logger.info(
        `POST ${request.baseUrl} || Creating user {${JSON.stringify({
            ...request.body,
            password: 'obsfucated', // dont log passwords
        })}}`
    );
    const body = request.body;

    if (!body.username || !body.password) {
        logger.error('Bad request');
        return response.status(400).send({
            error: 'missing username or password',
        });
    } else if (body.username.length < 3 || body.password.length < 3) {
        return response.status(400).send({
            error: 'username or password length less than 3',
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    });

    const savedUser = await newUser.save();
    response.json(savedUser);
});

module.exports = usersRouter;
