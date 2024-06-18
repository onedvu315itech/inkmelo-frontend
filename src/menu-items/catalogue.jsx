import { ProductOutlined, ProjectOutlined, UserOutlined, IdcardOutlined } from "@ant-design/icons";

const icons = {
    ProjectOutlined,
    ProductOutlined,
    UserOutlined,
    IdcardOutlined,
}

const catalogue = {
    id: 'catalogue',
    title: 'Catalogue',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'Người dùng',
            type: 'item',
            url: '/admin/user',
            icon: icons.IdcardOutlined
        },
        {
            id: 'category',
            title: 'Loại sản phẩm',
            type: 'item',
            url: '/admin/category',
            icon: icons.ProjectOutlined
        },
        {
            id: 'genre',
            title: 'Thể loại',
            type: 'item',
            url: '/admin/genre',
            icon: icons.ProductOutlined
        },
        {
            id: 'publisher',
            title: 'Nhà xuất bản',
            type: 'item',
            url: '/admin/publisher',
            icon: icons.UserOutlined
        }
    ]
};

export default catalogue;