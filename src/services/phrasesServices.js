const axios = require("axios");
const scrapper = require("cheerio");

const phrasesScrapper = () => {
  const URL_BASE = "https://www.pensador.com/frases_inteligentes";
  const page = Math.floor(Math.random() * 19 + 1);

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

      if (sText.length > 0) {
        phrase.text = sText;
        phrase.author = selector(p).children("span.autor").text();
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
