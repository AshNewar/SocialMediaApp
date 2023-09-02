import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  posts: [],
  token: null,
  loggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode == "light" ? "dark" : "light";
    },
    setLoggedIn: (state) => {
      state.loggedIn = true;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.log("User not Exist");
      }
      4;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id == action.payload.posts._id) return action.payload.posts;
        return post;
      });
      state.posts = updatedPost;
    },
  },
});
export const { setMode, setFriends, setLogin, setLogout, setPost, setPosts ,setLoggedIn} =
  authSlice.actions;
export default authSlice.reducer;
