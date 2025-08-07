const MedicalRecordsPage = () => {
    return (
        <div className="h-screen overflow-y-auto bg-bgpry py-4 pt-8">
            <div className="flex flex-col gap-y-2 w-[80%] mx-auto">
                <h2 className="font-medium text-xl">Medical Records</h2>
                <GeneralHealth />

                <div className="mt-5">
                    <RecentHistory />
                </div>
            </div>
        </div>
    )
}


const GeneralHealth: React.FC = () => {
    return (
        <div className="rounded bg-[#F2F5F7] p-5 w-max mt-3">
            <h2 className="font-bold text-xl">General Health</h2>
            <div className="mt-3 w-full">
                <p><span className="text-gray-500">Blood Type: </span><span className="font-normal">O+</span></p>
                <p><span className="text-gray-500">Date of Birth: </span><span className="font-normal">11th Jun, 2025</span></p>

            </div>
        </div>
    )
}

const RecentHistory: React.FC = () => {
    return (
        <>
            <h2 className="font-medium">Recent History</h2>
            <div className="flex flex-col gap-y-2 mt-4">
                <RecordBox message="Blood Pressure Checked" date="11th, June 2025" />
                <RecordBox message="Visit Dr. David" date="11th, June 2025" />
                <RecordBox message="Renew medications" date="11th, June 2025" />
            </div>
        </>
    )
}

type RecordBoxProp = {
    message: string,
    date: string
}

const RecordBox: React.FC<RecordBoxProp> = ({ message, date }) => {
    return (
        <div className="bg-[#E8EEF9] p-4 flex justify-between items-center gap-x-5 rounded sm:w-[80%] md:w-[70%]">
            <p className="max-w-[40ch] text-sm">{message}</p>
            <p className="max-w-[40ch] text-sm text-pry">{date}</p>
        </div>
    )
}

export default MedicalRecordsPage
