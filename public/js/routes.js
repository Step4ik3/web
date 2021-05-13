// /*
//  * routes definition and handling for paramHashRouter
//  */

// import Mustache from './mustache.js';
// import addOpinion from './addOpinion.js';
// import fetchArticles from './fetchArticles.js';

// function CreateOpinion(targetElm) {
// 	const opinionsFromStorage = localStorage.myTreesComments;
// 	let opinions = [];

// 	if (opinionsFromStorage) {
// 		opinions = JSON.parse(opinionsFromStorage);
// 		opinions.forEach((opinion) => {
// 			opinion.created = new Date(opinion.created).toDateString();
// 			opinion.willReturn = opinion.willReturn
// 				? 'I will return to this page.'
// 				: 'Sorry, one visit was enough.';
// 		});
// 	}

// 	document.getElementById(targetElm).innerHTML = Mustache.render(
// 		document.getElementById('template-opinions').innerHTML,
// 		opinions
// 	);
// }


// export default [
// 	{
// 		hash: 'welcome',
// 		target: 'main-router',
// 		getTemplate: (targetElm) =>
// 			(document.getElementById(targetElm).innerHTML = document.getElementById(
// 				'template-welcome'
// 			).innerHTML),
// 	},
// 	{
// 		hash: 'articles',
// 		target: 'main-router',
// 		getTemplate: fetchArticles,
// 	},
// 	{
// 		hash: 'opinions',
// 		target: 'main-router',
// 		getTemplate: CreateOpinion,
// 	},
// 	{
// 		hash: 'addOpinion',
// 		target: 'main-router',
// 		getTemplate: (targetElm) => {
// 			document.getElementById(targetElm).innerHTML = document.getElementById(
// 				'template-addOpinion'
// 			).innerHTML;
// 			document.getElementById('IdForForm').onsubmit = addOpinion;
// 		},
// 	},
// ];
import  Mustache from "./mustache.js";
import processComFrmData from "./addOpinion.js";
import articleFormsHandler from "./articleFormsHandler.js";
import processOpnFrmData from "./addCommentB4app.js";


//an array, defining the routes
export default[

    {
        //the part after '#' in the url (so-called fragment):
        hash:"welcome",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
    },

    {
        //the part after '#' in the url (so-called fragment):
        hash:"info",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-info").innerHTML
    },

    {
        //the part after '#' in the url (so-called fragment):
        hash:"puffcorn",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-puffcorn").innerHTML
    },

    {
        //the part after '#' in the url (so-called fragment):
        hash:"cereals",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-cereals").innerHTML
    },


    {
        hash:"articles",
        target:"router-view",
        getTemplate: fetchAndDisplayArticles,
    },

    {
        hash:"opinions",
        target:"router-view",
        getTemplate: createHtml4opinions,

    },

    {
        hash:"addComment",
        target:"router-view",
        getTemplate: (targetElm) =>{
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addComment").innerHTML
            //document.getElementById("opnFrm").onsubmit=processOpnFrmData;
        }
    },
    {
        hash:"article",
        target:"router-view",
        getTemplate: fetchAndDisplayArticleDetail
    },
    {
        hash:"artEdit",
        target:"router-view",
        getTemplate: editArticle
    },
    {
        hash:"artDelete",
        target:"router-view",
        getTemplate: deleteArticle
    },
    {
        hash:"addArticle",
        target:"router-view",
        getTemplate: (targetElm) =>{
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addArticle").innerHTML;
            document.getElementById("articleForm1").onsubmit=addArticle;

        }
    }

];

const urlBase = "http://wt.kpi.fei.tuke.sk/api";
const articlesPerPage = 20;

function createHtml4opinions(targetElmId){

    const init={
        headers: window.comHandler.back4appHeaders
    };


    fetch(window.comHandler.back4appUrl,init)
        .then(response =>{      //fetch promise fullfilled (operation completed successfully)
            if(response.ok){    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                return response.json(); //we return a new promise with  the response data in JSON to be processed
            }else{ //if we get server error
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
            }
        })
        .then(responseJSON => { //here we process the returned response data in JSON ...
            console.log(responseJSON);
            document.getElementById(targetElmId).innerHTML =
                Mustache.render(document.getElementById("template-opinions").innerHTML, responseJSON.results);
        })
        .catch (error => { ////here we process all the failed promises
            document.getElementById(targetElmId).innerHTML = error;
        });

   /* const opinionsFromStorage=localStorage.PrudkoComments;
    let comments=[];

    if(opinionsFromStorage){
        comments=JSON.parse(opinionsFromStorage);
        comments.forEach(comment => {
            comment.created = (new Date(comment.created)).toDateString();
             });
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        comments
    );*/

}

/*function fetchAndDisplayArticles(targetElm,current,totalCount){


    current=parseInt(current);
    totalCount=parseInt(totalCount);
    const data4rendering={
        currPage:current,
        pageCount:totalCount
    };


    if(current>1){
        data4rendering.prevPage=current-1;
    }

    if(current<totalCount){
        data4rendering.nextPage=current+1;
    }


     /*"https://wt.kpi.fei.tuke.sk/api/article?max=2";
    const url =  "https://wt.kpi.fei.tuke.sk/api/article";/*article/?max=20";

    const articlesElm = document.getElementById("router-view");
    const errorElm = document.getElementById("router-view");

    let articleList =[];


    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{
                return Promise.reject(new Error(`Failed to access the list of articles. Server answered with ${response.status}: ${response.statusText}.`));

            }
        })
        .then(responseJSON => {
            articleList=responseJSON.articles;
            console.log(JSON.stringify(articleList));
            return Promise.resolve();
        })
        .then( ()=> {
            let contentRequests = articleList.map(
                article => fetch(`${url}/${article.id}`)
            );

            return Promise.all(contentRequests);
        })
        .then(responses =>{
            let failed="";
            for(let response of responses) {
                if(!response.ok) failed+=response.url+" ";
            }
            if(failed===""){
                return responses;
            }else{
                return Promise.reject(new Error(`Failed to access the content of the articles with urls ${failed}.`));
            }
        })
        .then(responses => Promise.all(responses.map(resp => resp.json())))
        .then(articles => {
            articles.forEach((article,index) =>{
                articleList[index].content=article.content;
            });
            console.log(JSON.stringify(articleList));
            return Promise.resolve();
        }).then( () => {
           renderArticles(articleList);
          //  renderArticles2();

        }).catch(error => errorHandler && errorHandler(error));


    function errorHandler(error) {
        errorElm.innerHTML=`Error reading data from the server. ${error}`; //write an error message to the page
    }

    function renderArticles(articles) {
        articlesElm.innerHTML=Mustache.render(document.getElementById("template-articles").innerHTML,articles);
        //write some of the response object content to the page using Mustache
    }

    function renderArticles2() {
        articlesElm.innerHTML=Mustache.render(document.getElementById("template-articles").innerHTML ,data4rendering); //write some of the response object content to the page using Mustache
    }





}*/

function fetchAndDisplayArticles(targetElm, offsetFromHash, totalCountFromHash){

    const offset=Number(offsetFromHash);
    const totalCount=Number(totalCountFromHash);

    let urlQuery = "";

    if (offset && totalCount){
        urlQuery=`?offset=${offset}&max=${articlesPerPage}`;
    }else{
        urlQuery=`?max=${articlesPerPage}`;
    }

    const url = `${urlBase}/article${urlQuery}`;



    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{ //if we get server error
                return Promise.reject(
                    new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
        .then(responseJSON => {
            addArtDetailLink2ResponseJson(responseJSON);
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles").innerHTML,
                    responseJSON
                );
        })
        .catch (error => { ////here we process all the failed promises
            const errMsgObj = {errMessage:error};
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        });
}

function addArtDetailLink2ResponseJson(responseJSON){

    responseJSON.articles = responseJSON.articles.map(
        article =>(
            {
                ...article,
                detailLink:`#article/${article.id}/${responseJSON.meta.offset}/${responseJSON.meta.totalCount}`

            }
        )
    );

}

function fetchAndDisplayArticleDetail(targetElm,artIdFromHash,offsetFromHash,totalCountFromHash) {
    fetchAndProcessArticle(...arguments,false);
}

/**
 * Gets an article record from a server and processes it to html according to
 * the value of the forEdit parameter. Assumes existence of the urlBase global variable
 * with the base of the server url (e.g. "https://wt.kpi.fei.tuke.sk/api"),
 * availability of the Mustache.render() function and Mustache templates )
 * with id="template-article" (if forEdit=false) and id="template-article-form" (if forEdit=true).
 * @param targetElm - id of the element to which the acquired article record
 *                    will be rendered using the corresponding template
 * @param artIdFromHash - id of the article to be acquired
 * @param offsetFromHash - current offset of the article list display to which the user should return
 * @param totalCountFromHash - total number of articles on the server
 * @param forEdit - if false, the function renders the article to HTML using
 *                            the template-article for display.
 *                  If true, it renders using template-article-form for editing.
 */
function fetchAndProcessArticle(targetElm,artIdFromHash,offsetFromHash,totalCountFromHash,forEdit,forDelete){
    const url = `${urlBase}/article/${artIdFromHash}`;

    fetch(url)
        .then(response =>{
            if(response.ok){
                return response.json();
            }else{ //if we get server error
                return Promise.reject(
                    new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
        .then(responseJSON => {
            if(forEdit) {
                responseJSON.formTitle = "Article Edit";
                responseJSON.submitBtTitle = "Save article";
                responseJSON.backLink = `#article/${artIdFromHash}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article-form").innerHTML,
                        responseJSON
                    );
                if (!window.artFrmHandler) {
                    window.artFrmHandler = new articleFormsHandler("https://wt.kpi.fei.tuke.sk/api");
                }
                window.artFrmHandler.assignFormAndArticle("articleForm", "hiddenElm", artIdFromHash, offsetFromHash, totalCountFromHash);
            }else if(forDelete){


                const deleteReqSettings =
                    {
                        method: 'DELETE'
                    };

                fetch(url, deleteReqSettings)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else { //if we get server error
                            return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
                        }
                    })

                window.alert("An article was deleted.");
                window.location.hash = `#articles`;
            }else{

                responseJSON.backLink=`#articles/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.editLink=
                    `#artEdit/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;
                responseJSON.deleteLink=
                    `#artDelete/${responseJSON.id}/${offsetFromHash}/${totalCountFromHash}`;

                document.getElementById(targetElm).innerHTML =
                    Mustache.render(
                        document.getElementById("template-article").innerHTML,
                        responseJSON
                    );
            }
        })
        .catch (error => { ////here we process all the failed promises
            const errMsgObj = {errMessage:error};
            document.getElementById(targetElm).innerHTML =
                Mustache.render(
                    document.getElementById("template-articles-error").innerHTML,
                    errMsgObj
                );
        });
}

function editArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    fetchAndProcessArticle(...arguments,true,false);
}

function deleteArticle(targetElm, artIdFromHash, offsetFromHash, totalCountFromHash) {
    fetchAndProcessArticle(...arguments,false,true);

}

function addArticle(event){

    event.preventDefault();

    const articleElm = document.getElementById("template-addOpinion");


    const newArtData = {
        title: document.getElementById("title1").value.trim(),
        content: document.getElementById("content1").value.trim(),
        author: document.getElementById("author1").value.trim()
    };

    if (!(newArtData.title && newArtData.content)) {
        window.alert("Please, enter article title and content");
        return;
    }

    if (!newArtData.author) {
        newArtData.author = "Anonymous";
    }


    const postReqSettings =
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(newArtData)
        };

    const url1 = `${urlBase}/article`;

    fetch(url1, postReqSettings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
        })

    window.alert("An article was added");

    document.getElementById("articleForm1").reset();
}