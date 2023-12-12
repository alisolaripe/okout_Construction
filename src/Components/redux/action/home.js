import {HOME, VISIBLE,} from "../type";


 const setHome = (info:any) => {
    return {type: HOME, payload: info };
};

const setModal = (visible:any) => {
    return {type:VISIBLE, payload: visible };
};

export {setHome,setModal}
