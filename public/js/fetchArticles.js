import Mustache from './mustache.js';

var total;

export default function fetchAndDisplayArticles(targetElm, current) {
	const url = 'https://wt.kpi.fei.tuke.sk/api/article';


	function render(articles) {
		const obj = {
			articles: articles,
			current: current,
			total: total,
		};

		document.getElementById(targetElm).innerHTML = Mustache.render(
			document.getElementById('template-articles').innerHTML,
			obj
		);
	}

	function getArticle(articles) {
		const ids = articles.map(function (a) {
			return a.id;
		});

		ids.map((id) =>
			fetch(`${url}/${id}`)
				.then((y) => y.json())
				.then((result) => {
					const article = articles.find((a) => a.id == result.id);
					article.content = result.content;

					render(articles);
				})
		);
	}
	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				//if we get server error
				return Promise.reject(
					new Error(`Server answered with ${response.status}: ${response.statusText}.`)
				);
			}
		})
		.then((responseJSON) => {
			let articles = responseJSON.articles;
			return articles;
		})
		.then((articles) => {
			getArticle(articles);
		})
		.catch((error) => {
			////here we process all the failed promises
			const errMsgObj = { errMessage: error };
			document.getElementById(targetElm).innerHTML = Mustache.render(
				document.getElementById('template-articles-error').innerHTML,
				errMsgObj
			);
		});
}








