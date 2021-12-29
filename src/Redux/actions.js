import { READ } from "./actionTypes";

export const ReadFromFirebase =(data) =>{
    return {
        type: READ,
        payload: {
            data
        }
    }
}