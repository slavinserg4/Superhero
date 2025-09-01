import SuperHeroes from "../../components/Superheroes/SuperHeroes";
import "./StyleForHomePage.css";

const HomePage = () => {
    return (
        <div className={"HomeDiv"}>
            <h1>SuperHeroes</h1>
            <SuperHeroes/>
        </div>
    );
};

export default HomePage;