/*
 * Created by Stefan Korecko, 2020-21
 * Opinions form processing functionality
 */

export default function AllOpinionForm(event) {
	event.preventDefault();

	const form = document.getElementById('IdForForm');
	const elements = form.elements;

	const name = elements.name.value.trim();
	const opinion = elements.opinion.value.trim();
	
	if (name === '' || opinion == '') {
		if (opinion == '' || name == '' || email == '') {
			if (opinion == '') {
				elements.opinion.style = 'border: 3px solid red;';
			} 
			if (name == '') {
				elements.name.style = 'border: 3px solid red;';
			} 
			if (email == '') {
				elements.email.style = 'border: 3px solid red;';
			} 
		return;
		}
	} else {
		elements.name.style = 'border: none;';
		elements.opinion.style = 'border: none;';
	}

	const date = new Date().toDateString();
	
const email = elements.email.value.trim();
	const newOjb = {
		name: name,
		email: email,
		opinion:opinion,
		date: date,
	};

	let opinions = [];

	if (localStorage.myTreesComments) {
		opinions = JSON.parse(localStorage.myTreesComments);
	}

	opinions.push(newOjb);
	localStorage.myTreesComments = JSON.stringify(opinions);

	window.location.hash = '#opinions';
}
