// Fetch webpage text and common words
const pageText = document.body.innerText;
const commonWordsUrl = 'https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json';

const replaceCommonText = async (str) => {
    // Regex has zero width assertions on either side of a alphabetic string of length of at least 2
    // to ensure no punctiation or coding syntax in or around words
    // [^\d\W] - no decimals or non-word characters allowed
    const words = str.match(/\b([^\d\W]{2,})+\b/g);

    // Filter common words
    const response = await fetch(commonWordsUrl);
    const data = await response.json();
    console.log(data);
    const filteredWords = words.filter(word => !data.includes(word.toLowerCase()));
    console.log(filteredWords);
}

replaceCommonText(pageText);