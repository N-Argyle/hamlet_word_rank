const fs = require('fs');

// List of common words to exclude (stop words)
const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'is', 'am', 'are', 'was', 'were', 'been', 'thy', 'thee', 'thou', 'did',
    'hath', 'shall', 'more', 'most', 'must', 'yet', 'now', "no", "him", "his", "our", "laer", "give", "upon",
    "thou", "thy", "thee", "thine", "your", "yours", "ourself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves", "such", "what", "such", "suchlike", "suchness", "wherefore", "wherein", "whereto", "wherewith", "wherewithal", "whence", "whereof", "wherewith", "wherewithal", "whereinto", "whereunto", "whereover", "wherethrough", "whereupon", "wherever", "wheresoever", "wherefor", "whereforward", "whereforeward", "whereforeover", "whereforeth", "whereforethrough", "whereforeupon", "whereforeover", "whereforeth", "whereforethrough", "whereforeupon",
    "let", "know", "sir", "come", "well", "make", "take", "good", "well", "make", "take", "good", "well", "make", "take", "good", "well", "make", "take", "good",
    "them", "ourself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves", "such", "what", "such", "suchlike", "suchness", "wherefore", "wherein", "whereto", "wherewith", "wherewithal", "whence", "whereof", "wherewith", "wherewithal", "whereinto", "whereunto", "whereover", "wherethrough", "whereupon", "wherever", "wheresoever", "wherefor", "whereforward", "whereforeward", "whereforeover", "whereforeth", "whereforethrough", "whereforeupon", "whereforeover", "whereforeth", "whereforethrough", "whereforeupon",
    "may", "speak", "then", "ham", "pol", "ll", "tis", "like", "th", "us", "enter", "very", "why",
    "how", "here", "oph", "man", "when", "where", "too", "than", "these", "ros", "thus", "tell", "look",
    "own", "ay", "nor", "both", "again", "can", "might", "mar", "indeed", "other", "hor", "should", "some",
    "much", "see", "had", "hear", "mine", "dear", "doth", "exit", "leave", "into", "nay", "does", "matter",
    "two", "part", "away", "osr", "comes", "against", "though", "before", "seen", "done","those", "off", 
]);

// Read the file
fs.readFile('Hamlet.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Remove stage directions (text within square brackets)
    const textWithoutDirections = data.replace(/\[.*?\]/g, '');

    // Split into words and clean them
    const words = textWithoutDirections
        .toLowerCase()
        .replace(/[.,!?;:()"'\-]/g, ' ')  // Remove punctuation
        .split(/\s+/)                      // Split on whitespace
        .filter(word => 
            word.length > 1 &&             // Remove single characters
            !stopWords.has(word) &&        // Remove stop words
            !/^\d+$/.test(word)           // Remove numbers
        );

    // Count word frequencies
    const wordFrequency = {};
    words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    // Sort words by frequency
    const sortedWords = Object.entries(wordFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 100);

    // Output results
    console.log('Top 100 words in Hamlet (excluding common words and stage directions):');
    console.log('----------------------------------------');
    sortedWords.forEach(([word, count], index) => {
        console.log(`${(index + 1).toString().padStart(3)}: ${word.padEnd(15)} (${count} occurrences)`);
    });
});