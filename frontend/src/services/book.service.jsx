import axios from "axios";

export const getBooks = async () => {
    return axios.get('/api/books').then((res) => {
        return {
            status: res.data.status,
            books: res.data.books,
        }
    }).catch((err) => {
      throw {
        status: err.response.data.status,
        description: err.response.data.description,
        title: err.response.data.title,
      };
    });
}
