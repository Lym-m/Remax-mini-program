import request from "@/utils/request";
import {Response} from '@/utils/request';

interface LoginParam {
    account: string,
    password: string,
}

export async function login(param: LoginParam): Promise<Response> {
    return request({
        method: "POST",
        url: '/system/login',
        data: param,
    })
}
