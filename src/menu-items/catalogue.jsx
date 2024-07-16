import { ProductOutlined, ProjectOutlined, UserOutlined, IdcardOutlined, BookOutlined, InboxOutlined, FileOutlined, SnippetsOutlined } from "@ant-design/icons";

const icons = {
    ProjectOutlined,
    ProductOutlined,
    UserOutlined,
    IdcardOutlined,
    BookOutlined,
    InboxOutlined,
    FileOutlined,
    SnippetsOutlined
}

const catalogue = {
    id: 'catalogue',
    title: 'Danh mục',
    type: 'group',
    children: [
        {
            id: 'order',
            title: 'Đơn hàng',
            type: 'item',
            url: '/admin/userOrder',
            icon: icons.SnippetsOutlined
        },
        {
            id: 'bookPackage',
            title: 'Gói sách',
            type: 'item',
            url: '/admin/bookPackage',
            icon: icons.InboxOutlined
        },
        {
            id: 'bookItem',
            title: 'Dạng sách',
            type: 'item',
            url: '/admin/bookItem',
            icon: icons.FileOutlined
        },
        {
            id: 'book',
            title: 'Sách',
            type: 'item',
            url: '/admin/book',
            icon: icons.BookOutlined
        },
        {
            id: 'genre',
            title: 'Thể loại',
            type: 'item',
            url: '/admin/genre',
            icon: icons.ProductOutlined
        },
        {
            id: 'category',
            title: 'Loại sản phẩm',
            type: 'item',
            url: '/admin/category',
            icon: icons.ProjectOutlined
        },
        {
            id: 'publisher',
            title: 'Nhà xuất bản',
            type: 'item',
            url: '/admin/publisher',
            icon: icons.UserOutlined
        },
        {
            id: 'user',
            title: 'Người dùng',
            type: 'item',
            url: '/admin/user',
            icon: icons.IdcardOutlined
        }
    ]
};

export default catalogue;