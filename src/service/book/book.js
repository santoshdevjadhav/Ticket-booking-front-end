import baseService from '../baseservice'
export function get_theatre(){
   debugger
   return baseService.get('/get_movie')
}
export function update_movie(credential){
   debugger
   return baseService.patch('/update_seats/'+credential.id,credential)
}
