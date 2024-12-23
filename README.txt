Geography Trivia Game

Author: Sophie Zhuang
Email: sophie.x.zhuang@vanderbilt.edu

### Program Information:
This project is a React-based trivia game that tests users' geography knowledge. 
The game includes multiple difficulty levels (easy, medium, hard) and features 
a timer, a scoring system, and the option to use hints to eliminate wrong answers. 
It is designed to run in the browser with responsive styles for different screen sizes. 
The user earns 100 points if they get the question right within one second, and the amount
of points they earn decrements by 5 for every additional second they take.

In the frontend, React is used to create a dynamic and modular interface. The React 
component structure allows for easy management of different parts of the application, 
such as the homepage, game screen, and high score display. I also used useEffect to manage 
the countdown timer that resets with each new question. This 
reactive UI ensures that the game responds smoothly to user interactions, like 
selecting answers or using hints. Additionally, I used CSS to enhance the 
aesthetics and usability of the game, ensuring a pleasant user experience.

On the backend, the application is powered by Node.js and Express. Node.js allows the
server to handle incoming requests from the frontend efficiently, while Express 
allowed me to define routes. The backend is responsible for serving trivia questions
 and processing the results of each game session.

I also used MongoDB to store trivia questions and high scores. I used Mongoose to fetch questions of a 
specific difficulty level and to save user scores at the end of each game session.

Lastly, LocalStorage is utilized on the frontend to store high scores between user 
sessions.

### Reflection:
This project allowed me to explore both technical coding and creativity aspect of user interface design. 
While building this project, I gained a deeper understanding of React's state management, especially with regards to the timer and localStorage 
for high scores. I enjoyed implementing the scoring system and integrating hints, 
which required strategic manipulation of state. If given more time, I would take advantage of the
 Globe aspect of the home page and implement an option for users to select specific geographic 
 regions. I would also add more animation to improve the user experience.

### Challenges:
Initially, I implemented two modes of the game: Regular mode and Speed mode. 
The Regular mode is the same as the current version of the game, while the 
Speed mode gives the user 60 seconds to answer as many questions as possible from all
levels of difficulty. However, I ran into issues trying to store and update the highest score for 
the Speed mode using LocalStorage. If given more time, I would definitely continue working on this as well.
