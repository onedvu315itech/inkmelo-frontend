import axios from "api/axios"

const getAllBookPackageWithFilter = async (categoryId, query) => {
    return await axios.get('/store/api/v1/book-packages', {
        params: {
            category: categoryId,
            query: query || ''
        }
    });
}

export default {
    getAllBookPackageWithFilter
}