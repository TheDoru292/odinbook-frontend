import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "https://odinbook-backend-iccv.onrender.com";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password, url_handle, profile_picture_url },
    { rejectWithValue }
  ) => {
    try {
      await fetch(`${backendURL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          url_handle,
          profile_picture_url,
        }),
      }).then((res) => res.json());
    } catch (error) {
      if (error.success == false && error.status) {
        return rejectWithValue(error.status);
      } else {
        return rejectWithValue("failed");
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            "https://odinbook-frontend.onrender.com/",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json());

      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user._id);
      return data;
    } catch (err) {
      if (err.success == false && err.status) {
        return rejectWithValue(err.status);
      } else {
        return rejectWithValue("failed");
      }
    }
  }
);
