import { useState } from "react";
import UserContext from './UserContext.jsx';

export const UserProvider = ({ children }) => {
    // Имитация данных пользователя
    const [userData] = useState({
        user: {name: 'John Doe', email: 'john.doe@example.com', role: 'admin'},
        permissions: {carEdit: true, canDelete: false, canView: true},
        theme: { darkMode: true, fontSize: '16px'}
    });
    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
}