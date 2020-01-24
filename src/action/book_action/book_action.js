import { THEATRE_DETAILS, ERROR_IN_THEATRE_DETAILS, UPDATE_ERROR, UPDATE_SEATS } from '../types'
import * as theatre_service from '../../service/book/book'
export const list_theatre = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            theatre_service.get_theatre()
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {

                        dispatch({
                            type: THEATRE_DETAILS,
                            data: res.data
                        })
                        return resolve(res.data);

                    }
                }).catch((error) => {

                    dispatch({
                        type: ERROR_IN_THEATRE_DETAILS,
                        data: error.response.data
                    })
                    return reject(error.response.data)
                })

        })
    }
}
export const update_movie_detail = (credential) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            theatre_service.update_movie(credential)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {

                        dispatch({
                            type: UPDATE_SEATS,
                            data: res.data
                        })
                        return resolve(res.data);

                    }
                }).catch((error) => {

                    dispatch({
                        type: UPDATE_ERROR,
                        data: error.response.data
                    })
                    return reject(error.response.data)
                })

        })
    }
}
