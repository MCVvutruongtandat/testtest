"use strict";

/* Package System */
import { configureStore } from '@reduxjs/toolkit';

/* Application */
import statusReducer from '@features/Status';
import accountReducer from '@features/Account';
import languageReducer from '@features/Language';

const store = configureStore({
	reducer: {
		status: statusReducer,
		account: accountReducer,
		language: languageReducer,
	},
});

export default store;