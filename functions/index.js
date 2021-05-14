const functions = require('firebase-functions');
const express = require('express');

const users = express();
const rewards = express();
const promos = express();

const userRouter = require('./controlers/usersController');
const rewardRouter = require('./controlers/rewardsController');
const promoRouter = require('./controlers/promosController');

// ------------ USER ------------
users.use('/', userRouter);

// ------------ AWARD ------------
rewards.use('/', rewardRouter);

// ------------ promos ------------
promos.use('/', promoRouter);

exports.users = functions.https.onRequest(users);
exports.rewards = functions.https.onRequest(rewards);
exports.promos = functions.https.onRequest(promos);