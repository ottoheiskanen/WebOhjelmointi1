words = ["saippuakauppias", "kaupunki", ""];

function isPalindrome(str) {
    if (str.length > 1) {
        backwards = "";
        wordLength = str.length - 1;
    
        while (wordLength >= 0 ) {
            backwards += str[wordLength];
            wordLength--;
        }
    
        if (backwards == str) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

isPalindrome(words[0]);