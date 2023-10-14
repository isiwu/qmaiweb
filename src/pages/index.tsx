import { useEffect } from "react";
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from "next/router";
import { useAppDispatch } from "../app/hooks";
import { getUserData, setAuthenticated, setLayoutSubTitle, setLayoutTitle, setUserData, userData, UserDetail } from "../features/user/userSlice";
import axios from "axios";
import { BASE_URL } from "../apiConstant";

interface AppProps {
  completeApplication: boolean, 
  user: UserDetail
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {completeApplication, id} = query;
  console.log("query => ", query);
  let data = {
    data: userData,
    status: false
  }
  if (id) {
    try {
      ({data} = await axios.get(`${BASE_URL}/users/${id}`));
      console.log(data);
    } catch (error) {
      console.log(`Error in getting user data in getServerSideProps due to: ${error.message}`)
    }
  }
  return {
    props: {
      completeApplication: !!completeApplication,
      user: data.data,
    }
  }
};

const IndexPage: NextPage = ({}: AppProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
  
    const navigate = async () => {
      const {completeApplication, id} = router.query;

      if (completeApplication) {
        const dataStore = await dispatch(getUserData(id as string)).unwrap();
        
        dispatch(setUserData(dataStore.data));
        dispatch(setAuthenticated(true));
        dispatch(setLayoutTitle("Membership"));
        dispatch(setLayoutSubTitle("Apply for Membership"));
      }
      if (!completeApplication) await router.push("signin");
      else await router.push("membership");
    };

    navigate();
  }, []);

  return (
    <></>
  )
}

export default IndexPage
