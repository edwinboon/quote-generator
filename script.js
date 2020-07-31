const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function getQuoteFromApi() {

    showLoadingSpinner();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // passing data into elements
        authorText.innerText = data.quoteAuthor ? data.quoteAuthor : 'Unknown';
        // reduce font size for long quotes
        data.quoteText.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
        quoteText.innerText = data.quoteText;

        removeLoadingSpinner();
    } catch (error) {
        // set failure quote to show something
        authorText.innerText = 'API'
        quoteText.innerText = 'Whoops ... I `the API call` just failed to load you some awesome quotes';
        removeLoadingSpinner();
        console.error('Whoops no quote here: ', error.message);
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://www.twitter.com/intent/tweet?text=${quote} - ${author}`;

    // open twitter link in new window
    window.open(twitterUrl, '_blank');
}

// Event liteners
newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', tweetQuote);

// Get quote on load
getQuoteFromApi();
