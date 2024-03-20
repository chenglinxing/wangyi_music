import * as actionTypes from './constants';

import {
    getTopBanners
} from "@/services/recommend"


export const changeTopBannerAction = (res) => {
    // type: actionTypes.CHANGE_TOP_BANNERS,
    // topBanners: res.banners

    return dispatch => {
        getTopBanners().then(res => {
            console.log(res, 'res')
        })
    }
}