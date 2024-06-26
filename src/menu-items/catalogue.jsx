import { ProductOutlined, ProjectOutlined, UserOutlined, IdcardOutlined, BookOutlined } from "@ant-design/icons";

const icons = {
    ProjectOutlined,
    ProductOutlined,
    UserOutlined,
    IdcardOutlined,
    BookOutlined,
}

const catalogue = {
    id: 'catalogue',
    title: 'Danh mục',
    type: 'group',
    children: [
        {
            id: 'book',
            title: 'Sách',
            type: 'item',
            url: '/admin/book',
            icon: icons.BookOutlined
        },
        {
            id: 'bookItem',
            title: 'Loại sách',
            type: 'item',
            url: '/admin/bookItem',
            icon: icons.BookOutlined
        },
        {
            id: 'bookPackage',
            title: 'Gói sách',
            type: 'item',
            url: '/admin/bookPackage',
            icon: icons.BookOutlined
        },
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