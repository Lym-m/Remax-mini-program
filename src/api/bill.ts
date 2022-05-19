import request from "@/utils/request";
import {Response} from '@/utils/request';

interface AddBudgetDetailParam {
    userId: number,
    type: number,
    typeName: string,
    time: string,
    remark: string,
    value: string,
}

interface QueryBillListParam {

}

export async function addBudget(param: AddBudgetDetailParam): Promise<Response> {
    return request({
        method: "POST",
        url: '/bill/create',
        data: param,
    })
}

export async function queryBillList(param: QueryBillListParam): Promise<Response> {
    return request({
        method: "POST",
        url: '/bill/list',
        data: param,
    })
}
