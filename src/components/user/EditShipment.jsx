import React from "react";
import { Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

const EditShipment = ({
    shipment, setShipment, listProvince, listDistrict, listWard,
    provinceData, districtData, wardData,
    handleChangeProvince, handleChangeDistrict, handleChangeWard,
    handleSaveClick, handleCancelClick
}) => {
    const handleInputChange = (event, id) => {
        let copyShipment = { ...shipment };
        copyShipment[id] = event.target.value;
        setShipment({ ...copyShipment });
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tên người nhận"
                            name="receiverName"
                            value={shipment.receiverName}
                            onChange={(event) => handleInputChange(event, 'receiverName')}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="contactNumber"
                            value={shipment.contactNumber}
                            onChange={(event) => handleInputChange(event, 'contactNumber')}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Loại địa chỉ"
                            name="description"
                            value={shipment.description}
                            onChange={(event) => handleInputChange(event, 'description')}
                            variant="outlined"
                            margin="normal"
                        />
                        <Box sx={{ border: '2px solid red', p: 2, borderRadius: '5px' }}>
                            <Box mt={2}>
                                <Typography variant="h6">Tỉnh/Thành phố</Typography>
                                <Select
                                    value={provinceData.id || ''}
                                    onChange={(event) => handleChangeProvince(event)}
                                    sx={{ display: 'block', maxWidth: '100%' }}
                                >
                                    {
                                        listProvince && listProvince.map((province, key) => {
                                            return (
                                                <MenuItem key={key} value={province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h6">Quận/Huyện</Typography>
                                <Select
                                    value={districtData.id || ''}
                                    onChange={(event) => handleChangeDistrict(event)}
                                    sx={{ display: 'block', maxWidth: '100%' }}
                                >
                                    {
                                        provinceData && listDistrict.map((district, key) => {
                                            return (
                                                <MenuItem key={key} value={district.DistrictID}>
                                                    {district.DistrictName}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="h6">Phường/Xã</Typography>
                                <Select
                                    value={wardData.code || ''}
                                    onChange={(event) => handleChangeWard(event)}
                                    sx={{ display: 'block', maxWidth: '100%' }}
                                >
                                    {
                                        districtData && listWard.map((ward, key) => {
                                            return (
                                                <MenuItem key={key} value={ward.WardCode}>
                                                    {ward.WardName}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Box>
                            <Typography sx={{ marginTop: 10 + 'px' }} variant="h6">Số nhà/Đường</Typography>
                            <TextField
                                fullWidth
                                name="street"
                                value={shipment.street}
                                onChange={(event) => handleInputChange(event, 'street')}
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "right" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveClick}
                            style={{ marginRight: 10 }}
                        >
                            Lưu
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCancelClick}
                        >
                            Hủy
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EditShipment;