import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Button } from "@mui/material";
import userService from "services/userServices";
import UserMainCard from "components/UserMainCard";
import DisplayShipment from "components/user/DisplayShipment";
import EditShipment from "components/user/EditShipment";
import CreateNewShipment from "components/user/CreateNewShipment";

const UserAccount = () => {
    const [shipment, setShipment] = useState({
        receiverName: "",
        contactNumber: "",
        description: "",
        street: "",
        wardCode: "",
        ward: "",
        district: "",
        districtId: "",
        province: "",
        provinceId: "",
        isDefault: false,
        status: "ACTIVE",
    });
    const [newShipment, setNewShipment] = useState({
        receiverName: "",
        contactNumber: "",
        description: "",
        street: "",
        wardCode: "",
        ward: "",
        district: "",
        districtId: "",
        province: "",
        provinceId: "",
        isDefault: true,
        status: "ACTIVE",
    });
    const [loading, setLoading] = useState(true);
    const [displayMode, setDisplayMode] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [addMode, setAddMode] = useState(false);

    const [provinceData, setProvinceData] = useState({
        id: '',
        name: ''
    });
    const [listProvince, setListProvince] = useState([]);
    const [isGetProvince, setGetProvince] = useState(false);

    const [districtData, setDistrictData] = useState({
        id: '',
        name: ''
    });
    const [listDistrict, setListDistrict] = useState([]);
    const [isGetDistrict, setGetDistrict] = useState(false);

    const [wardData, setWardData] = useState({
        code: '',
        name: ''
    });
    const [listWard, setListWard] = useState([]);

    const username = sessionStorage.getItem('username');

    // Get province data
    useEffect(() => {
        async function getProvinces() {
            try {
                let resOfProvince = await userService.getProvinces();
                if (resOfProvince) {
                    setListProvince(resOfProvince.data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProvinces();
    }, []);

    // Get district data
    useEffect(() => {
        if (isGetProvince) getDistricts(provinceData.id);
    }, [isGetProvince, provinceData]);

    const getDistricts = async (provinceId) => {
        try {
            let data = {
                provinceId: provinceId
            };
            let resOfDistrict = await userService.getDistricts(data);
            if (resOfDistrict) {
                setListDistrict(resOfDistrict.data.data);
                setGetProvince(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Get ward data
    useEffect(() => {
        if (isGetDistrict) getWards(districtData.id);
    }, [isGetDistrict, districtData]);

    const getWards = async (districtId) => {
        try {
            let data = {
                districtId: districtId
            };
            let resOfWard = await userService.getWards(data);
            if (resOfWard) {
                setListWard(resOfWard.data.data);
                setGetDistrict(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const resUserInfo = await userService.getDefaultUser(username);
                if (resUserInfo) {
                    const userInfo = resUserInfo.data.data;
                    setShipment({
                        id: userInfo.id,
                        receiverName: userInfo.receiverName,
                        contactNumber: userInfo.contactNumber,
                        description: userInfo.description,
                        street: userInfo.street,
                        ward: userInfo.ward,
                        wardCode: userInfo.wardCode,
                        district: userInfo.district,
                        districtId: userInfo.districtId,
                        province: userInfo.province,
                        provinceId: userInfo.provinceId,
                        isDefault: true,
                        status: "ACTIVE"
                    });
                    setProvinceData({
                        id: userInfo.provinceId,
                        name: userInfo.province,
                    });
                    setDistrictData({
                        id: userInfo.districtId,
                        name: userInfo.district,
                    });
                    setWardData({
                        code: userInfo.wardCode,
                        name: userInfo.ward,
                    })
                }
            } catch (error) {
                console.error("Error fetching user account:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShipment();
    }, [username]);

    const handleChangeProvince = (event) => {
        let provinceId = event.target.value;
        setProvinceData({
            id: provinceId,
            name: listProvince.find(province => province.ProvinceID === provinceId).ProvinceName
        });
        setShipment({
            ...shipment,
            provinceId: provinceId,
            province: listProvince.find(province => province.ProvinceID === provinceId).ProvinceName
        });
        setGetProvince(true);
    }

    const handleChangeDistrict = async (event) => {
        let districtId = event.target.value;
        setDistrictData({
            id: districtId,
            name: listDistrict.find(district => district.DistrictID === districtId).DistrictName
        });
        setShipment({
            ...shipment,
            districtId: districtId,
            district: listDistrict.find(district => district.DistrictID === districtId).DistrictName
        });
        setGetDistrict(true);
    }

    const handleChangeWard = (event) => {
        let wardId = event.target.value;
        setWardData({
            code: wardId,
            name: listWard.find(ward => ward.WardCode === wardId).WardName
        });
        setShipment({
            ...shipment,
            wardCode: wardId,
            ward: listWard.find(ward => ward.WardCode === wardId).WardName
        });
    }

    const handleEditClick = () => {
        setDisplayMode(false);
        setEditMode(true);
    };

    const handleAddClick = () => {
        setDisplayMode(false);
        setAddMode(true);
    };

    const handleSaveClick = async () => {
        console.log(shipment)
        try {
            const res = await userService.updateUser(username, shipment);
            console.log("User data updated successfully:", res.data);
            setEditMode(false);
            setDisplayMode(true);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleCreateClick = async () => {
        try {
            const res = await userService.createUserInfor(username, shipment);
            console.log("New user created successfully:", res.data);
            setAddMode(false);
            setDisplayMode(true);
        } catch (error) {
            console.error("Error creating new user:", error);
        }
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setAddMode(false);
        setDisplayMode(true);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!shipment && !addMode) {
        return <Typography variant="body2">Error loading user account.</Typography>;
    }

    return (
        <UserMainCard>
            {displayMode && (
                <>
                    <DisplayShipment shipment={shipment} />
                    <Button variant="contained" onClick={handleEditClick} sx={{ bgcolor: 'orange', marginRight: 10 + 'px' }}>Chỉnh sửa</Button>
                    <Button variant="contained" onClick={handleAddClick} sx={{ bgcolor: 'green' }}>Thêm mới</Button>
                </>
            )}
            {editMode && (
                <EditShipment
                    shipment={shipment}
                    setShipment={setShipment}
                    setProvinceData={setProvinceData}
                    listProvince={listProvince}
                    listDistrict={listDistrict}
                    listWard={listWard}
                    provinceData={provinceData}
                    districtData={districtData}
                    wardData={wardData}
                    handleChangeProvince={handleChangeProvince}
                    handleChangeDistrict={handleChangeDistrict}
                    handleChangeWard={handleChangeWard}
                    handleSaveClick={handleSaveClick}
                    handleCancelClick={handleCancelClick}
                />
            )}
            {addMode && (
                <CreateNewShipment
                    newShipment={newShipment}
                    setNewShipment={setNewShipment}
                    listProvince={listProvince}
                    listDistrict={listDistrict}
                    listWard={listWard}
                    provinceData={provinceData}
                    districtData={districtData}
                    wardData={wardData}
                    handleChangeProvince={handleChangeProvince}
                    handleChangeDistrict={handleChangeDistrict}
                    handleChangeWard={handleChangeWard}
                    handleCreateClick={handleCreateClick}
                    handleCancelClick={handleCancelClick}
                />
            )}
        </UserMainCard>
    );
};

export default UserAccount;