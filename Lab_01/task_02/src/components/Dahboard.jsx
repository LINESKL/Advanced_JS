import {useUser} from "./UserContext.jsx";
import Header from "./Header.jsx";

const Dashboard = () => {
    const {user} = useUser();

    return (
        <div style={{padding: '20px', border: '1px solid #ccc'}}>
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}!</p>
            <Header />
        </div>
    );
};

export default Dashboard;