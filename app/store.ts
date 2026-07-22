import resumeReducer from '@/features/resume/resume.slice';
import resumesReducer from '@/features/resumes/resumes.slice';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedResumeReducer = persistReducer(
  {
    key: 'resume',
    storage,
  },
  resumeReducer,
);

const persistedResumesReducer = persistReducer(
  {
    key: 'resumes',
    storage,
  },
  resumesReducer,
);

const store = configureStore({
  reducer: {
    resume: persistedResumeReducer,
    resumes: persistedResumesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
