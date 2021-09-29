import * as api from "../utils/requests";
import * as constant from "../globals/constant";


export const addBook = async (state) => {
  return await api
    .PostReq(constant.addBook, state)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const bookList = async () => {
  return await api
  .getReq(constant.bookList)
  .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const bookDetail = async (id) => {
  return await api
  .getReq(constant.bookList + id )
  .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const deleteBook = async (id) => {
  return await api
    .delReq(constant.bookList + id)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const updateBook = async (id, data) => {
  return await api
    .putReq(constant.bookList + id, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const login = async (data) => {
  return await api
    .PostReq(constant.login, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
