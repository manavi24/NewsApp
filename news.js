const API_KEY="fe12f677525c478db97e28cf6145d529";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=>fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data= await res.json();
    bindDAata(data.articles);
}

function bindDAata(articles){
    const cardContainer=document.getElementById('cards-container');
    const template=document.getElementById('template-card');
    cardContainer.innerHTML=''; //empty the card container before calling the bind data function again.
    
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone= template.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone); 
    });

}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);

    const navItem= document.getElementById(id);
    curSelectedNav?.classList.remove('active');//if not null remove class active
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active')
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const querry= searchText.value;
    if(!querry)return;
    fetchNews(querry);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
})
var btn = document.getElementById("search-text");
btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  //checks whether the pressed key is "Enter"
        validate(e);
    }
});

function validate(e) {
    var text = e.target.value;
    //validation of the input...
}