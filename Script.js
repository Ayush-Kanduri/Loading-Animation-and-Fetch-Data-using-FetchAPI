const btn = document.getElementsByClassName("btn")[0];
const button = document.querySelector(".btn button");

//--------------------------------------------------------------
//Button Click Event//
button.addEventListener("click", (event) => {
	event.stopPropagation();
	btn.remove();
	initialize.fetchCourses();
});
//--------------------------------------------------------------
