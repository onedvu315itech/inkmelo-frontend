import axios from "api/axios"

const getAllBookPackageWithFilter = async (categoryId, query) => {
    return await axios.get('/store/api/v1/book-packages', {
        params: {
            category: categoryId,
            query: query || ''
        }
    });
}

const getBookDetails = (slug) => {
    return axios.get(`store/api/v1/book-packages/${slug}`);
}

export default {
    getAllBookPackageWithFilter,
    getBookDetails
}