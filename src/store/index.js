import { createStore } from "vuex";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
});

export default createStore({
  state: {
    quote: [],
    quotesList: [],
  },
  getters: {
    quotes(state) {
      return state.quotesList;
    },
    quote(state) {
      return state.quote;
    },
    randomize(state) {
      return () => {
        const idx = Math.round(Math.random() * state.quotesList.length - 1);

        return state.quotesList[idx];
      };
    },
  },
  mutations: {
    SET_QUOTES_TO_STATE: (state, quotesList) => {
      state.quotesList = quotesList;
    },
    SET_QUOTE_TO_STATE: (state, quote) => {
      state.quote = quote;
    },
  },
  actions: {
    fetchQuotes({ commit }) {
      return request
        .get("/quotesList")
        .then(({ data }) => {
          commit("SET_QUOTES_TO_STATE", data);
        })
        .catch((err) => {
          return new Error(err);
        });
    },
    async singleQuote({ commit }, id) {
      return request
        .get(`/quotesList/${id}`)
        .then(({ data }) => {
          commit("SET_QUOTE_TO_STATE", data);
        })
        .catch((err) => {
          return new Error(err);
        });
    },
    async postQuote(_, form) {
      return request.post("/quotesList", form);
    },
    async updateQuote(_, card) {
      return request.put(`/quotesList/${card.id}`, card).then((res) => {
        return res.status === 200;
      });
    },
    async deleteQuote(_, id) {
      return request.delete(`/quotesList/${id}`).then((res) => {
        return res.status === 200;
      });
    },
  },
});
