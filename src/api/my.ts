import request from "@/utils/request";

interface QueryBudgetInfoParam {
    userId: number,
    date: string,
}

interface QueryBudgetInfoResult {
    total: number,
    spend: number,
    income: number,
}

export async function queryBudgetInfo(param: QueryBudgetInfoParam) {
    return request<QueryBudgetInfoResult>({
        method: "POST",
        url: '/bill/getBudget',
        data: param,
        showLoading: false
    })
}
