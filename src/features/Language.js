"use strict";

/* Package System */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	content: {}
}

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setContent(state,action){
			state.content = action.payload;
		}
	}
})

export const { setContent } = languageSlice.actions;
export default languageSlice.reducer;