import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../apiConstant";
interface MembershipState {
  //membershipData: MembershipData,
  application: boolean,
  applicationType: string,
  reviewApplication: boolean,
  makePayment: boolean,
  showPaymentModal: boolean,
  auditRecord: {
    _id: string,
    name: string,
    info: string,
    doc: string,
    status: string,
  }[],
  status: "idle" | "loading" | "completed" | "failed",
  error: boolean,
  errorData: {
    status: boolean,
    data: string,
  },
};
interface MembershipApplicationData {
  id: string,
  payload: FormData
};
interface ResponseData {
  status: number,
  data: string,
}
interface CompleteApplicationData {
  id: string,
  payload: {
    amount: number,
    transactionId: string,
    type: string,
    date: Date,
  }
}
interface AddAuditData {
  userId: string,
  payload: FormData,
}
const initialState: MembershipState  = {
  application: typeof window !== "undefined"?localStorage.getItem("application")?JSON.parse(localStorage.getItem("application")):false:false,
  applicationType: typeof window !== "undefined"?localStorage.getItem("applicationType")?JSON.parse(localStorage.getItem("applicationType")):"":"",
  reviewApplication: typeof window !== "undefined"?localStorage.getItem("reviewApplication")?JSON.parse(localStorage.getItem("reviewApplication")):false:false,
  makePayment: typeof window !== "undefined"?localStorage.getItem("makePayment")?JSON.parse(localStorage.getItem("makePayment")):false:false,
  showPaymentModal: false,
  auditRecord: [{_id: "", name: "", info: "", doc: "", status: ""}],
  status: "idle",
  error: false,
  errorData: {
    status: false,
    data: "",
  }
};
export const applyForMemeberShip = createAsyncThunk("membership/application", async (data: MembershipApplicationData) => {
  const {id, payload} = data;
  try {
    const {data} = await axios.post<ResponseData>(`${BASE_URL}/memberships/${id}/apply`, payload);
    return data
  } catch (error) {
    console.log(`Error membership application due to: ${error.response.data.data}`);
    return error.response.data;
  }
});
export const completeMembershipApplication = createAsyncThunk("membership/complete-application", async (data: CompleteApplicationData) => {
  const {id, payload} = data;
  try {
    const {data} = await axios.put<ResponseData>(`${BASE_URL}/memberships/${id}/complete-application`, payload);
    return data
  } catch (error) {
    console.log(`Error membership application due to: ${error.response.data.data}`);
    return error.response.data;
  }
});
export const addAudit = createAsyncThunk("membership/addAudit", async (auditData: AddAuditData) => {
  const {userId, payload} = auditData;
  try {
    const { data } = await axios.post(`${BASE_URL}/memberships/${userId}/add-audit`, payload);
    return data;
  } catch (error) {
    console.log(`Error in adding audit due to: ${error.message}`);
    return error.response.data;
  }
});
export const getAuditRecord = createAsyncThunk("membership/getAuditRecord", async (userId: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/memberships/${userId}/audit-record`);
    return data;
  } catch (error) {
    console.log(`Error in getting the user audit records due to: ${error.message}`);
    return error.response.data;
  }
});
// export const viewAudit = createAsyncThunk("membership/viewAudit", () => {})
const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    setApplication: (state, action: PayloadAction<boolean>) => {
      state.application = action.payload;
      localStorage.setItem("application", JSON.stringify(action.payload));
    },
    setApplicationType: (state, action: PayloadAction<string>) => {
      state.applicationType = action.payload;
      localStorage.setItem("applicationType", JSON.stringify(action.payload));
    },
    setReviewApplication: (state, action: PayloadAction<boolean>) => {
      state.reviewApplication = action.payload;
      localStorage.setItem("reviewApplication", JSON.stringify(action.payload));
    },
    setMakePayment: (state, action: PayloadAction<boolean>) => {
      state.makePayment = action.payload;
      localStorage.setItem("makePayment", JSON.stringify(action.payload));
    },
    setMembershipApplicationStatus: (state, action: PayloadAction<"idle" | "loading" | "completed" | "failed">) => {
      state.status = action.payload;
    },
    setPaymentModal: (state, action: PayloadAction<boolean>) => {
      state.showPaymentModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(applyForMemeberShip.pending, (state) => {
      state.status = "loading";
    })
    .addCase(applyForMemeberShip.fulfilled, (state, action) => {
      if (!action.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload;
        state.error = true;
      } else {
        state.status = "completed";
      }
    })
    .addCase(completeMembershipApplication.pending, (state) => {
      state.status = "loading";
    })
    .addCase(completeMembershipApplication.fulfilled, (state, action) => {
      if (!action.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload.data;
      } else {
        state.status = "completed";
        //localStorage.setItem("user", JSON.stringify(action.payload.data));
      }
    })
    .addCase(addAudit.pending, (state) => {
      state.status = "loading";
    })
    .addCase(addAudit.fulfilled, (state, action) => {
      if (!action.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload.data;
      } else {
        state.status = "completed";
        //localStorage.setItem("user", JSON.stringify(action.payload.data));
      }
    })
    .addCase(getAuditRecord.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getAuditRecord.fulfilled, (state, action) => {
      if (!action.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload.data;
      } else {
        state.status = "completed";
        state.auditRecord = action.payload.data;
        //localStorage.setItem("user", JSON.stringify(action.payload.data));
      }
    })
  }
})

export const {setApplication,setApplicationType, setReviewApplication, setMakePayment, setPaymentModal} = membershipSlice.actions;

export default membershipSlice.reducer;