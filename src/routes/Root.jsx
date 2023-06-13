import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { logdin } from "../data/Atom";
import { useRecoilState } from "recoil";





const Root = () => {
    const [isLoading] = useRecoilState(logdin)
    
    return (
        <>
        <Header/>
        
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;