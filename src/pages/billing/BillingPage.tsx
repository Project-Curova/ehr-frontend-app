import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import AIBulb from "../../assets/ai_bulb.svg";
import { TopNavigation } from "../../components";
import ActionSuccessModal from "../../components/global/ActionSuccessModal";
import Modal from "../../components/global/Modal";
import { NAVIGATION } from "../../lib/definitions";

const BillingPage = () => {

  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState<boolean>(false);

  function onClose() {
    navigate(NAVIGATION.HOME);
  }

  return (
    <>
      <div className="h-screen overflow-y-auto bg-bgpry pb-4">
        {/* Top Navigation */}
        <TopNavigation title="Billings" />

        <div className="flex flex-col gap-y-2 w-[90%] sm:w-[80%] mx-auto">

          <div className="mt-5">
            <h3>Billing Summary</h3>

            <div>
              <div className="flex justify-between text-sm mt-3">
                <p>Application Fee</p>
                <p>$400</p>
              </div>
              <div className="flex justify-between text-sm mt-3">
                <p>Consultation Fee</p>
                <p>$200</p>
              </div>
            </div>

            {/* AI Advisor */}
            <div className="border border-gray-400 rounded px-2 py-3 mt-7">
              <p className="flex items-center gap-x-2">
                <img src={AIBulb} className="w-[20px]" alt="AI Advisor" />
                <span className="">AI-Powered Copayment Advisor</span>
              </p>
              <div className="mt-3 text-sm">
                <ul className="list-disc list-inside">
                  <li>Pay Discounted Copay with £10</li>
                  <li>Expected Insurance Contribution</li>
                </ul>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between mt-5">
              <p className="font-medium">TOTAL</p>
              <p>$600</p>
            </div>

            <button className="bg-pry text-white font-medium w-full max-w-[400px] mx-auto rounded p-3 cursor-pointer mt-7 text-center">
              Pay Now
            </button>

          </div>
        </div>
      </div>

      {successModal && (
        <Modal bare closeModal={() => {
          setSuccessModal(false);
          onClose();
        }}>
          <ActionSuccessModal
            buttonTitle="OK"
            buttonAction={() => {
              setSuccessModal(false);
              onClose();
            }}
            closeModal={() => {
              setSuccessModal(false);
              onClose();
            }}
            altText={"Success"}
            desc={(
              <>
                <h2 className="text-sm text-center font-OpenSans-SemiBold my-6">
                  Payment Successful
                </h2>
                <p className="mt-1">Your payment has been confirmed</p>
              </>
            )}
            imgElement={(
              <div className='text-green-700 flex justify-center'>
                <IoIosCheckmarkCircle size={60} />
              </div>
            )}
          />
        </Modal>
      )}
    </>
  )
}
export default BillingPage
