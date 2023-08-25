const axios = require("axios");
const scrapper = require("cheerio");

const phrasesScrapper = () => {
  const URL_BASE = "https://www.pensador.com/frases_de_superacao";

  let firstNumber = Math.floor(Math.random() * 631 + 1);
  let secondNumber = firstNumber + 10;

  if (secondNumber > 631) {
    firstNumber = Math.floor(Math.random() * (631 - 10) + 1);
    secondNumber = firstNumber + 10;
  }

  const page = Math.floor(
    Math.random() * (secondNumber - firstNumber + 1) + firstNumber
  );

  const fetchData = async () => {
    result = await axios.get(`${URL_BASE}/${page}`);
    return result.data;
  };

  const scrapQuotes = async () => {
    const content = await fetchData();
    const selector = scrapper.load(content);

    const listPhrases = selector("div.thought-card ");
    const phrases = [];

    listPhrases.each((_i, p) => {
      const phrase = { text: "", author: "" };

      const sText = selector(p).children("p.fr").text();
      // const tst = selector(p).children(".autor").text();

      if (sText.length > 0) {
        phrase.text = sText;
        phrase.author = selector(p).children(".autor").children("a").text();
      }

      phrases.push(phrase);
    });

    return phrases;
  };

  const getQuotes = async () => {
    const data = await scrapQuotes();

    return data;
  };

  return getQuotes();
};

module.exports = {
  phrasesScrapper,
};
