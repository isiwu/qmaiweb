import { ATPData } from "../atp/atpSlice";
import React from "react";

type AppProps = {
  data?: ATPData
};

const ATP = ({data}: AppProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Name</p>
          <p>{data?.name}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Email</p>
          <p>{data?.email}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Address</p>
          <p>{data?.address}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">City</p>
          <p>{data?.city}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Country</p>
          <p>{data?.country}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Postal Code</p>
          <p>{data?.postalCode}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Interest</p>
          <p>{data?.interest}</p>
        </div>
        <div>
          <p className="text-base md:text-lg lg:text-2xl font-normal md:font-semibold lg:font-bold">Other Information</p>
          <p>{data?.otherInfo}</p>
        </div>
      </div>
    </div>
  )
}

export default ATP