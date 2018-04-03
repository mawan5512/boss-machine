const express = require('express');
const apiRouter = express.Router();
const { createMeeting,
        getAllFromDatabase,
        getFromDatabaseById,
        addToDatabase,
        updateInstanceInDatabase,
        deleteFromDatabasebyId,
        deleteAllFromDatabase,
        getWorkById,
      } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

apiRouter.get('/minions', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if(minion){
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const minion = updateInstanceInDatabase('minions', req.body);
    if(minion){
        res.send(minion);
    }
    else {
        res.status(404).send();
    }
});

apiRouter.post('/minions', (req, res, next) => {
    const minion = req.body;
    res.status(201).send(addToDatabase('minions', minion));
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minion = deleteFromDatabasebyId('minions', req.params.minionId);
    if(minion){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

apiRouter.get('/ideas', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if(idea){
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const idea = updateInstanceInDatabase('ideas', req.body);
    if(idea){
        res.send(idea);
    }
    else {
        res.status(404).send();
    }
});

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const idea = req.body;
    res.status(201).send(addToDatabase('ideas', idea));
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const idea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(idea){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

apiRouter.get('/meetings', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

apiRouter.post('/meetings', (req, res, next) => {
    const meeting = createMeeting();
    res.status(201).send(addToDatabase('meetings', meeting));
});

apiRouter.delete('/meetings', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
});

module.exports = apiRouter;
