import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../apiConstant";
import { atpData, ATPData, getInActiveTrainees, getPendingTrainees, trainee, TraineeData } from "../atp/atpSlice";
import { type ResponseData, userData as newMemebr, type UserDetail, type ErrorResponseData } from "../user/userSlice";

// type User = Omit<UserDetail, "profileId">;
// interface NewMember extends User {
//   profileId: ProfileData,
// }

export interface MemberData {
  _id: string,
  type: string,
  studyingQMAI: boolean,
  yearsOfWorkExp: number,
  yearsOfSystemExp: number,
  cv: string,
  otherRelevantDocument: {
    url: string,
    name: string,
  },
  membershipId: string,
  cert: {
    url: string,
    issuedAt: string,
    expireAt: string,
    hasExpired: boolean,
    id: number,
  },
  active: boolean,
  pending: boolean,
  new: boolean,
  amount: number,
}

interface AdminState {
  admin: UserDetail,
  atps: ATPData[],
  atpTrainees: TraineeData[],
  layoutTitle: string,
  subTitle: string,
  subSubTitle: string,
  members: UserDetail[],
  pendingMembers: UserDetail[],
  member: MemberData,
  certRes: string,
  status: "idle" | "loading" | "completed" | "failed",
  error: boolean,
}

interface AddCertificate {
  awarding: string,
  certTitle: string,
  certNo: string,
  content: string,

}

export const memberData = {
  _id: "",
  type: "",
  studyingQMAI: false,
  yearsOfWorkExp: 0,
  yearsOfSystemExp: 0,
  cv: "",
  otherRelevantDocument: {
    url: "",
    name: "",
  },
  membershipId: "",
  cert: {
    url: "",
    issuedAt: "",
    expireAt: "",
    hasExpired: false,
    id: 0,
  },
  active: false,
  pending: false,
  new: false,
  amount: 0,
};

const initialState: AdminState = {
  admin: newMemebr,
  atps: [atpData],
  atpTrainees: [trainee],
  members: [newMemebr],
  pendingMembers: [newMemebr],
  member: memberData,
  layoutTitle: typeof window !== "undefined" ? localStorage.getItem("layoutTitle")?JSON.parse(localStorage.getItem("layoutTitle")):"Dashboard":"Dashboard",
  subTitle: typeof window !== "undefined" ? localStorage.getItem("subTitle")?JSON.parse(localStorage.getItem("subTitle")):"":"",
  subSubTitle: typeof window !== "undefined" ? localStorage.getItem("subSubTitle")?JSON.parse(localStorage.getItem("subSubTitle")):"":"",
  certRes: "",
  status: "idle",
  error: false
};

export const getNewMembers = createAsyncThunk("admin/getNewMembers", async () => {
  try {
    const { data } = await axios.get<ResponseData | ErrorResponseData>(`${BASE_URL}/admin/new/members`);

    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in getting the new members due to: ${error.message}`);
    return error.response.data;
  }
});
export const getPendingMembers = createAsyncThunk("admin/getPendingMembers", async () => {
  try {
    const { data } = await axios.get<ResponseData | ErrorResponseData>(`${BASE_URL}/admin/pending/members`);

    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in getting the new members due to: ${error.response.data.data}`);
    return error.response.data;
  }
});
export const getActiveMembers = createAsyncThunk("admin/getActiveMembers", async () => {
  try {
    const { data } = await axios.get<ResponseData | ErrorResponseData>(`${BASE_URL}/admin/active/members`);

    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in getting the new members due to: ${error.response.data.data}`);
    return error.response.data;
  }
});
export const getInactiveMembers = createAsyncThunk("admin/getInactiveMembers", async () => {
  try {
    const { data } = await axios.get<ResponseData | ErrorResponseData>(`${BASE_URL}/admin/inactive/members`);

    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error in getting the new members due to: ${error.response.data.data}`);
    return error.response.data;
  }
});
export const viewMember = createAsyncThunk("admin/viewMember", async (id: string) => {
  try {
    const { data } = await axios.get<MemberData>(`${BASE_URL}/admin/review/users/${id}`);

    return data;
  } catch (error) {
    console.log(`Error in getting the member info due to: ${error.message}`);
    return error.response.data;
  }
});
export const approveApplication = createAsyncThunk("admin/approve-application", async (id: string) => {
  try {
    const {data} = await axios.put(`${BASE_URL}/admin/approve/users/${id}`);
    return data;
  } catch (error) {
    console.log(`Error in approving user membership application due to: ${error.message}`);
    return error.response.data;
  }
});
export const addCertificate = createAsyncThunk("admin/add-certificate", async (certData: AddCertificate) => {
  try {
    const {data} = await axios.post<{data: string, status: number}>(`${BASE_URL}/admin/certificates/new`, certData);

    return data;
  } catch (error) {
    console.log(`Error in adding new certifcate due to: ${error.message}`);
    return error.response.data;
  }
});
export const verifyCertificate = createAsyncThunk("admin/verify-certificate", async (certData: Omit<AddCertificate, "content">) => {
  try {
    const { data } = await axios.post<{data: string, status: number}>(`${BASE_URL}/admin/certificates/verify`, certData)

    return data;
  } catch (error) {
    console.log(`Error in verify certifcate due to: ${error.message}`);
    return error.response.data;
  }
});
export const getATPs = createAsyncThunk("admin/getATPs", async () => {
  try {
    const {data} = await axios.get(`${BASE_URL}/admin/atps`);
    console.log("store ATPS => ", data);
    return data;
  } catch (error) {
    console.log(`Error in getting the atps due to: ${error.message}`);
    return error.response.data;
  }
});
export const getATPActiveTrainees = createAsyncThunk("admin/ATPActiveTrainees", async (atpId: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/admin/atps/${atpId}/active-trainees`);
    return data;
  } catch (error) {
    console.log(`Error in getting ATP active-trainees due to: ${error.message}`);

    return error.response.data;
  }
});
export const getATPInActiveTrainees = createAsyncThunk("admin/ATPInactiveTrainees", async (atpId: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/admin/atps/${atpId}/inactive-trainees`);
    return data;
  } catch (error) {
    console.log(`Error in getting ATP inactive-trainees due to: ${error.message}`);

    return error.response.data;
  }
});
export const getATPPendingTrainees = createAsyncThunk("admin/ATPPendingTrainees", async (atpId: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/admin/atps/${atpId}/pending-trainees`);
    return data;
  } catch (error) {
    console.log(`Error in getting ATP pending-trainees due to: ${error.message}`);

    return error.response.data;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // setLayoutTitle: (state, action: PayloadAction<string>) => {
    //   state.layoutTitle = action.payload;
    //   localStorage.setItem("layoutTitle", JSON.stringify(action.payload));
    // },
    // setLayoutSubTitle: (state, action: PayloadAction<string>) => {
    //   state.subTitle = action.payload;
    //   localStorage.setItem("subTitle", JSON.stringify(action.payload));
    // },
    // setLayoutSubSubTitle: (state, action: PayloadAction<string>) => {
    //   state.subSubTitle = action.payload;
    //   localStorage.setItem("subSubTitle", JSON.stringify(action.payload));
    // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getNewMembers.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getNewMembers.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.members = action.payload.data;
        //state.newMembersData = action.payload.data.newMembers;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(viewMember.pending, (state) => {
      state.status = "loading";
    })
    .addCase(viewMember.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.member = action.payload.data;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(approveApplication.pending, (state) => {
      state.status = "loading";
    })
    .addCase(approveApplication.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        console.log(action.payload.data);
        //state.newMember = action.payload.data;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(getPendingMembers.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getPendingMembers.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.pendingMembers = action.payload.data;
        //state.newMembersData = action.payload.data.newMembers;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(getActiveMembers.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getActiveMembers.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.members = action.payload.data;
        //state.newMembersData = action.payload.data.newMembers;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(getInactiveMembers.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getInactiveMembers.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.members = action.payload.data;
        //state.newMembersData = action.payload.data.newMembers;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(addCertificate.pending, (state) => {
      state.status = "loading";
    })
    .addCase(addCertificate.fulfilled, (state, action: PayloadAction<{data: string, status: number}>) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.certRes = action.payload.data;
        //state.newMembersData = action.payload.data.newMembers;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(verifyCertificate.pending, (state) => {
      state.status = "loading";
    })
    .addCase(verifyCertificate.fulfilled, (state, action: PayloadAction<{data: string, status: number}>) => {
      if (!action?.payload?.status) {
        state.error = true;
        state.status = "failed";
      } else {
        state.certRes = action.payload.data;
        //state.newMembersData = action.payload.data.newMembers;
        state.error = false;
        state.status = "completed";
      }
    })
    .addCase(getATPs.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getATPs.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.atps = action.payload.data;
      state.status = "completed";
    })
    .addCase(getATPActiveTrainees.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getATPActiveTrainees.fulfilled, (state, action) => {
      console.log(action.payload.data)
      state.atpTrainees = action.payload.data;
      state.status = "completed";
    })
    .addCase(getInActiveTrainees.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getInActiveTrainees.fulfilled, (state, action) => {
      state.atpTrainees = action.payload.data;
      state.status = "completed";
    })
    .addCase(getPendingTrainees.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getPendingTrainees.fulfilled, (state, action) => {
      state.atpTrainees = action.payload.data;
      state.status = "completed";
    })
  },
});

//export const {} = adminSlice.actions;

export default adminSlice.reducer;