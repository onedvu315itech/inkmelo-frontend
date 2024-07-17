import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Grid, CircularProgress, IconButton, TextField, Button, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import UserMainCard from "components/UserMainCard";
import userService from "services/userServices";

const styles = {
    card: {
        maxWidth: 600,
        margin: "auto",
        marginTop: 20,
        padding: 20,
        position: "relative",
    },
    avatar: {
        width: 100,
        height: 100,
    },
    editButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    addButton: {
        marginBottom: 10,
    },
    form: {
        width: "100%",
        marginTop: 10,
    },
    submit: {
        margin: "10px 0",

    },
    disabledInput: {
        color: "black",
    },
    largeText: {
        fontSize: '1.25rem', // You can adjust the font size here
    },
};

const UserAccount = () => {
    const [userAccount, setUserAccount] = useState({
        id: "",
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
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [newUserAccount, setNewUserAccount] = useState({
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

    const [provinceData, setProvinceData] = useState({
        id: "",
        name: "",
    })
    const [listProvince, seListProvince] = useState([])

    const [districtData, setDistrictData] = useState({
        id: "",
        name: "",
    })
    const [listDistrict, setListDistrict] = useState([])

    const [wardData, setWardData] = useState({
        id: "",
        name: "",
    })
    const [listWard, setListWard] = useState([])



    const username = sessionStorage.getItem('username');


    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                const resUserInfo = await userService.getDefaultUser(username);
                if (resUserInfo) {
                    const userInfo = resUserInfo.data.data;
                    setUserAccount({
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
                        status: "ACTIVE"
                    });
                }
            } catch (error) {
                console.error("Error fetching user account:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAccount();
    }, [username]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleAddClick = () => {
        setAddMode(true);
    };

    const handleSaveClick = async () => {
        console.log(userAccount)
        try {
            const res = await userService.updateUser(username, userAccount);
            console.log("User data updated successfully:", res.data);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleCreateClick = async () => {
        try {
            console.log(newUserAccount)
            const res = await userService.createUserInfor(username, newUserAccount);
            console.log("New user created successfully:", res.data);

            setAddMode(false);
        } catch (error) {
            console.error("Error creating new user:", error);
        }
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setAddMode(false);
    };

    const handleChange = (event, id) => {
        let copyUser = { ...userAccount }
        copyUser[id] = event.target.value
        setUserAccount({ ...copyUser });
    };

    const handleNewChange = (event, id) => {

        let copyNewUser = { ...newUserAccount }
        copyNewUser[id] = event.target.value
        setNewUserAccount({ ...copyNewUser })
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!userAccount && !addMode) {
        return <Typography variant="body2">Error loading user account.</Typography>;
    }

    return (
        <UserMainCard>
            <Card style={styles.card}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            {!editMode && !addMode && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddClick}
                                    style={styles.addButton}
                                >
                                    Add New
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                            {editMode || addMode ? (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={styles.submit}
                                        onClick={editMode ? handleSaveClick : handleCreateClick}
                                    >
                                        {editMode ? "Save" : "Create"}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={styles.submit}
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <IconButton aria-label="edit" onClick={handleEditClick} style={styles.editButton}>
                                    <EditIcon />
                                </IconButton>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Avatar alt={userAccount?.receiverName || newUserAccount.receiverName} src="" style={styles.avatar} />
                            {editMode ? (
                                <TextField
                                    fullWidth
                                    label="Receiver Name"
                                    name="receiverName"
                                    value={userAccount.receiverName}
                                    onChange={(event) => handleChange(event, 'receiverName')}
                                    variant="outlined"
                                    margin="normal"
                                />
                            ) : addMode ? (
                                <TextField
                                    fullWidth
                                    label="Receiver Name"
                                    name="receiverName"
                                    value={newUserAccount.receiverName}
                                    onChange={(event) => handleNewChange(event, 'receiverName')}
                                    variant="outlined"
                                    margin="normal"
                                />
                            ) : (
                                <Typography variant="h5">{userAccount?.name}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <form style={styles.form}>
                                {editMode || addMode ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="contactNumber"
                                            value={editMode ? userAccount.contactNumber : newUserAccount.contactNumber}
                                            onChange={editMode ? (event) => handleChange(event, 'contactNumber') : (event) => handleNewChange(event, 'contactNumber')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={editMode ? userAccount.description : newUserAccount.description}
                                            onChange={editMode ? (event) => handleChange(event, 'description') : (event) => handleNewChange(event, 'description')}
                                            variant="outlined"
                                            margin="normal"
                                            multiline
                                            rows={3}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            name="address"
                                            value={editMode ? userAccount.street : newUserAccount.street}
                                            onChange={editMode ? (event) => handleChange(event, 'street') : (event) => handleNewChange(event, 'street')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Ward"
                                            name="ward"
                                            value={editMode ? userAccount.ward : newUserAccount.ward}
                                            onChange={editMode ? (event) => handleChange(event, 'ward') : (event) => handleNewChange(event, 'ward')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="WardCode"
                                            name="wardCode"
                                            value={editMode ? userAccount.wardCode : newUserAccount.wardCode}
                                            onChange={editMode ? (event) => handleChange(event, 'wardCode') : (event) => handleNewChange(event, 'wardCode')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="District"
                                            name="district"
                                            value={editMode ? userAccount.district : newUserAccount.district}
                                            onChange={editMode ? (event) => handleChange(event, 'district') : (event) => handleNewChange(event, 'district')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="DistrictId"
                                            name="districtId"
                                            value={editMode ? userAccount.districtId : newUserAccount.districtId}
                                            onChange={editMode ? (event) => handleChange(event, 'districtId') : (event) => handleNewChange(event, 'districtId')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                        <TextField
                                            fullWidth
                                            label="City"
                                            name="city"
                                            value={editMode ? userAccount.province : newUserAccount.province}
                                            onChange={editMode ? (event) => handleChange(event, 'province') : (event) => handleNewChange(event, 'province')}
                                            variant="outlined"
                                            margin="normal"

                                        />

                                        <Select>

                                        </Select>
                                        <TextField
                                            fullWidth
                                            label="Zip Code"
                                            name="zip"
                                            value={editMode ? userAccount.provinceId : newUserAccount.provinceId}
                                            onChange={editMode ? (event) => handleChange(event, 'provinceId') : (event) => handleNewChange(event, 'provinceId')}
                                            variant="outlined"
                                            margin="normal"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Receiver Name:</strong> {userAccount?.receiverName}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Phone Number:</strong> {userAccount?.contactNumber}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Description:</strong> {userAccount?.description}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Address:</strong> {userAccount?.street}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Ward:</strong> {userAccount?.ward}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Ward Code:</strong> {userAccount?.wardCode}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>District:</strong> {userAccount?.district}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>District Id:</strong> {userAccount?.districtId}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>City:</strong> {userAccount?.province}
                                        </Typography>
                                        <Typography variant="h6" style={styles.largeText}>
                                            <strong>Zip Code:</strong> {userAccount?.provinceId}
                                        </Typography>
                                    </>
                                )}
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </UserMainCard>
    );
};

export default UserAccount;
