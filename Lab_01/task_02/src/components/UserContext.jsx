import { createContext, useContext } from "react";

// Создаем сам контекст
const UserContext = createContext();

// Кастомный хук для использования данных
export default const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}