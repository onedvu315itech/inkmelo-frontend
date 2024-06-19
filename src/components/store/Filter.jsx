import React from 'react'

const Filter = ({ genre }) => {
    return (
        <>
            <form action="">
                <select name="genres" id="genres">
                    <option value="all">Tất cả</option>
                    <option value="popular">Phổ biến nhất</option>
                    <option value={genre}>{genre}</option>
                </select>
            </form>
        </>
    )
}

export default Filter;