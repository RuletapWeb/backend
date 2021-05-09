const functions = require('firebase-functions');
const express = require('express');

const { getUsers, addUser } = require("./handlers/users");
const { getReward, createReward } = require("./handlers/rewards");

// const email = require('./handlers/email');

const users = express();
const rewards = express();


// ------------ USER ------------
users.get('/', getUsers);
users.post('/', addUser);

// ------------ AWARD ------------
rewards.get('/', getReward);
rewards.post('/', createReward);


exports.users = functions.https.onRequest(users);
exports.rewards = functions.https.onRequest(rewards);