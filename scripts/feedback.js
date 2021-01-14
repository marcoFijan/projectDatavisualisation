const fs = require("fs");
const localRingRingGeojson = require("../resources/ritten.geojson");

const feedbackCollection = [
  {
    feedbackScore: "positief",
    feedback: "Prima kunnen fietsen niet echt obstakels tegengekomen",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Veel voetgangers op de wegen maar die rij ik toch zo omver",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Vuilnisbakken moet geleegd worden maar fietsen ging prima",
  },
  {
    feedbackScore: "negatief",
    feedback: "Verschrikkelijk, overal vuilnis op de grond en wegwerkzaamheden",
  },
  {
    feedbackScore: "positief",
    feedback: "Mooi nieuw asfalt. Fietst prima",
  },
  {
    feedbackScore: "negatief",
    feedback: "Veel auto's die over de fietspaden rijden",
  },
  {
    feedbackScore: "negatief",
    feedback: "Erg druk op de weg",
  },
  {
    feedbackScore: "positief",
    feedback: "Lekker door kunnen fietsen. Stoplichten vielen mee",
  },
  {
    feedbackScore: "negatief",
    feedback: "Overal voetgangers op de paden. Ik kon niet doorfietsen zo",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Stoplichten konden iets beter ingesteld zijn",
  },
  {
    feedbackScore: "negatief",
    feedback: "Veel toeristen op de fietspaden",
  },
  {
    feedbackScore: "positief",
    feedback: "Lekker rustig op de wegen",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Al met al een prima ritje",
  },
  {
    feedbackScore: "negatief",
    feedback:
      "Auto's stonden in de file op de fietspaden. Fietsers konden er niet langs",
  },
  {
    feedbackScore: "positief",
    feedback: "Geen problemen gehad",
  },
  {
    feedbackScore: "positief",
    feedback: "Lekker rustig kunnen fietsen",
  },
  {
    feedbackScore: "negatief",
    feedback: "Bijna aangereden door taxi chauffeur terwijl ik groen had",
  },
  {
    feedbackScore: "negatief",
    feedback: "Smerige wegen en slecht wegdek",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Beetje druk maar fietsen ging prima",
  },
  {
    feedbackScore: "positief",
    feedback: "Prima kunnen fietsen, goed wegdek",
  },
  {
    feedbackScore: "negatief",
    feedback: "Heel erg lang bij de stoplichten moeten wachten",
  },
  {
    feedbackScore: "negatief",
    feedback: "Glad fietspad wanneer het regent",
  },
  {
    feedbackScore: "negatief",
    feedback: "Verschrikkelijk, overal vuilnis op de grond en wegwerkzaamheden",
  },
  {
    feedbackScore: "positief",
    feedback: "Mooi nieuw asfalt. Fietst prima",
  },
  {
    feedbackScore: "negatief",
    feedback: "Veel auto's die over de fietspaden rijden",
  },
  {
    feedbackScore: "negatief",
    feedback: "Erg druk op de weg",
  },
  {
    feedbackScore: "positief",
    feedback: "Lekker door kunnen fietsen. Stoplichten vielen mee",
  },
  {
    feedbackScore: "negatief",
    feedback: "Overal voetgangers op de paden. Ik kon niet doorfietsen zo",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Stoplichten konden iets beter ingesteld zijn",
  },
  {
    feedbackScore: "negatief",
    feedback: "Veel toeristen op de fietspaden",
  },
  {
    feedbackScore: "positief",
    feedback: "Lekker rustig op de wegen",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Al met al een prima ritje",
  },
  {
    feedbackScore: "negatief",
    feedback:
      "Auto's stonden in de file op de fietspaden. Fietsers konden er niet langs",
  },
  {
    feedbackScore: "positief",
    feedback: "Geen problemen gehad",
  },
  {
    feedbackScore: "positief",
    feedback: "Lekker rustig kunnen fietsen",
  },
  {
    feedbackScore: "negatief",
    feedback: "Bijna aangereden door taxi chauffeur terwijl ik groen had",
  },
  {
    feedbackScore: "negatief",
    feedback: "Smerige wegen en slecht wegdek",
  },
  {
    feedbackScore: "neutraal",
    feedback: "Beetje druk maar fietsen ging prima",
  },
  {
    feedbackScore: "positief",
    feedback: "Prima kunnen fietsen, goed wegdek",
  },
  {
    feedbackScore: "negatief",
    feedback: "Heel erg lang bij de stoplichten moeten wachten",
  },
];

let feedbackSection = document.querySelector(".feedbackSection");
let counter = 0;

const feedbackGeojson =
  "https://gist.githubusercontent.com/marcoFijan/25af63feca09e33fd0542718b3407d84/raw/d03523ba95352a2058a16f61fdd5d390d10ffa15/ringRingGeojson";
const proxyURL = "https://cors-anywhere.herokuapp.com/";

async function setupData() {
  //   const feedbackData = await getData();
  const feedbackData = fs.readFile(
    localRingRingGeojson,
    "utf8",
    function (err, data) {
      try {
        data = JSON.parse(data);
        feedbackFeatures = data.features;
        createFeedbackList(feedbackFeatures);
      } catch (e) {}
    }
  );
  //   feedbackFeatures = feedbackData.features;
  //   createFeedbackList(feedbackFeatures);
  //   console.log(feedbackFeatures);
}

async function getData() {
  console.log("trying...");
  //   const response = await fetch(proxyURL + feedbackGeojson);
  const response = await fetch(proxyURL + "../resources/ritten.geojson");
  const json = await response.json();
  return await json;
}

function createFeedbackList(feedbackFeatures) {
  feedbackFeatures.forEach((feedback) => {
    // Create needed elements
    const listItem = document.createElement("li");
    const feedbackDescription = document.createElement("p");
    const feedbackTime = document.createElement("p");
    const feedbackDate = document.createElement("p");
    const feedbackDistance = document.createElement("p");
    const profileIcon = document.createElement("img");
    const feedbackScoreImg = document.createElement("img");
    const saveCheckbox = document.createElement("input");
    const saveLabel = document.createElement("label");
    counter++;

    // Get dates
    const date = new Date(feedback.properties.start);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Editable dates
    let correctedHours = hours;
    let correctedMinutes = minutes;
    let correctedDay = day;
    let correctedMonth = month;

    // add 0 if hours is less then 9
    if (hours.toString().length < 2) {
      correctedHours = "0" + correctedHours;
    }

    // add 0 if minutes is less then 9
    if (minutes.toString().length < 2) {
      correctedMinutes = "0" + correctedMinutes;
    }

    // add 0 if daynumber is less then 9
    if (day.toString().length < 2) {
      correctedDay = "0" + correctedDay;
    }

    if (month.toString().length < 2) {
      correctedMonth = "0" + correctedMonth;
    }

    // set time and date in correct format
    const time = correctedHours + ":" + correctedMinutes;
    const calendarDate = correctedDay + "-" + correctedMonth + "-" + year;

    // set content for elements
    feedbackDescription.textContent = feedback.properties.feedback;
    feedbackTime.textContent = time;
    feedbackDate.textContent = calendarDate;
    feedbackDistance.textContent = feedback.properties.distance + "km";
    feedbackScoreImg.src = getFeedbackIcon(
      feedback.properties["feedback score"]
    );
    profileIcon.src = "./resources/avatar.svg";
    saveCheckbox.type = "checkbox";
    saveCheckbox.id = "saveFeedback" + counter;
    saveCheckbox.name = "saveFeedback" + counter;
    saveLabel.htmlFor = "saveFeedback" + counter;
    saveLabel.textContent = "Bewaren";

    feedbackTime.classList.add("feedbackTime");
    feedbackDistance.classList.add("feedbackDistance");

    listItem.appendChild(profileIcon);
    listItem.appendChild(feedbackTime);
    listItem.appendChild(feedbackDate);
    listItem.appendChild(feedbackDescription);
    listItem.appendChild(feedbackDistance);
    listItem.appendChild(feedbackScoreImg);
    listItem.appendChild(saveCheckbox);
    listItem.appendChild(saveLabel);

    feedbackSection.appendChild(listItem);

    // console.log(feedback.properties["feedback score"]);
  });
}

setupData();

// feedbackCollection.forEach((feedback) => {
//   const listItem = document.createElement("li");
//   const feedbackDescription = document.createElement("p");
//   const feedbackTime = document.createElement("p");
//   const feedbackDistance = document.createElement("p");
//   const profileIcon = document.createElement("img");
//   const feedbackScoreImg = document.createElement("img");
//   const saveCheckbox = document.createElement("input");
//   const saveLabel = document.createElement("label");
//   counter++;

//   feedbackDescription.textContent = feedback.feedback;
//   feedbackTime.textContent = "20:18";
//   feedbackDistance.textContent = "2.1km";
//   feedbackScoreImg.src = getFeedbackIcon(feedback);
//   profileIcon.src = "./resources/avatar.svg";
//   saveCheckbox.type = "checkbox";
//   saveCheckbox.id = "saveFeedback" + counter;
//   saveCheckbox.name = "saveFeedback" + counter;
//   saveLabel.htmlFor = "saveFeedback" + counter;
//   saveLabel.textContent = "Bewaren";

//   feedbackTime.classList.add("feedbackTime");
//   feedbackDistance.classList.add("feedbackDistance");

//   listItem.appendChild(profileIcon);
//   listItem.appendChild(feedbackTime);
//   listItem.appendChild(feedbackDescription);
//   listItem.appendChild(feedbackDistance);
//   listItem.appendChild(feedbackScoreImg);
//   listItem.appendChild(saveCheckbox);
//   listItem.appendChild(saveLabel);

//   feedbackSection.appendChild(listItem);
// });

function getFeedbackIcon(feedbackScore) {
  if (feedbackScore === 2) {
    return "./resources/score_neutral.svg";
  } else if (feedbackScore === 3) {
    return "./resources/score_bad.svg";
  } else if (feedbackScore === 1) {
    return "./resources/score_good.svg";
  } else {
    return "./resources/score_unknown.svg";
  }
}

function goBack() {
  window.history.back();
}
