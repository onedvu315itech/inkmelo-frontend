import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

const Filter = ({ query }) => {
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="filter">Bộ lọc</InputLabel>
                <Select
                    labelId='filter'
                    value={query || 'paper'}
                >
                    <MenuItem value="all">Tất cả sản phẩm</MenuItem>
                    <MenuItem value="paper">Sách bản cứng</MenuItem>
                    <MenuItem value="audio">Sách nói</MenuItem>
                    <MenuItem value="pdf">Sách PDF</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default Filter;