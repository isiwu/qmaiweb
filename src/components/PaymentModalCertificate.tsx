import { useEffect, useState } from "react";
import classNames from "classnames";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaApplePay, FaGooglePay } from "react-icons/fa";
import { ImPaypal } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ApplicationButton from "./MembershipApplication/ApplicationButton";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { setAlert } from "../features/user/userSlice";

type AppProps = {
  showModal: boolean,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
  handleMakePayment?: () => Promise<void>
}

const PaymentModalCertificate = ({showModal, setModal, handleMakePayment}: AppProps) => {
  const status = useAppSelector(state => state.atp.status);
  const dispatch = useAppDispatch();
  const [closeModal, setClose] = useState(false);
  const onClick = async (evt: React.MouseEvent) => {
    evt.stopPropagation();
    await handleMakePayment();
    setClose(true);

  };
  const createOrder = async (data: any, actions: any) => {
    // await totalPrice
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5",
            // value: "5",
          },
        },
      ],
    });
  };
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async (res: any) => {
      // const { paypal } = res;
      if (res.status.toLowerCase() === "completed") {
        dispatch(setAlert({show: false, status: "completed", message: ""}));
        // enqueueSnackbar("Payment completed successfully", {
        //   variant: "success",
        // });
        // setOrderID(res);

        // axios
        //   .post(`${BASE_URL}post/transaction`, {
        //     amount: price,
        //     paymentType: membership,
        //     transactionId: res.id,
        //     userId: user._Id,
        //   })
        //   .then((res) => console.log(res));
        await handleMakePayment();
        dispatch(setAlert({show: true, status: "completed", message: "action successfull"}))
        setClose(true);
      }
    });
  };

  useEffect(() => {
    if (closeModal) {
      setTimeout(() => {
        setModal(false)
      }, 980)
    }
  }, [closeModal])

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 drop-shadow-2xl overflow-auto">
      <div className={classNames("relative", {
        "animate-slideDown h-96": showModal,
        "animate-slideDown2": closeModal
      })}>
        <div className="flex items-center justify-center">
          <div className="pt-3 pb-7 bg-[#FFFFF5] rounded-lg">
            <div className="flex justify-end mr-10">
              <div className="w-7 h-7 bg-gray-100 rounded-full hover:cursor-pointer" onClick={status==="loading"?()=>{}:() => setClose(!closeModal)}>
                <div className="text-center">
                  <div className="-mt-[5px]">
                    <span className="text-4xl">&times;</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-24">
              <div className="text-center font-[500] text-qmaiGreen text-xl">Trainee Certificate Payment</div>
              <div className="mt-10">
                <div className="w-[450px]" onClick={handleMakePayment}>
                <PayPalButtons
                    createOrder={async (data, actions) => await createOrder(data, actions)}
                    onApprove={async (data, actions) => await onApprove(data, actions)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PaymentModalCertificate;