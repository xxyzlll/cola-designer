import request from '@/utils/HttpUtil'
import { baseUrl } from '/env'

export function listGroupAllApi() {
    return request({
        url: baseUrl+'/imgGroup/listAll',
        method: 'get',
    })
}

export function pageListApi(params) {
    return request({
        url: baseUrl+'/imgPool/pageList',
        method: 'get',
        params
    })
}
