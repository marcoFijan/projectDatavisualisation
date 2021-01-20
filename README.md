# Project Datavisualisation - Dashboard for Ring Ring

Student name: Marco Fijan

[Live Repo Link](https://marcofijan.github.io/projectDatavisualisation/)

[![afbeelding.png](https://i.postimg.cc/3N6kKNpg/afbeelding.png)](https://postimg.cc/GTFLKcX2)

## The Assignment

For the project Datavisualisation I have to create an interactive visualisation for a company. I have chosen for Ring Ring. Ring Ring is a company that specializes in bikingtrafic. Ring Ring wants to promote biking and does this with an app. People can use the app and track their route that they biked. I got the assignment to create an interactive visualisation that the stakeholders can use to visualize that data

## Contents

This project contains multiple datavisualisations made with mapbox, d3 and the geojson of Ring Ring. With the datavisualisations it is possible to create multiple insights. You can plot the routes on a map, and filter the bikeroutes per distance or timetype (hours or days).
Besides the datavisualisations, this project also contains a page where you can read and filter the feedback given by the app users.

## Concept

In this project I created a dashboard that stakeholders of Ring Ring can use to get insights from the data. The data can be viewed on a map with mapbox, in a stacked barchart made in d3, a piechart made in d3 and the feedback data can be viewed in a list.

### Sign in page

[![afbeelding.png](https://i.postimg.cc/7L9HXhBq/afbeelding.png)](https://postimg.cc/GBBnmLwf)

### Main page (Dashbaord)

[![afbeelding.png](https://i.postimg.cc/3N6kKNpg/afbeelding.png)](https://postimg.cc/GTFLKcX2)
On this page you will see a global view of everything. You get all the travelroutes of the bikes, a simple datavisualisation about the number of routes and distance and the first 2 new received feedback.

### For you page

[![afbeelding.png](https://i.postimg.cc/W45VgK33/afbeelding.png)](https://postimg.cc/2qLgf0nR)
The For You page is a specialized page unique for every stakeholder. Here you will find different datavisualisation in chartform. In this example lies the focus on the amount of bikeroutes, the distance and the time.

### Chart page

[![afbeelding.png](https://i.postimg.cc/K8F456Zr/afbeelding.png)](https://postimg.cc/LnCH90gn)
Here you will find a big chart where you can plot the travelroutes of the bikes. The travelroutes have been split into timestamps and are colorcoded. Blue equals night, yellow equals day and red equals rush-hour.

### Feedback page

[![afbeelding.png](https://i.postimg.cc/8CX5NsLt/afbeelding.png)](https://postimg.cc/wtJHkqfm)
The stakeholders of Ring Ring would also like to know what the feedback is of the bikers. That is what can be viewed on this page. You get a list of all the feedback. The feedback can be filtered per daytype and per feedbackscore. Besides viewing and filtering the feedback, can the feedback also be selected to send it to fellow stakeholders.

For this project I have made several concepts with my visual teammates, Jean Paul Oppelaar and Tugce Tansel. If you want to take a look at the concepts, you can do so by navigating to [my wiki](https://github.com/marcoFijan/projectDatavisualisation/wiki).

## Used data

For this project I used 2 geojsons from Ring Ring. The first one is a dataset wich contains different routes, distances, speed and time of Ring Ring app users in Amsterdam januari 2020. The datasets can be found [here](http://ringring.jorrr.nl/geojson-data-ringring.json)

The second geojson is a dataset that has been made with the data of the students during this project. I am using this dataset for the feedback since the other dataset doesn't have any feedback values. That dataset can be found [here](https://gist.githubusercontent.com/marcoFijan/25af63feca09e33fd0542718b3407d84/raw/d03523ba95352a2058a16f61fdd5d390d10ffa15/ringRingGeojson)

## Features

As of now, this projects has the following features:

- A static website with multiple datavisualisations
- A map that visualizes all the bikeroutes of the Ring Ring users in Amsterdam Januari 2020
- A detailed map where you can specify which routes will be visible per hour
- A stacked bar chart where you can view the amount of bikeroutes per timestamp
- The stacked bar chart can be filtered and viewed with multiple distances
- Given feedback from users can be viewed in a list and filtered per daytype and feedbackscore

## Getting started guide

### OPTION 1: Cloning git

To run this project for yourself, you can clone the github repo to your local machine. Just follow these steps

#### STEP 1: Create your local git repository

Navigate with your terminal to the desired folder where you want to clone this repo

```
cd "c:/foldername1/foldername2/destination"
```

**Optional** Use this command to create a new folder where you want to clone this repo.

```
mkdir "foldername"
```

**Optional** Don't forget to navigate to that folder with using the cd command

**Optional** If you desire to make changes to this project run this command to make that possible

```
git init
```

#### STEP 2: git clone

To clone this project and receive it on your locale machine, use this command

```
git clone https://github.com/marcoFijan/projectDatavisualisation.git
```

After this command your computer will download the files automaticly

#### STEP 3: Launching

Navigate to the folder where you cloned the git repository and launch the index.html

That's it. You are all set up!

### OPTION 2: Download manually

#### STEP 1: Download the files

Navigate to the code on Github and press the 'code' button. After pressing the 'code' button select 'download as zip'

#### STEP 2: Unzipping

After downloading the files navigate to a folder of your choice and unzip the files from the zip folder to that folder.

#### STEP 3: Launching

Navigate to that folder where you put the files and launch the index.html

That's it. You are all set up!

## Credits

### D3

- [The Muratorium](https://www.youtube.com/watch?v=bXN9anQN_kQ&t) for explaining stack in d3
- [Curan](https://www.youtube.com/watch?v=_8V5o2UHG0E&t=17327s&ab_channel=freeCodeCamp.org) for the amazing explanation of D3

### Design

- Jean Paul Oppelaar
- Tugce Tansel

### Other

- Janine from Ring Ring - for giving the assignment
- Suze Swarte for coaching the project
