import axios from "axios";

const API_KEY = "a27eb5adf978070ff30a393d";
const BASE_CURRENCY = "NGN";

const fetchExchangeRates = async () => {
  try {
    const currencies = ["USD", "CAD", "EUR", "GBP", "CNY"];
    const requests = currencies.map((currency) =>
      axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency}/${BASE_CURRENCY}/1`)
    );

    const responses = await Promise.all(requests);
    const exchangeRates = responses.map((res) => ({
      name: res.data.base_code,
      rate: res.data.conversion_rate.toFixed(2), // Round to 2 decimal places
    }));

    

    return exchangeRates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};


export default fetchExchangeRates