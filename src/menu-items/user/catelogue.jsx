import { UserOutlined, SnippetsOutlined } from "@ant-design/icons";

const icons = {
    UserOutlined,
    SnippetsOutlined
}

const catalogue = {
    id: 'catalogue',
    title: 'Danh mục',
    type: 'group',
    children: [
        {
            id: 'account',
            title: 'Tài khoản',
            type: 'item',
            url: '/user/account',
            icon: icons.UserOutlined,
        },
        {
            id: 'order',
            title: 'Đơn hàng',
            type: 'item',
            url: '/user/my-order',
            icon: icons.SnippetsOutlined
        }
    ]
};

export default catalogue;