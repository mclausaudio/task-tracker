# Task Tracker by Michael Claus

https://task-tracker-mc.herokuapp.com/

Front end: https://github.com/mclausaudio/task-tracker-frontend

Task Tracker is a full stack Application that is used for keeping that of your work sessions.  Gaining more insight into how I work was the main inspiration to build this application.  I noticed I have a tendancy to keep myself busy without actually being productive.  I find little tasks to complete and constantly jump around the project fixing things as I find them, which is great!  But isn't always the best use of my time.  I also really wanted to get experience working with REDUX.  I had never used it before and have always been curious as to what it is like to work with.  So, I created Task Tracker!

## Technology Used:
- NodeJS with ExpressJS
- MongoDB with Mongoose
- ReactJS
- Redux
- ChartJS
- Bootstrap 4

## How it works
After signing in, users can create an 'activity' that they wish to monitor.  These can be anything, such as 'Study Redux', 'Work on the back end of project x', or even 'read a book'.  Once created, the user can then add a 'session' for that activity.  A session is includes a timer that you start when you begin working.  If you need to step away or would like to take a quick break, you can pause the timer and continue it where it left off when you return.  Once finised, you can complete the session and add a couple notes about what you did.  The session will be displayed on that activities dashboard.  You can see each individual session with the amount of time worked and it's notes, as well as the overall amount of time you've spent working on that activity.  In addition, a graph is rendered to help visualize your work sessions.  The more you use Task Tracker, the more insight you will gain into your work habits.

# Code I am Proud of

## Higher Order Components.
I ran into an issue with protecting my react routes.  Through research, I discovered a concept called Higher Order Components or HOCs in React.  By created a function that we pass components into, we can write code once and provide that fuctionality to each component we pass in, rather than checking for auth on each component / route manually.

![HOC](https://github.com/mclausaudio/task-tracker-frontend/blob/master/HOC.png?raw=true)

## Redux Action Dispatching
Beginning this project, I had very little experience (even exposure!) to Redux, but I had been so curious as to what it does and why it's useful.  So I decided to roll up my sleeves and give it a shot.  It was difficult at first but I began getting the hang of it.  I used Redux Thunk to make async API calls.  I began realizing that for a project of this size, Redux is unnessary, but I had a great time building with it and learned so much.

![Action Dispatching](https://github.com/mclausaudio/task-tracker-frontend/blob/master/action%20dispatch.png?raw=true)

## API Calls
You may have noticed in the previous screen shot that I broke out my API call function into a seperate function.  Rather than writing it over and over again for each action dispatcher, I wrote a seperate reusable function for making the API calls.  Instead of return the API data, I return a new Promise.  This way, we can continue to chain .thens in the dispatcher.

![APICalls](https://github.com/mclausaudio/task-tracker-frontend/blob/master/apiCall.png?raw=true)

## Async / Await Functions
Before this project, I was unfamiliar with the new Async / Await functions.  But now they are a piece of cake and I like them so much better than a callback pattern or chaining .thens

![Async Await](https://github.com/mclausaudio/task-tracker-frontend/blob/master/async%20await.png?raw=true)

## Mongoose Hooks
To help keep my app scalable and my DB clean, I implemented Mongoose hooks to remove all associated session data when an activity is deleted.  This way, I only write the code one and every time .remove() is called, this hook fires up and runs.  It's much better than having to delete associated data within a route, because if the app grows and I delete data in multiple routes, I won't have to remember to find each route to write the delete code.

![Hooks](https://github.com/mclausaudio/task-tracker-frontend/blob/master/mongoose%20hooks.png?raw=true)



