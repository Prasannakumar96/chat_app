import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./slices/student";
import studentsSlice from "./slices/students";
import studentslice from "./slices/studentprofile";
// import courseSlice from "./slices/course";
// import loginSlice from "./slices/login";
// import batchSlice from "./slices/batch";
import sectionSlice from "./slices/section";
import modulesSlice from "./slices/module";
import challengeSlice from "./slices/challenge";
import progressSlice from "./slices/progress";
import authSlice from "./slices/auth";
// import challengeSlice from "./slices/module";
import MessagesSlice from "./slices/chats";
import MentorSlice from "./slices/mentor";

const store = configureStore({
  reducer:{
    chats: MessagesSlice.reducer,
    Mentor: MentorSlice.reducer,
    student:studentSlice.reducer,
    students:studentsSlice.reducer,
    // course:courseSlice.reducer,
    // login:loginSlice.reducer,
    // batch:batchSlice.reducer,
    section:sectionSlice.reducer,
    modules:modulesSlice.reducer,
    challenges:challengeSlice.reducer,
    progress:progressSlice.reducer,
    auth: authSlice.reducer,
    // studentprofile: studentslice.reducer,
  }
})

export default store;