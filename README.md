# Edurizon (A submission for Microsoft Engage'21)


<a href="https://youtu.be/YDSTkZ-Uzzw"><h2 align="center"><strong>** Short 5 min Demo Video</strong></h2></a>
<h6 align="center"> ** Kindly consider the above video instead of Microsoft Form Submission Video ** </h6>

<p align="center">
	<a href="https://edurizon.netlify.app"><strong><font-size="10">Website Live</font></strong></a>
||
<a href="https://docs.google.com/document/d/1vGeCNojOBVuFnDvJlwtrFVfO1uLVnA9AwAbrJ2t8rXs/edit?usp=sharing"><strong>Documentation</strong></a>
</p>

<p align="center">
	<img src="https://github.com/saloni0104/Engage-Edurizon-FE/blob/master/Images/edurizon-logo-new.png" alt="Engage 21"/>
</p>

## Edurizon ~ Igniting a Better Future

<p align="justify">Edurizon is a one-stop fully functional hosted web application for smooth and extensive collaboration and engagement between teachers and students in this virtual era of learning and education. This prototype is built using agile methodologies as a part of the Microsoft Engage Mentorship Program 2021. From seamless video conferencing for classes and submitting assignments to a discussion’s forum and an interactive office hours meet, this application has some of the most essential features required to make teaching and learning a fun process remotely!
</p>

## 🔗 Important Links
 * [Hosted Web Application](https://edurizon.netlify.app/)
 * [5 min Demo Video](https://youtu.be/YDSTkZ-Uzzw) (Kindly consider this video instead of Microsoft Form Submission Video)
 * [Documentation](https://docs.google.com/document/d/1vGeCNojOBVuFnDvJlwtrFVfO1uLVnA9AwAbrJ2t8rXs/edit?usp=sharing)
 * [UI](https://www.figma.com/file/k0gR5lXBm7D9L0JJEYSvkw/Microsoft-Engage'21---Edurizon?node-id=0%3A1)
 * [Backend Repo (used for CICD pipeline)](https://github.com/saloni0104/Engage-Edurizon-BE)

## ⚙️ Installation
- To run the web app, cd into the **frontend directory** then run -
```bash
yarn start
```
- To run development server, first **cd into the backend directory** then run -
```bash
nodemon server
```
- To run unit tests
```bash
npm run tests
```
<br/>

## Login Credentials for Usage
 * Login for Student :- 
	- Institute ID - STUD01
	- Password - saloniparekh
* Login for Teacher :-
	- Institute ID - TEACH001
	- Password - teacher
  
![img](https://github.com/saloni0104/Engage-Edurizon-FE/blob/master/Images/home.JPG)

## Features of the application

A. **Courses** <br>
	a) _Course Page_ - Displays list of courses allotted to both students and teachers. <br>
	b) _Course Details Page_ - <br>
		(i) Displays list of students in the course <br>
		(ii) Displays faculty details <br>
		(iii) Displays virtual class meeting link <br>
		(iv) Displays course-wise announcements i.e class schedule and class messages that are posted by the teacher. <br>
		(v) Teachers have an additional functionality to add and remove students to a particular course <br>
		
B. **Assignments** <br>
	a) _Student’s Assignments Page_ - Shows list of pending and submitted assignments for the students with relevant details like Assignment Title, Question Link, Due Date, 		attaching and submitting file option. <br>
	b) _Teacher’s Assignments Page_ - Allows teachers to post assignments through forms and view the posted assignments for each course of theirs. <br>
	
C. **Grade Assignments** <br>
	a) _Teacher’s Grade Assignments Page_ - Allows teachers to view the student submission course-wise and allot/update marks to each of the students who have posted the 		assignment. <br>
	b) _Student’s View Grades Page_ - Students can view the grades for all their courses here along with their submitted assignment document. <br>

D. **Student Forum** <br>
	a) Students can search for relevant questions they are looking for(fuzzy search enabled) and their answers on this page. <br>
	b) They can post a question if they do not find any question that they were looking for. They can answer any question on this page, on an ongoing thread or create a 		thread of answers to a particular question. <br>
	c) This page is exclusively for the student community and their related discussions. Teachers do not have access to this page. <br>
	d) In order to maintain the decorum amongst students, I have enabled a sentiment-analysis feature while posting any question or answer. This will prevent any student 		from posting/writing inappropriate words or using foul language by showing a popup and restricting them to post. <br>

E. **Note Taking** <br>
	a) Note taking comes in very handy, especially when you are in a teaching and learning environment. Therefore a note-taking feature has been added on every page of the 	website for quicker and easier access. <br>
	b) Notes have the auto-saving ability along with normal text formatting options of bold, italic and underline. <br> 

F. **Office Hours - USP Feature** <br>
In the virtual mode of education, it often becomes very difficult for the students to reach out to their teachers for doubts and difficulties, as per their convenient timings. This increases complexities and hampers their learning, even self-esteem of students in some cases.  Keeping this in mind, this feature has been built with the following functionality: <br>

_a) For Students View -_ <br>
	(i) Course Faculty Cabins are displayed on the layout with course names and the free office hours of the teachers. <br>
	(ii) The red light turns to green once the office hours become active. <br>
	(iii) The student user(circular element with initials) can easily move to the desired cabin during the active hours with the help of **arrow keys** of the keyboard. <br>
	(iv) Once the student is inside the cabin, a popup appears, enabling them to join the meeting, where the teacher will be available. <br>
	(v) The **Student Breakout Room** is a space where students can enjoy their break and chill with friends. Teachers do not have access to this breakout room. <br>

_b) For Teacher’s View -_ <br>
	(i) The Teacher needs to post office hours for each of their allotted courses through a form. <br>
	(ii) Once the office hours are posted, cabins appear displaying the office hours and joining meeting link. Green indicates that their office hours have started. <br>

This feature will enable the students and teacher to connect efficiently as per schedule and decrease the inconvenience of not being able to reach out and ask for availability, hence saving a lot of time and effort.  <br>

G. **Video Conference Meeting** <br>
A simple video conference meet call with very basic features: <br>
	a) Turn camera off and on <br>
	b) Turn microphone off and on <br>
	c) Screen share <br>
	d) Exit the meeting <br>
	e) View Participants List <br>



### [Website Live!](http://edurizon.netlify.app/)


## 🧰 Tools and Tech Stack involved

### Frontend

1. Technical Stack Used: HTML, CSS, JavaScript
2. Framework Used: Bootstrap
3. Parcel.js for packaging code to yield better performance
4. Editor used: VS Code
5. The Project can be run by opening the the index.html file leading to the home page.

### Backend

1. Technical Stack Used: NodeJS, MongoDB, ExpressJS, JWT
2. Postman for testing APIs
3. Editor Used: VS Code

Link to backend repo: https://github.com/saloni0104/Engage-Edurizon-BE

### [UI designed on Figma](https://www.figma.com/file/k0gR5lXBm7D9L0JJEYSvkw/Microsoft-Engage'21---Edurizon?node-id=0%3A1)


### Deployment

1. Database : Atlas MongoDB
2. The Project is hosted on Netlify and is live at http://edurizon.netlify.app/
3. Backend Server is deployed using Heroku

### Automated Testing
1. Chai
2. Mocha

### Media Storage
1. Cloudinary


### [5 min Demo Video](https://youtu.be/YDSTkZ-Uzzw) 

 
## 💻 Project Methodology

The software was developed using **scrum framework** in **agile methodology**. 
</br></br>
This was done to ensure that the main focus was on the software product. The exact list of features were not exactly known since the start and hence it was very necessary that the whole process was able to accommodate change easily. 
</br></br>
The project was released in 3 sprints, and each sprint was further divided into 3 phases-

- Planning and prototyping: The UI prototype was first designed on Figma for each sprint and then the front-end was coded out on the web application.
- Implementation: The Database structure and model was constructed as per requirements along the sprints and back-end APIs were written and integrated with the front-end.
- Testing and review: After each sprint, a test-suite was written for the APIs and both manual and automated tests were run to check for bugs, and resolved as a whole.

Last two days were taken for regression testing after completing the three sprints and the whole application was tested all-together. Minor improvements of UI were also made, along with documentation and video making.

## 📈 Deployment

<p align="justify"> The back-end of the web application has been deployed on Heroku. The CI/CD pipeline has been followed for deployment wherein, a successful push made to the master branch of the github repository, runs a github action. A series of unit tests are then run after. Only after the passing of these tests successfully, the latest code is deployed positively on Heroku. This approach has been adopted to ensure better development practices which involve continuous and quick delivery of the right code and new features into production along with regular constrained checks of bugs and fixing them simultaneously. </p>

## <img height="40" width="40" src="https://user-images.githubusercontent.com/48960420/143775173-cc98ffe5-879e-4e97-b760-dc6a714fd4f6.png"> Testing

<p align="justify"> Automated Testing for the project was done by using Chai and Mocha. Chai is a TDD assertion library for Node.js and the browser. Mocha is a test framework of Javascript that runs on Node.js. Both of these paired up turn out to be quite effective in terms of test driven development methods. A total of 28 routes were tested against 55 test cases. </p>

## Contributor

<table>
  <tr>
    <td align="center"><a href="http://github.com/saloni0104"><img src="https://avatars.githubusercontent.com/u/48960420?s=400&u=eafcf09881c7566df859009c3a2f6cd4e7f50829&v=4.PNG" width="200px;"  height="200px;" alt=""/><br /><sub><b>Saloni Parekh</b></sub></a><br />
   </td>
</tr>
</table>

<p align="center">
	Made with :heart: by <a href="https://github.com/saloni0104">Saloni Parekh</a>
</p>



