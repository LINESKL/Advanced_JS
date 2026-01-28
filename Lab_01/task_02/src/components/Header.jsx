import UserMenu from './UserMenu.jsx';
import {useUser} from "./UserContext.jsx";

const Header = () => {
    const { user, theme } = useUser();

    return (
        <header style={{ background: theme.darkMode ? '#333' : '#eee', padding: '10px' }}>
            <h2>Header</h2>
            <p>Role: {user.role}</p>
            <UserMenu />
        </header>
    );
};

export default Header;