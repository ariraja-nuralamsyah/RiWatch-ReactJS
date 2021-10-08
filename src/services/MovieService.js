import http from "../http-common";

const apiKey = "9f85f315309fd8607469257a6caf1fd2"

const getAll = () => {
  return http.get(`/movie/popular?api_key=${apiKey}`);
};

const getAllByGenre = id => {
  return http.get(`/discover/movie?api_key=${apiKey}&with_genres=${id}`);
};

const getGenres = () => {
  return http.get(`/genre/movie/list?api_key=${apiKey}&language=en-US`);
};

const get = id => {
  return http.get(`/movie/${id}?api_key=${apiKey}$language=en-US`);
};

const create = data => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/search/movie?api_key=${apiKey}&query=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getGenres,
  getAllByGenre
};
