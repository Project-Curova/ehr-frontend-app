import type { ReactNode } from "react";
import { FaMessage } from "react-icons/fa6";
import { GoBellFill } from "react-icons/go";
import { Link } from "react-router";
import AppointmentIcon from "../../assets/appointment.svg";
import MedicalRecordIcon from "../../assets/medrecord.svg";
import PillIcon from "../../assets/pill.svg";
import AvatarImg from "../../assets/profile/user-default.svg";
import { NAVIGATION, PAGE_PADDING_INLINE } from "../../lib/definitions";

const HomePage = () => {
  return (
    <>
      <div className="h-screen bg-bgpry">
        {/* Top Navigation */}
        <TopNavigation />

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
              <QuickAccessBox title="Add Patient" imgIcon={AppointmentIcon} destinationLink={NAVIGATION.APPOINTMENTS} />
              <QuickAccessBox title="Schedule" imgIcon={MedicalRecordIcon} destinationLink={NAVIGATION.APPOINTMENTS} />
              <QuickAccessBox title="Upload Records" imgIcon={PillIcon} destinationLink={NAVIGATION.BILLING} />
              <QuickAccessBox title="Generate Reports" imgIcon={PillIcon} destinationLink={NAVIGATION.PRESCRIPTIONS} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

const TopNavigation = () => {
  return (
    <div className="py-3 mb-3 border-b border-b-[#e6e2e2] px-3 flex justify-between">
      <div></div>
      <div className="flex items-center gap-x-5">
        <div className="cursor-pointer">
          <GoBellFill color="#57687E" size={25} />
        </div>
        <img
          className="rounded-full w-[3rem] h-[3rem] object-cover cursor-pointer"
          src={AvatarImg} // Placeholder image for profile
          alt="Profile"
        />
      </div>
    </div>
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

const AlertBox: React.FC<AlertBoxProp> = ({ message, imgIcon }) => {
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