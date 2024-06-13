// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import productService from "service/productServices";
import { useEffect, useState } from "react";


// ==============================|| SAMPLE PAGE ||============================== //

const Category = () => {
    const [list, setList] = useState([]);
    const [update, setUpdate] = useState();
    useEffect(() => {
        productService.getAllCategory().then((res) => {
            setList(res.data)
        });
    }, []);

    const readStatus = (status) => {
        if (!status) return 'Không hoạt động';
        else return status;
    }

    const handleUpdate = () => {

    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên sách</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.description}</td>
                                    <td>
                                        {readStatus(data.status)}
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-delete"
                                            style={{
                                                backgroundColor: "#FF4B4B",
                                                color: "white",
                                                marginLeft: 1 + "rem"
                                            }}>Xóa</button>
                                    </td >
                                </tr >
                            );
                        })
                    }
                </tbody >
            </table >
        </>
    )
}

export default Category;