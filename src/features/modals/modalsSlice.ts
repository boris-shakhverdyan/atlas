import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    login: false,
    register: false,
    selection: false,
    changePassword: false,
    toGuide: false,
    order: false,
    avatarEditor: false,
    booking: false,
    successfullyRegister: false,
    menuMobile: false,
    acceptDelete: false,
};
//To do query for getting user by JWT
export const ModalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        handleLogin: (state) => {
            state.login = !state.login;
        },
        setMenuMobile: (state, action) => {
            state.menuMobile = !state.menuMobile;
        },
        handleRegister: (state) => {
            state.register = !state.register;
        },
        handleToGuide: (state) => {
            state.toGuide = !state.toGuide;
        },
        handleAcceptDelete: (state) => {
            state.acceptDelete = !state.acceptDelete;
        },
        handleSelection: (state) => {
            state.selection = !state.selection;
        },
        handleAvatarEditor: (state) => {
            state.avatarEditor = !state.avatarEditor;
        },
        handleBooking: (state) => {
            state.booking = !state.booking;
        },
        setBooking: (state, action: PayloadAction<boolean>) => {
            state.booking = action.payload;
        },
        handleChangePasswordModal: (state) => {
            state.changePassword = !state.changePassword;
        },
        handleOrder: (state) => {
            state.order = !state.order;
        },
        handleSuccessRegister: (state) => {
            state.successfullyRegister = !state.successfullyRegister;
        },
    },
});

export const modalsReducer = ModalsSlice.reducer;
export const {
    handleLogin,
    handleRegister,
    handleAcceptDelete,
    handleBooking,
    handleSelection,
    handleAvatarEditor,
    handleToGuide,
    handleOrder,
    setBooking,
    handleChangePasswordModal,
    setMenuMobile,
    handleSuccessRegister,
} = ModalsSlice.actions;
