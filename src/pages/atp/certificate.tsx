import Head from 'next/head';
import React,{useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ATPDashboardLayout from '../../components/layout/atp/ATPDashbaordLayout';

import ATPCertificate from '../../features/atp/ATPCertificate'
import ViewATPCertificate from '../../features/atp/ViewATPCertificate';
import { setLayoutSubTitle } from '../../features/user/userSlice';
import { NextPageWithLayout } from '../_app';

const Certificate: NextPageWithLayout = () => {
  const title = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  const dispatch = useAppDispatch();
    const handleClick = (text:string) => (evt:React.MouseEvent) => {
        dispatch(setLayoutSubTitle(text))
    } 
  return (
      <div>
      <Head>
        <title>QMSAI |ATP Certificate </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

          <div>
              {title && !subTitle && <ATPCertificate handleClick={handleClick} />}
              {title && subTitle === "View Certificate" && <div> <ViewATPCertificate/> </div>}
              {title && subTitle === "Download Certificate" && <div>hi </div>}
              {title && subTitle === "Share Certificate" && <div>Endaline</div>}
              
          </div>
      </div>
  )
}

Certificate.getLayout = ATPDashboardLayout;
export default Certificate