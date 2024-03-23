import {createSlice, PayloadAction} from "@reduxjs/toolkit"
type InitialState={
    value:LikeState;
}
type LikeState={
    islike:boolean;
    id:string;
    author:string;
}
const initialState={
    value:{
        islike:false,
        id:'',
        author:''
    } as LikeState,
} as InitialState;

export const like= createSlice({
    name: 'like',
    initialState,
    reducers: {
        
    }
}) 