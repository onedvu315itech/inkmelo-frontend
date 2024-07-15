import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

const Filter = ({ handleFilterChange, selectedCategory }) => {
    const handleChange = (event) => {
        handleFilterChange(event.target.value);
    };
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="filter">Bộ lọc</InputLabel>
                <Select
                    labelId='filter'
                    value={selectedCategory}
                    onChange={handleChange}
                >
                    <MenuItem value="all">Tất cả sản phẩm</MenuItem>
                    <MenuItem value="2">Sách bản cứng</MenuItem>
                    <MenuItem value="1">Sách nói</MenuItem>
                    <MenuItem value="3">Sách PDF</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default Filter;