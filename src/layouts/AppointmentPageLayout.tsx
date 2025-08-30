import useIsAdmin from '../hooks/useIsAdmin';
import { AdminAppointmentPage, AppointmentPage } from '../pages';

const AppointmentPageLayout = () => {
const isAdmin = useIsAdmin();

    return (
        <div>
            {isAdmin ?
                <AdminAppointmentPage /> : <AppointmentPage />
            }
        </div>
    )
}

export default AppointmentPageLayout
