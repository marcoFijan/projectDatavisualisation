// const fs = require("fs");
// const localRingRingGeojson = require("../resources/ritten.geojson");

let feedbackSection = document.querySelector(".feedbackSection");
// let filteredfeatures;
let scoreValue;
let dayTypeValue;
let counter = 0;

const feedbackGeojson =
  "https://gist.githubusercontent.com/marcoFijan/25af63feca09e33fd0542718b3407d84/raw/d03523ba95352a2058a16f61fdd5d390d10ffa15/ringRingGeojson";
const proxyURL = "https://cors-anywhere.herokuapp.com/";

async function setupData() {
  const feedbackData = await getData();
  feedbackFeatures = feedbackData.features;
  createFeedbackList(feedbackFeatures);
  filteredFeedbackFeatures = feedbackFeatures;
  filterScore(filteredFeedbackFeatures);
  filterDaytype(filteredFeedbackFeatures);
  console.log(filteredFeedbackFeatures);
}

async function getData() {
  console.log("trying...");
  const response = await fetch(proxyURL + feedbackGeojson);
  //   const response = await fetch(proxyURL + "../resources/ritten.geojson");
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
    let correctedMonth = month + 1;

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

    console.log(month);
    if (correctedMonth.toString().length < 2) {
      correctedMonth = "0" + correctedMonth;
    }

    // set time and date in correct format
    const time = correctedHours + ":" + correctedMinutes;
    const calendarDate = correctedDay + "-" + correctedMonth + "-" + year;

    // set dummy Text when feedback is empty
    let feedbackDesc = feedback.properties.feedback;
    if (!feedbackDesc) {
      feedbackDesc =
        "Geen feedback, dummy feedback - Al met al een prima ritje. Stoplichten konden iets beter afgesteld staan voor fietsers";
    }

    // set content for elements
    feedbackDescription.textContent = feedbackDesc;
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
  });
}

setupData();

function filterScore(feedbackFeatures) {
  let filteredFeedback;

  document.querySelectorAll('input[name="filterScore"]').forEach((input) => {
    input.addEventListener("click", function (e) {
      const value = e.target.value;
      scoreValue = value;
      console.log(feedbackFeatures);
      if (value === "good") {
        filteredFeedback = feedbackFeatures.filter((feedback) => {
          return feedback.properties["feedback score"] === 3;
        });
      } else if (value === "bad") {
        filteredFeedback = feedbackFeatures.filter((feedback) => {
          return feedback.properties["feedback score"] === 1;
        });
      } else if (value === "neutral") {
        filteredFeedback = feedbackFeatures.filter((feedback) => {
          return feedback.properties["feedback score"] === 2;
        });
      } else {
        filteredFeedback = feedbackFeatures;
      }
      removeChilds(feedbackSection);
      const filteredComplete = checkFilterDaytype(filteredFeedback);
      createFeedbackList(filteredComplete);
    });
  });
}

function filterDaytype(feedbackFeatures) {
  let filteredDaytype;

  document.querySelectorAll('input[name="filterDaytype"]').forEach((input) => {
    input.addEventListener("click", function (e) {
      const value = e.target.value;
      dayTypeValue = value;
      if (value === "weekend") {
        filteredDaytype = feedbackFeatures.filter((feedback) => {
          const day = new Date(feedback.properties.start).getDay();
          return day === 6 || day === 0;
        });
      } else if (value === "byTheWeek") {
        filteredDaytype = feedbackFeatures.filter((feedback) => {
          const day = new Date(feedback.properties.start).getDay();
          return day < 6;
        });
      } else {
        filteredDaytype = feedbackFeatures;
      }
      removeChilds(feedbackSection);
      const filteredComplete = checkFilterScore(filteredDaytype);
      createFeedbackList(filteredComplete);
    });
  });
}

function checkFilterScore(feedbackFeatures) {
  let filteredFeedback;
  console.log("checking score");

  if (scoreValue === "good") {
    filteredFeedback = feedbackFeatures.filter((feedback) => {
      return feedback.properties["feedback score"] === 3;
    });
  } else if (scoreValue === "bad") {
    filteredFeedback = feedbackFeatures.filter((feedback) => {
      return feedback.properties["feedback score"] === 1;
    });
  } else if (scoreValue === "neutral") {
    filteredFeedback = feedbackFeatures.filter((feedback) => {
      return feedback.properties["feedback score"] === 2;
    });
  } else {
    filteredFeedback = feedbackFeatures;
  }
  return filteredFeedback;
}

function checkFilterDaytype(feedbackFeatures) {
  let filteredDaytype;

  console.log("checking daytype");

  if (dayTypeValue === "weekend") {
    filteredDaytype = feedbackFeatures.filter((feedback) => {
      const day = new Date(feedback.properties.start).getDay();
      return day === 6 || day === 0;
    });
  } else if (dayTypeValue === "byTheWeek") {
    filteredDaytype = feedbackFeatures.filter((feedback) => {
      const day = new Date(feedback.properties.start).getDay();
      return day < 6;
    });
  } else {
    filteredDaytype = feedbackFeatures;
  }

  return filteredDaytype;
}

function removeChilds(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function getFeedbackIcon(feedbackScore) {
  if (feedbackScore === 2) {
    return "./resources/score_neutral.svg";
  } else if (feedbackScore === 1) {
    return "./resources/score_bad.svg";
  } else if (feedbackScore === 3) {
    return "./resources/score_good.svg";
  } else {
    return "./resources/score_unknown.svg";
  }
}

function goBack() {
  window.history.back();
}
