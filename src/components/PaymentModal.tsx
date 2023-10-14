import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector} from "../app/hooks"
// import { ImPaypal } from "react-icons/im";
// import { BsFillCreditCardFill } from "react-icons/bs";
// import { FaGooglePay, FaApplePay } from "react-icons/fa";
// import ApplicationButton from "./MembershipApplication/ApplicationButton";
import { completeMembershipApplication, setMakePayment, setPaymentModal, setReviewApplication, applyForMemeberShip } from "../features/memberships/membershipSlice";
import { getUserData, setAlert, signout } from "../features/user/userSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";

interface AppProps {
  formData: {
    membershipType: string,
    studyingQMAI: boolean,
    yearsOfWork: string,
    yearsOfSystem: string,
    cv: File,
    otherRDoc: File,
    otherRDocName: string,
  },
  handleChange?: (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleChangeSelect?: (input: string) => (evt: React.ChangeEvent<HTMLSelectElement>) => void,
}

const PaymentModal = ({formData}: AppProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const userStatus = useAppSelector(state => state.user.status);
  const membershipStatus = useAppSelector(state => state.membership.status);
  const applicationType = useAppSelector(state => state.membership.applicationType);
  const router = useRouter();
  // const reviewApplication = useAppSelector(state => state.membership.reviewApplication);
  // const makePayment = useAppSelector(state => state.membership.makePayment);
  const handleMakePayment = async () => {
     //dispatch(setMakePayment(true));

    if (!user?.profileId?.formMembershipPayment && (applicationType !== "graduate auditor membership")) {
      const submitform = new FormData();
      submitform.append("membershipType", formData.membershipType);
      submitform.append("studyingQMAI", JSON.stringify(formData.studyingQMAI));
      submitform.append("yearsOfWorkExp", formData.yearsOfWork);
      submitform.append("yearsOfSystemExp", formData.yearsOfSystem);
      submitform.append("cv", formData.cv);
      submitform.append("otherRDoc", formData.otherRDoc);
      submitform.append("otherRDocName", formData.otherRDocName);

      const data = {
        id: user._id,
        payload: submitform,
      }
  
      try {
        const resData = await dispatch(applyForMemeberShip(data)).unwrap();

        if (!resData?.status) {
          dispatch(signout());
          //window.location.reload();
          await router.push("signin");
          dispatch(setAlert({show: true, status: "failed", message: "an error ocurred. please login to continue."}));
          return window.location.reload();
        }
        //await dispatch(applyForMemeberShip(data)).unwrap()
      } catch (error) {
        console.log(`Error in application form payment due to: ${error.message}`);
      }
  
      
      try {
        await dispatch(getUserData(user._id)).unwrap();
      } catch (error) {
        console.log(`Error getting the user data after form payment due to: ${error.message}`);
      }

      // if (applicationType || !user?.profileId?.applicationApproved) dispatch(setReviewApplication(true));
      //dispatch(setReviewApplication(true));
      localStorage.removeItem("applicationType");
    }
    if (user?.profileId?.formMembershipPayment) {
      const data = {
        id: user?._id,
        payload: {
          amount: 100,
          date: new Date(),
          type: "certificate membership payment",
          transactionId: "hhghgjgh"
        }
      }
      try {
        await dispatch(completeMembershipApplication(data)).unwrap()
      } catch (error) {
        console.log(`Error in completing the user membership certificate payment due to: ${error.message}`);
      }

      try {
        await dispatch(getUserData(user._id)).unwrap();
        dispatch(setAlert({show: true, status: "completed", message: "action successfull"}))
      } catch (error) {
        console.log(`Error getting the user data after the certificate payment due to: ${error.message}`);
      }

      //dispatch(setMakePayment(true));
    }
    // if (user?.profileId?.applicationApproved) {
    //   const data = {
    //     id: user?._id,
    //     payload: "500"
    //   }

    //   try {
    //     await dispatch(completeMembershipApplication(data)).unwrap();
    //   } catch (error) {
    //     console.log(`Error in membership certificate payment due to: ${error.message}`);
    //   }

    //   try {
    //     await dispatch(getUserData(user?._id)).unwrap();
    //   } catch (error) {
    //     console.log(`Error in getting user data due to: ${error.message}`);
    //   }
    // }

    dispatch(setPaymentModal(false));
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
  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(async (res: any) => {
      // const { paypal } = res;
      if (res.status.toLowerCase() === "completed") {
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
        console.log("!")
        await handleMakePayment();
        console.log("!!")
      }
    });
  };
  useEffect(() => {
    window.onclick = function() {
      dispatch(setPaymentModal(false));
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 drop-shadow-2xl overflow-auto">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96">
        <div className="flex items-center justify-center">
          <div className="pt-3 pb-7 bg-[#FFFFF5] rounded-lg animate-fadeIn">
            <div className="flex justify-end">
              <div className="flex items-center justify-center">
                <span className="text-4xl mr-5 hover:cursor-pointer">&times;</span>
              </div>
            </div>
            <div className="px-28">
              {
                !user?.membershipType && <div className="text-center font-[500] text-qmaiGreen text-xl">{applicationType.charAt(0).toUpperCase()+ applicationType.slice(1)} Form Membership Payment</div>
              }
              {/* {
                ((user?.membershipType? user?.membershipType !== "graduate auditor membership":applicationType !== "graduate auditor membership")) && !user?.profileId?.certificateMembershipPayment && <div className="text-center font-[500] text-qmaiGreen text-xl">{applicationType.charAt(0).toUpperCase()+ applicationType.slice(1)} Form Membership Payment</div>
              } */}
              {
                user.profileId.applicationApproved && <div className="text-center font-[500] text-qmaiGreen text-xl">{user?.membershipType?.charAt(0).toUpperCase() + user?.membershipType?.slice(1)} Certificate Membership Payment</div>
              }
              <div className="mt-10">
                <div className="w-[450px]" onClick={handleMakePayment}>
                <PayPalButtons
                    createOrder={async (data, actions) => await createOrder(data, actions)}
                    onApprove={async (data, actions) => await onApprove(data, actions)}
                  />
                </div>
              </div>
              {/* <div className="flex flex-col space-y-3 items-center">
                <div className="flex space-x-3 items-center mt-4 pl-6 bg-[#CCCCCC] py-2 rounded-md text-xl w-[60%] hover:cursor-pointer" onClick={handleClick}>
                  <ImPaypal />
                  <span>Paypal</span>
                </div>
                <div className="flex items-centerr bg-[#CCCCCC] py-2 rounded-md w-[60%] pl-6">
                  <FaGooglePay className="text-4xl" />
                </div>
                <div className="flex items-center bg-[#CCCCCC] py-1 rounded-md w-[60%] pl-6">
                  <FaApplePay className="text-4xl" />
                </div>
                <div className="flex items-center space-x-3 bg-[#CCCCCC] py-2 rounded-md text-xl w-[60%] pl-6">
                  <BsFillCreditCardFill />
                  <span>Card</span>
                </div>
              </div>
              <div className="mt-10">
                <ApplicationButton text="Continue" handleClick={handleClick} disabled={membershipStatus=== "loading"?true:userStatus==="loading"?true:false} />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PaymentModal;