/*
 * routes definition and handling for paramHashRouter
 */

import Mustache from './mustache.js';
import addOpinion from './addOpinion.js';
import fetchArticles from './fetchArticles.js';

function CreateOpinion(targetElm) {
	const opinionsFromStorage = localStorage.myTreesComments;
	let opinions = [];

	if (opinionsFromStorage) {
		opinions = JSON.parse(opinionsFromStorage);
		opinions.forEach((opinion) => {
			opinion.created = new Date(opinion.created).toDateString();
			opinion.willReturn = opinion.willReturn
				? 'I will return to this page.'
				: 'Sorry, one visit was enough.';
		});
	}

	document.getElementById(targetElm).innerHTML = Mustache.render(
		document.getElementById('template-opinions').innerHTML,
		opinions
	);
}


export default [
	{
		hash: 'welcome',
		target: 'main-router',
		getTemplate: (targetElm) =>
			(document.getElementById(targetElm).innerHTML = document.getElementById(
				'template-welcome'
			).innerHTML),
	},
	{
		hash: 'articles',
		target: 'main-router',
		getTemplate: fetchArticles,
	},
	{
		hash: 'opinions',
		target: 'main-router',
		getTemplate: CreateOpinion,
	},
	{
		hash: 'addOpinion',
		target: 'main-router',
		getTemplate: (targetElm) => {
			document.getElementById(targetElm).innerHTML = document.getElementById(
				'template-addOpinion'
			).innerHTML;
			document.getElementById('IdForForm').onsubmit = addOpinion;
		},
	},
];
