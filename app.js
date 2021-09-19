const pageText = document.body.innerText;
const commonWordsUrl = 'https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json';


// PART 1 - 25 MOST COMMON WORDS
const mostCommonWords = async (str) => {
    // This regex has zero-width assertions on either side of a alphabetic string of length of at least 2 and ensures no punctuation or coding syntax in or around words
    const words = str.match(/\b([^\d\W]{2,})+\b/g);

    // Fetch words list and filter with common words list
    const response = await fetch(commonWordsUrl);
    const data = await response.json();
    const filteredWords = words.filter(word => !data.includes(word.toLowerCase()));
    const lowerCasedWords = filteredWords.map(item => {
        return item.toLowerCase();
    });

    // Find 25 most common words on page
    const hash = {};

    for (let item of lowerCasedWords) {
        if(!hash[item]) {
            hash[item] = 0;
        } hash[item]++;
    }

    const hashArray = Object.entries(hash);
    const sortedHashArray = hashArray.sort((a,b) => b[1] - a[1]);
    // print and return 25 most common words
    const finalList = sortedHashArray.slice(0,25);
    console.log(finalList);
    return finalList;    
}


// PART 2 - REPLACE COMMON WORDS
const replaceCommonText = async (str) => {
    const wordsList = await mostCommonWords(str);
    for (let item of wordsList) {
        const regex = new RegExp('\\b(' + item[0] + ')+\\b', 'gi');
        str = str.replaceAll(regex, item[1].toString());
        document.body.innerHTML = document.body.innerHTML.replaceAll(regex, item[1].toString());
    }
    // print updated string
    console.log(str);
}


// RUN - run parts 1 & 2 respectively with argument pageText or any string:
// mostCommonWords();
// replaceCommonText();