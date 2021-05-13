const functions = require('firebase-functions');
const express = require('express');

const users = express();
const rewards = express();
const cupons = express();

const userRouter = require('./controlers/usersController');
const rewardRouter = require('./controlers/rewardsController');
const cuponRouter = require('./controlers/cuponsController');

// ------------ USER ------------
users.use('/', userRouter);

// ------------ AWARD ------------
rewards.use('/', rewardRouter);

// ------------ CUPONS ------------
cupons.use('/', cuponRouter);

exports.users = functions.https.onRequest(users);
exports.rewards = functions.https.onRequest(rewards);
exports.cupons = functions.https.onRequest(cupons);