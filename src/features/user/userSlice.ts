import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../apiConstant";
import { atpData } from "../atp/atpSlice";

export type UserDetail = {
  name: {
    first: string,
    last: string,
  },
  email: string,
  phone: string,
  role: string,
  verified: boolean,
  _id: string,
  membershipType: string,
  profileId: ProfileData,
};
export type ProfileData = {
  _id: string,
  dateOfBirth: string,
  academics: {
    title: string,
    discipline: string,
    institution: string,
  }[],
  workExps: {
    workPlace: string,
    title: string,
    startDate: string,
    endDate: string,
  }[],
  avatar: string,
  profileCompleted: boolean,
  hasApplied: boolean,
  applicationReviewed: boolean,
  applicationApproved: boolean,
  formMembershipPayment:boolean,
  certificateMembershipPayment:boolean,
  isCertified: boolean,
  membershipStatus: string,
  memberPayment: number,
}
type ATPData = {
  email: string,
  phone: string,
  role: string,
  verified: boolean,
  _id: string,
  name: string,
  contact: string,
  address: string,
  city: string,
  country: string,
  postalCode: string,
  interest: string,
  otherInfo: string,
}
type SignUp = {
  [index: string]: string,
};
type SignIn = {
  [index: string]: string,
};
type UpdateProfile = {
  id: string,
  payload: FormData
}
export type ResponseData = {
  status: boolean,
  data: UserDetail,
};
export type ErrorResponseData = {
  status: boolean,
  data: string
};
interface UserState {
  data: UserDetail,
  //atpData: ATPData,
  isAuthenticated: boolean,
  status: "idle" | "loading" | "completed" | "failed",
  layoutTitle: string,
  subTitle: string,
  subSubTitle: string,
  requestError: boolean,
  completeApplication: boolean,
  errorData: {
    status: boolean,
    data: string,
  },
  showMenu: boolean,
  alert: {
    show: boolean,
    status: "failed" | "completed"
    message: string,
  }

};
export const userData = {
  name: {
    first: "",
    last: "",
  },
  email: "",
  phone: "",
  role: "user",
  verified: false,
  _id: "",
  membershipType: "",
  profileId: {
    _id: "",
    dateOfBirth: "",
    avatar: "",
    profileCompleted: false,
    hasApplied: false,
    applicationReviewed: false,
    applicationApproved: false,
    certificateMembershipPayment: false,
    formMembershipPayment: false,
    isCertified: false,
    memberPayment: 0,
    membershipStatus: "inactive",
    academics: [
      {
        title: "",
        discipline: "",
        institution: "",
      }
    ],
    workExps: [
      {
        workPlace: "",
        title: "",
        startDate: "",
        endDate: "",
      }
    ],
  }
};
// const atp = {
//   ...atpData,
//   _id: "",
//   role: "",
//   verified: false,
// }

const initialState: UserState = {
  data: typeof window !== "undefined"? localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):userData: userData,
  //atpData: atp,
  isAuthenticated: typeof window !== "undefined"? localStorage.getItem("isAuthenticated")? JSON.parse(localStorage.getItem("isAuthenticated")):false: false,
  status: "idle",
  layoutTitle: typeof window !== "undefined" ? localStorage.getItem("layoutTitle")?JSON.parse(localStorage.getItem("layoutTitle")):"Dashboard":"Dashboard",
  subTitle: typeof window !== "undefined" ? localStorage.getItem("subTitle")?JSON.parse(localStorage.getItem("subTitle")):"":"",
  subSubTitle: typeof window !== "undefined" ? localStorage.getItem("subSubTitle")?JSON.parse(localStorage.getItem("subSubTitle")):"":"",
  requestError: false,
  completeApplication: false,
  errorData: {
    status: false,
    data: ""
  },
  showMenu: false,
  alert: {
    show: false,
    status: "completed",
    message: ""
  }
};
export const signin = createAsyncThunk("user/signin", async (payload: SignIn) => {
  try {
    const { data } = await axios.post<ResponseData | ErrorResponseData>(`${BASE_URL}/users/signin`, payload);

    return data;
  } catch (error) {
    console.log(`Error in user sign in due to: ${error.response.data.data}`);
    //return Promise.reject(error.response.data)
    return error.response.data;
    //return error
  }
});
export const signup = createAsyncThunk("user/signup", async (payload: SignUp) => {

  try {
    const { data } = await axios.post<ResponseData | ErrorResponseData>(`${BASE_URL}/users/signup`, payload);

    return data;
  } catch (error) {
    console.log(`Error in user sign up due to: ${error.response.data.data}`);
    return error.response.data
  }
});
export const checkMailExists = createAsyncThunk("user/checkMailExits", async (payload: {email: string}) => {
  try {
    const {data} = await axios.post<ErrorResponseData>(`${BASE_URL}/users/email-exists`,  payload);

    return data;
  } catch (error) {
    console.log(`Error in checking email existence due to: ${error.message}`);

    return error.response.data;
  }
})
export const verifyEmail = createAsyncThunk("user/verifyEmail", async (payload: string) => {
  try {
    const { data } = await axios.put<ResponseData | ErrorResponseData>(`${BASE_URL}/users/verify-email`, {code: payload});

    return data;
  } catch (error) {
    console.log(`Error in user sign up due to: ${error.response.data.data}`);
    return error.response.data;
  }
})

export const getUserData = createAsyncThunk("user/getUserDate", async (id: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/users/${id}`);
    return data;
  } catch (error) {
    console.log(`Error in fetching user data due to: ${error.response.data.data}`);
    return error.response.data;
  }
})

export const updateProfile = createAsyncThunk("user/updateProfile", async (data: UpdateProfile) => {
  const {id, payload} = data;
  try {
    const { data } = await axios.put<ResponseData | ErrorResponseData>(`${BASE_URL}/users/${id}/update-profile`, payload);

    //console.log(data)
    return data;
  } catch (error) {
    console.log(`Error in user update profile due to: ${error.response.data.data}`);
    return error.response.data;
  }
})

export const usersSlice =  createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDetail>) => {
      state.data = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "completed" | "failed">) => {
      state.status = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem("isAuthenticated", JSON.stringify(action.payload));
    },
    setLayoutTitle: (state, action: PayloadAction<string>) => {
      state.layoutTitle = action.payload;
      localStorage.setItem("layoutTitle", JSON.stringify(action.payload));
    },
    setLayoutSubTitle: (state, action: PayloadAction<string>) => {
      state.subTitle = action.payload;
      localStorage.setItem("subTitle", JSON.stringify(action.payload));
    },
    setLayoutSubSubTitle: (state, action: PayloadAction<string>) => {
      state.subSubTitle = action.payload;
      localStorage.setItem("subSubTitle", JSON.stringify(action.payload));
    },
    signout: () => {
      localStorage.clear();
    },
    setAlert: (state, action: PayloadAction<{show: boolean, status: "completed" | "failed" , message: string}>) => {
      state.alert = action.payload;
    },
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    }
    // setCompleteApplication: (state, action) => {
    //   state.completeApplication = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
    //signin reducers
    .addCase(signin.pending, (state) => {
      state.status = "loading";
      state.alert = state.alert = {show: false, status: "completed", message: ""};
    })
    .addCase(signin.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload;
      } else {
        //console.log(action?.payload?.data)
        // if (action?.payload?.data?.role === "atp") state.atpData = action.payload.data;
        // else state.data = action.payload.data;
        state.data = action.payload.data;
        state.status = "completed";

        localStorage.setItem("user", JSON.stringify(action.payload.data));
      }
    })
    .addCase(signin.rejected, (state) => {
      state.status = "failed";
    })
    //check mail existence reducers
    .addCase(checkMailExists.fulfilled, (state, action: PayloadAction<ErrorResponseData>) => {
      state.errorData = action.payload;
    })
    //signup reducers
    .addCase(signup.pending, (state) => {
      state.status = "loading";
      state.alert = state.alert = {show: false, status: "completed", message: ""};
    })
    .addCase(signup.fulfilled, (state, action) => {
       if (!action.payload.status) {
        state.status = "failed";
        state.errorData = action.payload;
       } else {
        state.data = action.payload.data;
        state.status = "completed";
        localStorage.setItem("user", JSON.stringify(action.payload.data));
       }
    })
    .addCase(signup.rejected, (state) => {
      state.status = "failed";
    })
    //verify email reducers
    .addCase(verifyEmail.pending, (state) => {
      state.status = "loading";
      state.alert = {show: false, status: "completed", message: ""};
    })
    .addCase(verifyEmail.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload;
       } else {
        state.data = action.payload.data;
        state.status = "completed";
       }
    })
    .addCase(verifyEmail.rejected, (state) => {
      state.status = "failed";
    })
    .addCase(updateProfile.pending, (state) => {
      state.status = "loading";
      state.requestError = false;
      state.alert = {show: false, status: "completed", message: ""};
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload;
        state.requestError = true;
       } else {
        state.data = action.payload.data;
        state.status = "completed";
        console.log(action.payload.data)
       }
    })
    .addCase(getUserData.pending, (state) => {
      state.status = "loading";
      state.alert = {show: false, status: "completed", message: ""};

    })
    .addCase(getUserData.fulfilled, (state, action) => {
      if (!action?.payload?.status) {
        state.status = "failed";
        state.errorData = action.payload;
       } else {
        state.data = action.payload.data;
        state.status = "completed";
        localStorage.setItem("user", JSON.stringify(action.payload.data));
       }
    })
  }
});

export const {
  setUserData,
  setStatus, 
  setAuthenticated, 
  setLayoutTitle, 
  setLayoutSubTitle, 
  setLayoutSubSubTitle, 
  signout,
  //setCompleteApplication,
  setAlert,
  setShowMenu,
} = usersSlice.actions;

export default usersSlice.reducer;

