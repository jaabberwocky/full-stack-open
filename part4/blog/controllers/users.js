const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
    logger.info(
        `POST ${request.baseUrl} || Creating user ${request.body.username}`
    );
    const body = request.body;

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