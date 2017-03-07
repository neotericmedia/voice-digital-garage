var Alexa = require('alexa-sdk');

// Data
var alexaQuotes = require('./data/alexaQuotes');
var giServices = require('./data/gi-services');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Digital Garage!', 'Ask me what floor we\'re on!');
  },

  'WhichFloor': function () {
    this.emit(':ask', 'We\'re on the 49th Floor of First Canadian Place!');
  },

  'DigtalGarage': function () {
    this.emit(':ask', 'Inspired by the panoramic, bird\'s eye view of our bustling, energetic city, we develop leading-edge digital solutions designed to bring new possibilities to the insurance industry. ');
  },

  'DigtalGarageNum': function () {
    this.emit(':ask', 'There are three Digital Garages, worldwide.');
  },

  'Hello': function () {
    this.emit(':tell', 'Hello there!');
  },

  'AlexaQuotesNum': function () {
    var alexaMeetupNum = alexaQuotes.length;
    //var city = alexaMeetupNum.city;
    this.emit(':ask', `You have ${alexaMeetupNum} claims with Aviva Insurance.`, 'How can i help?');
    //this.emit(':ask', `There is ${city} in Alexa quotes.`, 'How can i help?');
  },


  'AlexaQuotesCities': function () {
    for (var i = 0; i < alexaQuotes.length; i++) {
        cityMatch = alexaQuotes[i].city;
    }
    this.emit(':ask', `There is ${cityMatch} in Alexa quotes.`, 'How can i help?');
  },




  'AlexaPolicy': function () {
    for (var i = 0; i < alexaQuotes.length; i++) {
        //cityMatch = alexaQuotes[i].city;
        nameMatch = alexaQuotes[2].name;
        cityMatch = alexaQuotes[2].city;
        policyMatch = alexaQuotes[2].policy.number;
    }

    // if (policyMatch === 123) {
    //   this.emit(':ask', `Policy number is ${policyMatch} in Alexa quotes.`, 'How can i help?');
    // }

    // if (alexaQuotes[2]) {
    this.emit(':ask', `There is ${policyMatch} for ${nameMatch}. You are located in ${cityMatch}.`, 'How can i help?');
    // }

  },

  'AlexaPolicyInfo': function () {
    this.emit(':ask', `You are the driver on a 2015 Jeep Cherokee and a secondary driver, Laura Garrigan. `, 'How can i help?');
  },







  'gisPolicy': function () {
    //var giServicesNum = giServices.length;
    var quoteNumber = giServices[0].quoteNumber;
    var sessionUUID = giServices[0].sessionUUID;
    var selectedQuotePublicID = giServices[0].selectedQuotePublicID;

    var dateOfBirth = giServices[0].quoteDraft.accountHolder.dateOfBirth;

    this.emit(':ask', `There is ${dateOfBirth}, ${sessionUUID}, ${selectedQuotePublicID}.`, 'How can i help?');
    // this.emit(':ask', `There is ${quoteNumber} for ${sessionUUID}. You are located in ${selectedQuotePublicID}.`, 'How can i help?');
  },



  // 'AlexaAvivaCities': function () {
  //   var alexaMeetupNum = alexaQuotes.length;
  //   var city = alexaMeetupNum.city;
  //   this.emit(':ask', `Yes there is a Digtial Garage in ${city}.`, 'How can i help?');
  // }





  'AlexaAvivaCities': function () {
    // Get Slot Values
    var AvivaCitySlot = this.event.request.intent.slots.AvivaCities.value;

    // Get City
    var city;
    if (AvivaCitySlot) {
      city = AvivaCitySlot;
    } else {
      this.emit(':ask', 'Sorry, I didn\'t recognise that city name.', 'How can i help?');
    }

    // Check for City
    var cityMatch = '';
    for (var i = 0; i < alexaQuotes.length; i++) {
      if ( alexaQuotes[i].city.toLowerCase() === city.toLowerCase() ) {
        cityMatch = alexaQuotes[i].city;
      }
    }

    // Respond to User
    if (cityMatch !== '') {
      this.emit(':ask', `Yes! ${city} has an Digital Garage!`, 'How can i help?');
    } else {
      this.emit(':ask', `Sorry, looks like ${city} doesn't have a Digital Garage! - why don't you start one!`, 'How can i help?');
    }

  },




};
