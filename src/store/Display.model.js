import { createSlice } from "@reduxjs/toolkit";

const handleSetSearchDisplay = (state, payload) => {
    state.searchDisplay = payload;
};
const handleSetMaskDisplay = (state, payload) => {
    state.maskDisplay = payload;
};
const handleSetPreviewListCols = (state, payload) => {
    state.previewListCols = payload;
};
const handleSetMainRef = (state, payload) => {
    state.mainRef = payload;
};

const handleSetMainWidth = (state, { status, width }) => {

    if (!state.mainRef.current) return;

    const mainRef = state.mainRef;
    const wrapWidth = state.mainRef.current.offsetWidth;
    const innerWidth = window.innerWidth;

    const device = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
    };

    const sideBarDisabled = innerWidth > device.lg && innerWidth <= device.xl;
    const previewListDisabled = innerWidth < device.lg;

    if (status && !sideBarDisabled) {
        mainRef.current.style.width = `${wrapWidth - width}px`;
        handleSetMainRef(state, mainRef);
        if (!previewListDisabled) handleSetPreviewListCols(state, 5);
    } else {
        if (sideBarDisabled) handleSetMaskDisplay(state, !!status );
        mainRef.current.style.width = "100%";
        handleSetMainRef(state, mainRef);
        handleSetPreviewListCols(state, 7);
    }
};

export const DisplaySlice = createSlice({
    name: "Display",
    initialState: {
        searchDisplay: false,
        maskDisplay: false,
        previewListCols: 7,
        mainRef: null
    },
    reducers: {
        setSearchDisplay: (state, action) => { handleSetSearchDisplay(state, action.payload) },
        setMaskDisplay: (state, action) => { handleSetMaskDisplay(state, action.payload) },
        setPreviewListCols: (state, action) => { handleSetPreviewListCols(state, action.payload) },
        setMainRef: (state, action) => { handleSetMainRef(state, action.payload) },
        setMainWidth: (state, action) => { handleSetMainWidth(state, action.payload) },
    }
});

export const {
    setSearchDisplay,
    setMaskDisplay,
    setPreviewListCols,
    setMainRef,
    setMainWidth
} = DisplaySlice.actions;

export default DisplaySlice.reducer;