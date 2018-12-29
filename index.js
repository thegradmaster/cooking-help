/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.812a98b0-cf3f-4f2a-9c21-37bb7e7c8c7b";

const SKILL_NAME = 'cookinghelp';
const GET_FACT_MESSAGE = "Here's your cooking tip: ";
const HELP_MESSAGE = 'You can say give me some cooking tips, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const YES_MESSAGE = 'Do you want more?'

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'AAfraid of ever cooking rice again after too many failed attempts to get something that even resembled the rice everyone else manages to serve? So was I until I tried this cool cooking tip. Perfect rice every time. Unbelievable but true. Simply use a kitchen towel to help evenly distribute the moisture and your rice will never turn out in sticky globs or become a dried out inedible failure. You can really quit serving pasta and start serving rice again!',
    'Some of the best ideas are simple, and this holds true when it comes to cooking, too.If you are a food snob like me and a purist when it comes to the kitchen, you will not find yourself ever using cooking wine in your recipes. Cooking wine is far too salty, and generally speaking just an all around a bad idea. However, buying a whole bottle of wine only to use a small portion makes no sense, either.This kitchen tip is so simple I am embarrassed not to have thought of it myself. Have left over wine you purchased for cooking? Freeze it so you can use the individual cubes in sauces, stews and marinades.',
    'M-m-m-m, bacon. If you love bacon, but dread the amount of time it takes to cook, the mess it makes and the difficulty in getting it evenly cooked, you will absolutely love this cooking method for bacon.Just like grandma used to make but about 100 times easier. This bacon is flatter and prettier, too, if you are into that sort of thing. Although bacon is just never going to be good for you, I like to believe this method is a lit a tiny bit healthier than traditional pan fried version.',
    'Peel tomatoes with ease! Cut an X in the top, and then simmer in a pot of hot water for 15 to 30 seconds. Cool down and the skin will fall right off.',
    'Get comfortable! Wear comfy clothes and an apron when you work in the kitchen and you won’t have to worry about getting dirty',
    'nvest in a baking scale. Scales are not only an accurate way to measure your cooking ingredients, but they streamline the entire process',
    'When poaching an egg, add a teaspoon of white vinegar to simmering water to help keep the yolk from breaking',
    'For a great hardboiled egg every time, bring your pot to a boil and then turn off the stove. Let your eggs sit in the heated pot for 12 minutes and then transfer to cold water.',
    'TCrack eggs on a paper towel on the counter —no shells and easy cleanup!',
    'Substitute half a lemon and half an orange as a replacement for a Meyer lemon.',
    'Hold a knife properly: pinch the blade instead of gripping the handle',
    'Remove tough stems on leafy greens by pinching the stem and gently pulling off the leaves with your other hand',
    'f your recipe calls for buttermilk, you can use regular milk with lemon juice',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'AMAZON.YesIntent': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact + YES_MESSAGE;
        const more = YES_MESSAGE;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput).listen(more);
        this.emit(':responseReady');
    },
    
    'AMAZON.NoIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
     const speech_output = 'Goodbye and take care!'
     this.emit(':tell', speech_output);
},
    
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

