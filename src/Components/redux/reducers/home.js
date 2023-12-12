import {HOME, VISIBLE} from "../type";

const initialState: any = {
visible:false
}

export const Home_reducer = (State = initialState,action:any) => {
    const {type, payload} = action
    switch (type) {
        case HOME :
            return {
                payload
            }
        default:
            return State
    }
}

export const SetModal = (State = initialState,action:any) => {
    const {type, payload} = action
    switch (type) {
        case VISIBLE :
            return {
                visible:payload
            }
        default:
            return State
    }
}

