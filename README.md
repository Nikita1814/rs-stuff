# nikita1814-JSFE2021Q3
Here is a collection of the most notable projects done as part of RS (https://rs.school/) over the period of July-December 2022 . For most of them only a collection of data to be displayed, general layouts, and some recommendations on library use were provided to me (in addition to a list of required features). all of them are done in vanilla JS, the last one (Christmas-app) was done using Webpack and TS

1. Museum 
* Deploy : https://louvre-website-lookalike.netlify.app/
* It was required of me to do it precisely according to a provided layout (pixel-perfect), so I didn't have much of an opportunity to make it adaptive and css is a bit of a mess. Notable features are:
a) a custom slider
b) client-side validation enabled form fields in the ticket form (its is displayed at the click on the Buy button in the according section)
c) the before/after picture slider in the Picture Explore section(excuse the nonsensical naming )
d) usage of the mapbox api (the map at the very bottom) https://www.mapbox.com/

2. Momentum
* Deploy: https://momentum-app-lookalike.netlify.app/
* This was an attempt at recreating the momentum browser extension
* Notable features: 
a) time tracking 
b) an ability for the user to change the app language(translated manually)
c) a weather forecast widget made with the use of the OpenWeather api https://openweathermap.org/api allowing for the user to chose a city to be displayed
d) the ability for the user to change the source of background images (Flickr Unsplash or a separate collection on github), said background images also vary depending on the time of day
e) a custom audio player
f) everything is stored in local storage
g) some operations are done asynchronously (data loaded from APIs)

3.Art-quiz
* Deploy(https://art-quiz-nikita1814.netlify.app/)
* The objective was to create an art-quiz app. at this point I had not yet experimented with webpack, but I have tried to organize the code in modules
* Notable features:
a)The user is able to choose weather to be quizzed on the artists(choosing a correlating painting out of 4 answers) or vice-versa. 
b) it is SPA 
c) Settings module provides the ability for the user to set up a timer for the question answers as well as to enable/disable the timer
d) questions are organized in separate collections progress is tracked and stored for each one
e) the markup is adaptive (all the way down to 360px in width)

4. Christms-app
* Deploy(https://christmass-app-nikita1814.netlify.app/)
* The objective was to create a mini-game app imitating the process of decorating a fir tree
* Notable features:
a) Users have the ability to select decorations from a collection 
b) said collection can be filtered by name, size, color, shape, year of acquisition and amount 
c) having selected several toys the users are given the opportunity to place them on a fir tree (through the use of drag-and-drop)
d) the users are also given an opportunity to select a fir-tree, a background and a color of CSS generated Christmas lights from several provided options
e) it is a SPA
c) My first attempt at using webpack and Typescript

