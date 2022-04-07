const phrasesServices = require("../services/phrasesServices");

const getPhrases = async (req, res) => {
  try {
    const phrases = await phrasesServices.phrasesScrapper();
    const randInt = Math.floor(Math.random() * phrases.length + 1);
    const randomPhrase = phrases[randInt];
    const { text, author } = randomPhrase;

    return res.status(200).json({ text, author });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getPhrases,
};
