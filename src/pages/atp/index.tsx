import { useEffect } from "react";
import { useRouter } from "next/router";
import ATPDashboardLayout from "../../components/layout/atp/ATPDashbaordLayout";
import { NextPageWithLayout } from "../_app";

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await router.push("atp/dashboard")
    })()
  }, [])

  
  return (
    <></>
  )
}

Index.getLayout = ATPDashboardLayout;
export default Index;