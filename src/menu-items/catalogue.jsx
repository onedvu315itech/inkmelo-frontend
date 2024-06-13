import { ProductOutlined, ProjectOutlined, UserOutlined } from "@ant-design/icons";

const icons = {
    ProjectOutlined,
    ProductOutlined,
    UserOutlined,
}

const catalogue = {
    id: 'catalogue',
    title: 'Catalogue',
    type: 'group',
    children: [
        {
            id: 'category',
            title: 'Loại sản phẩm',
            type: 'item',
            url: '/admin/category',
            icon: icons.ProjectOutlined,
            target: true
        },
        {
            id: 'genre',
            title: 'Thể loại',
            type: 'item',
            url: '/admin/genre',
            icon: icons.ProductOutlined,
            target: true
        },
        {
            id: 'publisher',
            title: 'Nhà xuất bản',
            type: 'item',
            url: '/admin/publisher',
            icon: icons.UserOutlined,
            target: true
        }
    ]
};

export default catalogue;