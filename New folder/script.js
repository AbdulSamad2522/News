const API_Key = '92f47bbfb9d147d8bd551af89805ecc7';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener("load", () => fetchNews("pakistan"));
 function reload(){
  window.location.reload();
 }
async function fetchNews (query) {
  const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {

    const cardcontainer = document.getElementById('card-container');
    const newstemplate = document.getElementById('card-template');

    cardcontainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardCLone = newstemplate.content.cloneNode(true);
        fillDataCard(cardCLone, article);
        cardcontainer.appendChild(cardCLone);
        
    });
};

function fillDataCard(cardCLone, article) {
  const newsImg = cardCLone.querySelector('#newsimage');
  const newsTitle = cardCLone.querySelector('#news-title');
  const newsSource = cardCLone.querySelector('#news-source');
  const newsDesc = cardCLone.querySelector('#news-desc');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;


  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
  timeZone: "Asia/Jakarta"

  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

cardCLone.firstElementChild.addEventListener("click", () => {
    window.open(article.url,'_blank');
  });

}
let curSelectedNav = null;
function onNavitemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}

const searchbtn = document.getElementById('search-btn');
const searchtext = document.getElementById('search-text');

searchbtn.addEventListener('click', () => {
  const query = searchtext.value;
  if(!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = null;
})


