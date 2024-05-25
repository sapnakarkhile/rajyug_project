import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Async actions
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const response = await axios.post("/user/register", userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials) => {
    const response = await axios.post("/user/login", credentials);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const response = await axios.post("/user/logout");
  return response.data;
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/refresh-token");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updates) => {
    const response = await axios.put("/user", updates);
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (passwords) => {
    const response = await axios.post("/user/reset-password", passwords);
    return response.data;
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (verificationData) => {
    const response = await axios.post("/user/verify-email", verificationData);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const response = await axios.delete(`/user/${id}`);
  return response.data;
});

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get("/user");
  return response.data;
});

export const getUsersByRole = createAsyncThunk(
  "user/getUsersByRole",
  async (role) => {
    const response = await axios.get(`/users/role/${role}`);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const response = await axios.put(`/user/${userData.id}`, userData);
    return response.data;
  }
);

export const resetPasswordById = createAsyncThunk(
  "user/resetPasswordById",
  async (userData) => {
    const response = await axios.post(
      `/users/reset-password/${userData.id}`,
      userData
    );
    return response.data;
  }
);

export const verifyEmailById = createAsyncThunk(
  "user/verifyEmailById",
  async (userData) => {
    const response = await axios.get(
      `/users/verify-email/${userData.id}`,
      userData
    );
    return response.data;
  }
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (userId) => {
    const response = await axios.delete(`/user/${userId}`);
    return { userId }; // Pass the userId as part of the payload
  }
);

export const getUsersById = createAsyncThunk(
  "user/getUsersById",
  async (userId) => {
    const response = await axios.get(`/user/${userId}`);
    return response.data;
  }
);

export const getUsersByRoleAndId = createAsyncThunk(
  "user/getUsersByRoleAndId",
  async ({ role, userId }) => {
    const response = await axios.get(`/users/role/${role}/${userId}`);
    return response.data;
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    teachers: [], 
    students: [], 
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      builder.addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.meta.arg === "Teacher") {
          state.teachers = action.payload.data; 
        } else if (action.meta.arg === "Student") {
          state.students = action.payload.data; 
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(resetPasswordById.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmailById.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Check if state.users.data exists and is an array before calling filter
        if (state.users.data && Array.isArray(state.users.data)) {
          state.users.data = state.users.data.filter(
            (user) => user._id !== action.payload._id
          );
        }
      })
      .addCase(getUsersById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUsersByRoleAndId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default userSlice.reducer;
