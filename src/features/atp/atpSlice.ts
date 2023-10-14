/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../apiConstant";

export type ATPData = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  contact: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  interest: string;
  otherInfo: string;
  avatar: string;
};
type CourseData = {
  _id: string;
  name: string;
  info: string;
  atpId: string;
  fee: number;
};
type SignUp = {
  [index: string]: string;
};
export type TraineeData = {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  score: number;
  course: string;
  atpId: string;
  hasPayForCertificate: boolean;
  cert: {
    no: string;
    path: string;
    createdAt: string;
    expireAt: string;
    isCerified: boolean;
    hasExpired: boolean;
  };
};
type ATPState = {
  data: ATPData;
  trainees: TraineeData[];
  courses: CourseData[];
  status: "idle" | "loading" | "completed" | "failed";
  requestError: boolean;
};

export const atpData = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  contact: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  interest: "",
  otherInfo: "",
  avatar: "",
};
export const trainee = {
  _id: "",
  name: {
    first: "",
    last: "",
  },
  email: "",
  score: 0,
  course: "",
  atpId: "",
  hasPayForCertificate: false,
  cert: {
    no: "",
    path: "",
    createdAt: "",
    expireAt: "",
    isCerified: false,
    hasExpired: false,
  },
};
const course = {
  _id: "",
  name: "",
  info: "",
  atpId: "",
  fee: 0,
};
const trainees = [trainee];
const courses = [course];

const initialState: ATPState = {
  data: atpData,
  trainees,
  courses,
  status: "idle",
  requestError: false,
};
export const atpSignup = createAsyncThunk(
  "atp/signup",
  async (payload: SignUp) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/signup`, payload);
      console.log(data);

      return data;
    } catch (error) {
      console.log(`Error in ATP sign up due to: ${error.message}`);

      return error.response.data;
    }
  }
);
export const atpChangePassword = createAsyncThunk(
  "atp/change-password",
  async (changePassData: {
    id: string;
    payload: { oldPassword: string; newPassword: string; email: string };
  }) => {
    const { id, payload } = changePassData;
    try {
      const { data } = await axios.put(
        `${BASE_URL}/atps/${id}/change-password`,
        payload
      );

      return data;
    } catch (error) {
      console.log(
        `Error in changing the ATP password due to; ${error.message}`
      );

      return error.response.data;
    }
  }
);
export const atpUpdateProfile = createAsyncThunk(
  "atp/update-profile",
  async (updateData: { id: string; payload: FormData }) => {
    const { id, payload } = updateData;
    try {
      const { data } = await axios.put(
        `${BASE_URL}/atps/${id}/update-profile`,
        payload
      );

      return data;
    } catch (error) {
      console.log(`Error in updating the ATP profile due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const getATP = createAsyncThunk("atp/getATPData", async (id: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/atps/${id}`);
    return data;
  } catch (error) {
    console.log(`Error in getting the ATP data due to: ${error.message}`);
    return error.response.data;
  }
});
export const courseApplication = createAsyncThunk(
  "atp/course-application",
  async (courseData: {
    atpId: string;
    payload: { name: string; info: string; fee: string; date: Date };
  }) => {
    const { atpId, payload } = courseData;
    try {
      const { data } = await axios.post(
        `${BASE_URL}/atps/${atpId}/course-application`,
        payload
      );
      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const getCourses = createAsyncThunk(
  "atp/getCourse",
  async (atpId: string) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/atps/${atpId}/courses`);
      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const addTrainee = createAsyncThunk(
  "atp/add-trianee",
  async (traineeData: {
    atpId: string;
    payload: {
      firstName: string;
      lastName: string;
      email: string;
      course: string;
    };
  }) => {
    const { atpId, payload } = traineeData;
    try {
      const { data } = await axios.post(
        `${BASE_URL}/atps/${atpId}/add-trainee`,
        payload
      );
      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const addTraineeScore = createAsyncThunk(
  "atp/addTrianeeScore",
  async (traineeData: { atpId: string; traineeId: string; score: string }) => {
    const { atpId, traineeId, score } = traineeData;
    try {
      const { data } = await axios.put(
        `${BASE_URL}/atps/${atpId}/trainees/${traineeId}/add-score`,
        { score }
      );
      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const getNewTrainees = createAsyncThunk(
  "atp/getNewTrainee",
  async (atpId: string) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/atps/${atpId}/new-trainees`
      );

      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const getActiveTrainees = createAsyncThunk(
  "atp/getActiveTrainee",
  async (atpId: string) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/atps/${atpId}/active-trainees`
      );

      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const getInActiveTrainees = createAsyncThunk(
  "atp/getInActiveTrainee",
  async (atpId: string) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/atps/${atpId}/inactive-trainees`
      );

      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const getPendingTrainees = createAsyncThunk(
  "atp/getPendingTrainee",
  async (atpId: string) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/atps/${atpId}/pending-trainees`
      );

      console.log(data);
      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);
export const traineesCertificatePayment = createAsyncThunk(
  "atp/traineesCertificatePayment",
  async (payloadData: { atpId: string; trainees: TraineeData[] }) => {
    const { atpId, trainees } = payloadData;
    try {
      const { data } = await axios.put(
        `${BASE_URL}/atps/${atpId}/certificate-payment`,
        trainees
      );

      return data;
    } catch (error) {
      console.log(`Error in adding new trainee due to: ${error.message}`);
      return error.response.data;
    }
  }
);

const atpSlice = createSlice({
  name: "atp",
  initialState,
  reducers: {
    setATPData: (state, action: PayloadAction<ATPData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(atpSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(atpSignup.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          (state.status = "failed"), (state.requestError = true);
        } else {
          state.data = action.payload.data;
          state.requestError = false;
        }
      })
      .addCase(atpChangePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(atpChangePassword.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.requestError = false;
        }
      })
      .addCase(atpUpdateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(atpUpdateProfile.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.requestError = false;
        }
      })
      .addCase(getATP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getATP.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.data = action.payload.data;
          state.requestError = false;
        }
      })
      .addCase(courseApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(courseApplication.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.requestError = false;
        }
      })
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.courses = action.payload;
          state.requestError = false;
        }
      })
      .addCase(addTrainee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTrainee.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.requestError = false;
        }
      })
      .addCase(addTraineeScore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTraineeScore.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.requestError = false;
        }
      })
      .addCase(getNewTrainees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewTrainees.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.trainees = action.payload.data;
          state.requestError = false;
        }
      })
      .addCase(getPendingTrainees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPendingTrainees.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.trainees = action.payload.data;
          state.requestError = false;
        }
      })
      .addCase(getActiveTrainees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getActiveTrainees.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.trainees = action.payload.data;
          state.requestError = false;
        }
      })
      .addCase(traineesCertificatePayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(traineesCertificatePayment.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.requestError = false;
        }
      })
      .addCase(getInActiveTrainees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getInActiveTrainees.fulfilled, (state, action) => {
        if (!action?.payload?.status) {
          state.status = "failed";
          state.requestError = true;
        } else {
          state.status = "completed";
          state.trainees = action.payload.data;
          state.requestError = false;
        }
      });
  },
});

export const { setATPData } = atpSlice.actions;
export default atpSlice.reducer;
