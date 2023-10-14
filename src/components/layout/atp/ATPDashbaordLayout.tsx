import React, { useState } from "react";
import { DashboardHeader } from "../DashboardHeader";
import MobileSideLinks from "./MobileSideLinks";
import ATPSideLinks from "./ATPSideLinks";

const ATPDashboardLayout = (page: React.ReactElement) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex">
      {/* SIDE NAVIGATION */}
      <div className="w-[243px] hidden lg:block sticky top-0 h-[100vh]">
        <div className="flex h-full">
          <div className="w-[32px] bg-[#004703] h-full"></div>
          <div className="w-full">
            <ATPSideLinks />
          </div>
        </div>
      </div>
      {/* MOBILE SIDE NAVIGATION */}
      <div className="lg:hidden">
        <MobileSideLinks setShowMenu={setShowMenu} showMenu={showMenu} />
      </div>
      {/* PAGE CONTENT */}
      <div className="w-full">
        <div className="w-full">
          <DashboardHeader setShowMenu={setShowMenu} />
        </div>
        <div className="w-full">{page}</div>
      </div>
    </div>
  )
}

export default ATPDashboardLayout;