# Nearby Event & Weather Information App

### An app that allows users to view cool events happening nearby, and their corresponding weather details - All at the click of a button or shake of your phone!

Project so far contains:
* API data sample files (JSON), mainly for testing purposes.
* Component files:
	* App.js, which sets up screen navigation and links immediately to login.
	* Login.js, which produces login screen and functionality.
	* Register.js, which produces register screen and functionality.
	* InformationLists.js, which gathers sensor and API data in order to populate screen with EventResult 
	and WeatherResult components and allow navigation between them.
	* EventResult.js, which is the container for a single event retrieved from Skiddle API and 
	is rendered multiple times on InformationLists to produce a list of information.
	* EventResult.js, which is the container for a single weather instance retrieved from 
	Open Weather Map API and is rendered multiple times on InformationLists to produce a list of information.
* Testing files:
	* Based on component files. Component files unit test their corresponding component files.
	* Test coverage will be improved soon (Currently squaring academic commitments with a move to full TDD here).
	  
##### Other notes:
* Lots more UI work incoming. Currently reviewing different front-end frameworks.
* This project was started to help me explore mobile development, and is largely educational. That being said, I would like to break out the API request handling in to a separate-back end application soon, as this would improve performance for users (I got ahead of myself in making something work on mobile initially). I have built a back-end for my university final year project, and once studies are concluded, I will use those learnings to build one for this too.
