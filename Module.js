//--------------------------------------------------------------
// Initialize Function //
const initialize = (() => {
	// Fetch Courses Function //
	const fetchCourses = () => {
		//--------------------------------------------------------------
		const displayElement = document.getElementsByClassName("display")[0];
		const courseItem = document.getElementsByClassName("course")[0];
		let courseItemTemplate = courseItem.cloneNode(true);
		courseItemTemplate.style.display = "flex";
		let DOMCards = [];
		let newCoursesArray = [];
		let i = 0;
		//--------------------------------------------------------------
		// Fetch API Function //
		let fetchAPI = (async () => {
			// Fetch API
			try {
				const res = await fetch("https://codingninjas.in/api/v3/courses");
				if (res.ok) {
					console.log("SUCCESS");
				} else {
					console.log("FAILURE");
					throw new Error("Error in Fetching the Courses !!!");
				}
				const data = await res.json();
				// Store the Courses
				const courses = data.data.courses;
				courses.forEach((course) => {
					const newCoursesObject = {
						courseName: course.name,
						courseLevel: course.level,
						courseImage: course.preview_image_url,
						courseIcon: course.classroom_icon_url,
					};
					if (newCoursesObject.courseImage !== "") {
						// Push the Courses to the Array
						newCoursesArray.push(newCoursesObject);
						// Push the Template to the DOM Array
						DOMCards.push(courseItemTemplate);
						// Push the Template to the DOM
						displayElement.appendChild(DOMCards[i]);
						// Clone the Courses Div Template
						courseItemTemplate = courseItemTemplate.cloneNode(true);
						i++;
					}
				});
				console.log(1);
			} catch (err) {
				console.log(err);
				return "ERROR";
			}
		})();
		if (fetchAPI === "ERROR") {
			return "ERROR";
		}
		// -------------------------------------------------- //
		// Set Card Items Function //
		let setCardItems = () => {
			let i = 0;
			newCoursesArray.forEach((course) => {
				// Get the DOM Elements from the DOMCards Array
				let imageDiv = DOMCards[i].querySelector(".image");
				let courseNameHeading =
					DOMCards[i].querySelector(".info .courseName");
				let logoDiv = DOMCards[i].querySelector(".info .logo");
				let courseLevelPara =
					DOMCards[i].querySelector(".info .courseLevel");
				// Remove the Loading Animation
				imageDiv.classList.remove("skeleton");
				courseNameHeading.classList.remove("skeleton");
				logoDiv.classList.remove("skeleton");
				courseLevelPara.classList.remove("skeleton");
				// Set the Courses in the DOM Elements
				imageDiv.style.backgroundImage = `url('${course.courseImage}')`;
				courseNameHeading.textContent = course.courseName;
				logoDiv.style.backgroundImage = `url('${course.courseIcon}')`;
				courseLevelPara.textContent = course.courseLevel;
				i++;
			});
		};
		// -------------------------------------------------- //
		// Calling Set Card Items Function using SetTimeout //
		/*SetTimeout Callback will run after the Fetch API Promise Callback due to Event Loop Priority. First, Calling Stack, then, Microtask Queue, then, Task Queue.*/
		setTimeout(setCardItems, 8000);
		// -------------------------------------------------- //
	};
	return {
		fetchCourses,
	};
})();
