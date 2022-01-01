import { FILTER, READ } from "./actionTypes";

export const ReadFromFirebase = (data) =>{
    return {
        type: READ,
        payload: {
            data
        }
    }
}

export const filteration = (event) => {
    return {
        type: FILTER,
        payload: {
            event
        }
    }
}