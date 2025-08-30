import useIsAdmin from "../hooks/useIsAdmin";
import { AdminHomePage, HomePage } from "../pages";

const HomePageLayout = () => {

    const isAdmin = useIsAdmin();

    return (
        <div>
            {isAdmin ?
                <AdminHomePage /> : <HomePage />
            }
        </div>
    )
}

export default HomePageLayout
