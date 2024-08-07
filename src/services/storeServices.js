import axios from "api/axios"
import authHeader from "./authHeaderServices";

const getAllBookPackageWithFilter = async (page, size, categoryId, query) => {
    return await axios.get('/store/api/v1/book-packages', {
        params: {
            page: page,
            size: size,
            category: categoryId,
            query: query || ''
        }
    }, { headers: authHeader() });
}

const getBookDetails = (slug) => {
    return axios.get(`store/api/v1/book-packages/${slug}`, { headers: authHeader() });
}

const getAllRatings = (bookId) => {
    return axios.get(`/store/api/v1/ratings/book/${bookId}`, { headers: authHeader() });
}

export default {
    getAllBookPackageWithFilter,
    getBookDetails,
    getAllRatings
}