// Fetch webpage text and common words data
const pageText = document.body.innerText;
const commonWordsUrl = 'https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json';

// PART 1 - 25 Most Common Words
const mostCommonWords = async (str) => {
    // Regex has zero width assertions on either side of a alphabetic string of length of at least 2
    // to ensure no punctiation or coding syntax in or around words
    // [^\d\W] - no decimals or non-word characters allowed
    const words = str.match(/\b([^\d\W]{2,})+\b/g);

    // Fetch words list
     // Filter with common words list
    const response = await fetch(commonWordsUrl);
    const data = await response.json();
    const filteredWords = words.filter(word => !data.includes(word.toLowerCase()));
    const lowerCasedWords = filteredWords.map(item => {
        return item.toLowerCase();
    });

    // 25 most common words on page
    let hash = {};

    for (let item of lowerCasedWords) {
        if(!hash[item]) {
            hash[item] = 0;
        } hash[item]++;
    }

    const hashArray = Object.entries(hash);
    const sortedHashArray = hashArray.sort((a,b) => b[1] - a[1]);
    //console.log(sortedHashArray.slice(0,25));
    return sortedHashArray.slice(0,25);    
}

// PART 2 - Replace Common Words
const replaceCommonText = async (str) => {
    const wordsList = await mostCommonWords(str);
    for (let item of wordsList) {
        const regex = new RegExp('\\b(' + item[0] + ')+\\b', 'gi');
        document.body.innerHTML = document.body.innerHTML.replaceAll(regex, item[1].toString());
    }
}

//mostCommonWords(pageText)
replaceCommonText(pageText);