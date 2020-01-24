import {THEATRE_DETAILS,ERROR_IN_THEATRE_DETAILS,UPDATE_ERROR,UPDATE_SEATS} from  '../../../../action/types'
const INTIAL_STATE={
   data:[],
    error_msg:''
}
export default((state=INTIAL_STATE,action)=>{
    switch (action.type) {
        case THEATRE_DETAILS:
            return Object.assign({},state,{data:action.data,error_msg:''})
    case ERROR_IN_THEATRE_DETAILS:
            return Object.assign({},state,{error_msg:action.data})
            case UPDATE_SEATS:
                debugger;
               return {data:state.data.map((val)=>{
                   if(action.data._id==val._id){
                   debugger;
                   return action.data
                   }else
                   return val
               })}   
               case UPDATE_ERROR:
                       return Object.assign({},state,{error_msg:action.data})     
       
            
        default:
            return state;
    }
})