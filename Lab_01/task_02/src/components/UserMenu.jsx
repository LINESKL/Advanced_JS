import {useUser} from "./UserContext.jsx";

const UserMenu = () => {
    const { user, permissions } = useUser();

    return (
        <div style={{ marginTop: '10px', border: '1px dashed gray' }}>
            <h3>User Menu</h3>
            <p>Email: {user.email}</p>
            <p>Can Edit: {permissions.canEdit ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default UserMenu;
