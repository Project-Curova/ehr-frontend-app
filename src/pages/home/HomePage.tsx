import type { ReactNode } from "react";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router";
import AppointmentIcon from "../../assets/appointment.svg";
import MedicalRecordIcon from "../../assets/medrecord.svg";
import PillIcon from "../../assets/pill.svg";
import { TopNavigation } from "../../components";
import { NAVIGATION, PAGE_PADDING_INLINE } from "../../lib/definitions";

const HomePage = () => {
  return (
    <>
      <div className="h-screen bg-bgpry">
        {/* Top Navigation */}
        <TopNavigation homePage />

        <div className="flex flex-col gap-y-3">
          {/* Alerts Section */}
          <section style={{ paddingInline: `${PAGE_PADDING_INLINE}px` }} className="pt-5 px-pinline ">
            <h2 className="text-xl pb-2 font-bold">Alerts</h2>

            <div className="mt-2 flex flex-col gap-x-3 gap-y-3">
              <AlertBox imgIcon={<FaMessage color="#56677D" />} message="Upcoming Appointment 03:00pm" />
              <AlertBox imgIcon={<FaMessage color="#56677D" />} message="New message from Dr. Smith" />
            </div>
          </section>

          {/* Quick Access Section */}
          <section style={{ paddingInline: `${PAGE_PADDING_INLINE}px` }} className="pt-5 px-pinline ">
            <h2 className="text-xl pb-2 font-bold">Quick Access</h2>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-3">
              <QuickAccessBox title="Appointments" imgIcon={AppointmentIcon} destinationLink={NAVIGATION.APPOINTMENTS}/>
              <QuickAccessBox title="Medical Records" imgIcon={MedicalRecordIcon} destinationLink={NAVIGATION.RECORDS}/>
              <QuickAccessBox title="Billings" imgIcon={PillIcon} destinationLink={NAVIGATION.BILLING}/>
              <QuickAccessBox title="Prescriptions" imgIcon={PillIcon} destinationLink={NAVIGATION.PRESCRIPTIONS} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

type QuickAccessBoxProp = {
  title: string
  imgIcon: string
  destinationLink: string
}

const QuickAccessBox: React.FC<QuickAccessBoxProp> = ({ title, imgIcon, destinationLink }) => {
  return (
    <Link to={destinationLink}>
        <div className="bg-pry w-[120px] h-[100px] sm:w-[180px] sm:h-[120px] rounded-xl shadow flex flex-col justify-center items-center cursor-pointer transition-all hover:shadow-xl">
          <img
            className="w-[8vw] max-w-[40px]"
            src={imgIcon}
            alt="Profile"
          />
          <p className="mt-2 text-sm text-white font-medium">{title}</p>
      </div>
    </Link>
  )
}

type AlertBoxProp = {
  message: string
  imgIcon: ReactNode
}

const AlertBox: React.FC<AlertBoxProp> = ({message, imgIcon}) => {
  return (
    <div className="bg-[#E8EEF9] p-4 flex items-center gap-x-5 rounded sm:w-[80%] md:w-[50%]">
        <div>
          {imgIcon}
        </div>
        <p className="max-w-[40ch]">{message}</p>
    </div>
  ) 
}

export default HomePage
