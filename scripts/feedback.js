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

feedbackCollection.forEach((feedback) => {
  const listItem = document.createElement("li");
  const feedbackDescription = document.createElement("p");
  const feedbackTime = document.createElement("p");
  const feedbackDistance = document.createElement("p");
  const profileIcon = document.createElement("img");
  const feedbackScoreImg = document.createElement("img");
  const saveCheckbox = document.createElement("input");
  const saveLabel = document.createElement("label");
  counter++;

  feedbackDescription.textContent = feedback.feedback;
  feedbackTime.textContent = "20:18";
  feedbackDistance.textContent = "2.1km";
  feedbackScoreImg.src = getFeedbackIcon(feedback);
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
  listItem.appendChild(feedbackDescription);
  listItem.appendChild(feedbackDistance);
  listItem.appendChild(feedbackScoreImg);
  listItem.appendChild(saveCheckbox);
  listItem.appendChild(saveLabel);

  feedbackSection.appendChild(listItem);
});

function getFeedbackIcon(feedback) {
  if (feedback.feedbackScore === "neutraal") {
    return "./resources/score_neutral.svg";
  } else if (feedback.feedbackScore === "negatief") {
    return "./resources/score_bad.svg";
  } else {
    return "./resources/score_good.svg";
  }
}

function goBack() {
  window.history.back();
}
