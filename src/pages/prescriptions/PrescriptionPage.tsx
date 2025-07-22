import classNames from "classnames";
import { useState } from "react";
import { IoIosAddCircle, IoMdAdd } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdCheckBox } from "react-icons/md";
import DiagnosisImg from "../../assets/diagnosis.svg";
import Modal from "../../components/global/Modal";
import type { MEDICATION, SELECT_PHARMACY } from "../../lib/definitions";


const PrescriptionPage = () => {
    return (
        <div className="h-screen overflow-y-auto bg-bgpry py-4 pt-8">

            <div className="flex flex-col gap-y-2 w-[80%] mx-auto">
                <AddDiagnosis />
                <Medications />
                <ReviewMedication />
            </div>
        </div>
    )
}


const AddDiagnosis: React.FC = () => {
    return (
        <>
            <h2 className="font-medium text-xl">Diagnosis</h2>
            <div className="mt-3 w-full">
                <button className="flex justify-between text-sm items-center border border-gray-200 hover:shadow-sm rounded px-5 py-1 w-full cursor-pointer">
                    <span>Add Diagnostic Information</span>
                    <img className="w-[40px] h-[40px]" src={DiagnosisImg} alt="Add" />
                </button>
            </div>
        </>
    )
}

const Medications: React.FC = () => {

    const meds: MEDICATION[] = [
        {
            name: "Ibuprofen",
            dosage: "500mg, 1 tablet - 3 times a day"
        },
        {
            name: "Amoxicilin",
            dosage: "500mg, 1 capsule - 2 times a day"
        },
        {
            name: "Paracetamol",
            dosage: "500mg, 1 tablet - as needed"
        },
    ]

    return (
        <>
            <div className="w-full flex justify-between items-center mt-5">
                <h2 className="font-medium text-xl">Medications</h2>
                <button className="text-pry w-max flex items-center justify-between gap-x-2 cursor-pointer">
                    <IoMdAdd size={20} />
                    <span className="underline">Add Medication</span>
                </button>
            </div>
            {/* Show meds */}
            <div className="space-y-2">
                {meds.map((med, index) => {
                    return (
                        <div key={index} className="border-b border-gray-200 pb-2 text-gray-600 flex justify-between items-center">
                            <div>
                                <p className="font-bold">{med.name}</p>
                                <p className="text-xs">{med.dosage}</p>
                            </div>
                            <div className="cursor-pointer">
                                <IoCloseCircleSharp />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

const ReviewMedication: React.FC = () => {

    const [selectPharmacy, setSelectPharmacy] = useState<boolean>(false);

    return (
        <>
            <div className="w-full flex justify-between items-center mt-5">
                <h2 className="font-medium text-xl">Review and Select Pharmacy</h2>
            </div>
            <button  onClick={() => setSelectPharmacy(true)} className="border py-2 px-5 w-max border-pry rounded text-sm focus:shadow-sm cursor-pointer">
                Choose a phramacy
            </button>

            <div>
                <button
                    className={classNames({
                        'rounded-xl px-[2rem] py-3 w-full text-PrimaryColor-50 mt-9 bg-pry text-white font-medium text-xl': true,
                    })}
                >Send Prescription</button>
            </div>

            {selectPharmacy && (
                <Modal closeModal={() => setSelectPharmacy(false)}>
                    <SelectPharmacy action={() => setSelectPharmacy(false)} />
                </Modal>
            )}
        </>
    )
}

type SelectPharmacyProp = {
    action: () => void;
}

const SelectPharmacy: React.FC<SelectPharmacyProp> = ({action}) => {

    const list_of_pharmacies: SELECT_PHARMACY[] = [
        {
            name: "Green Valley Pharmacy",
            dist: "0.8 miles away"
        },
        {
            name: "Wellmart Pharmacy",
            dist: "1 mile away"
        },
        {
            name: "MedPlus Pharmacy",
            dist: "1.3 miles away"
        },
    ]


    return (
        <div className="w-[380px]">
            {/* AI Recommendation */}
            <div className="border border-gray-400 rounded p-5 mt-5">
                <div className="text-sm flex justify-between items-center">
                    <div className="text-xs bg-blue-200 text-black border font-medium border-gray-400 rounded p-1">AI</div>
                    <p>AI Recommendation</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <p className="font-medium">HealthFirst Pharmacy</p>
                        <p className="text-gray-500 text-sm">1.2 miles away</p>
                    </div>
                    <div>
                        <MdCheckBox color="#033856" size={30} />
                    </div>
                </div>
            </div>

            {/* List of Pharmacies */}
            <div className=" flex flex-col gap-y-4 mt-7 px-3">
                {list_of_pharmacies.map((pharmacy, index) => {
                    return (
                        <div key={index}>
                            <div className="flex items-start gap-x-3">
                                <div className="mt-1">
                                    <IoIosAddCircle size={30} color="green" />
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <p className="font-medium">{pharmacy.name}</p>
                                        <p className="text-xs text-pry font-normal mt-2">OPEN NOW</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{pharmacy.dist}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

              <div>
                <button
                    onClick={action}
                    className={classNames({
                        'rounded-xl px-[2rem] py-2 w-full text-PrimaryColor-50 mt-9 bg-pry text-white font-medium': true,
                    })}
                >Continue</button>
            </div>
        </div>
    )
}

export default PrescriptionPage
