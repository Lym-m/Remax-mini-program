/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    request as wxRequest,
    showLoading,
    hideLoading,
    getStorage,
    setStorage,
    reLaunch,
    showToast,
} from 'remax/wechat';

export interface Response<T = any> {
    error?: boolean;
    code?: string | number;
    data: T;
    message: string;
    resultMsg?: string;
    status?: number;
    success?: boolean
}

type RequestOption = WechatMiniprogram.RequestOption;
type RequestProps =
    Omit<RequestOption, 'complete' | 'fail' | 'success'> &
    {
        showLoading?: boolean;
        showFailToast?: boolean;
        handleNormalError?: boolean;
    }

const AUTH_STATE_KEY = 'AUTH_STATE_KEY';

const authState = {
    data: {
        jwt: '',
        headAttr: '',
        isAdmin: '',
    },
    refreshed: false
};

export default function request<T>(props: RequestProps): Promise<{ code: string; message: string; data: T }> {
    const {
        showFailToast = true
    } = props;

    return refreshAuthState().then(() => new Promise((resolve, reject) => {
        if (props.showLoading) {
            showLoading({title: '请稍等...', mask: true});
        }
        const authHeader = authState.data.headAttr ? { [authState.data.headAttr]: authState.data.jwt } : {};
        wxRequest({
            ...props,
            url: `${process.env.REMAX_APP_BASE_URL}${props.url}`,
            header: {
                ...authHeader
            },
            async success({data: res, statusCode}) {
                const logout = async () => {
                    await resetAuthState();
                    await new Promise(resolve => {
                        showToast({ icon: 'error', title: '登录已失效！'});
                        setTimeout(resolve, 1500);
                    });
                    // 如果当前已经是登录页，那说明已经跳转过来了，没必要再跳转了。
                    const pages = getCurrentPages();
                    if (pages[pages.length - 1].route.indexOf('pages/login/index/index') >= 0) {
                        reject();
                        return;
                    }
                    reLaunch({ url: '/pages/login/index/index' });
                };
                if (statusCode === 401) {
                    await logout();
                    reject();
                } else if (statusCode >= 400 || statusCode >= 500) {
                    const {code, data, message} = res as any || {};
                    if (code === '402011') {
                        await logout();
                        reject({message, data, code});
                        return;
                    }
                    if (showFailToast) {
                        showToast({ icon: 'error', title: '接口请求失败' });
                    }
                    reject();
                    return;
                }

                const {code, data, message} = res as any;
                if (code === '0') {
                    resolve({code, data, message});
                } else {
                    reject({message, data});
                }
            },
            fail() {
                showToast({ icon: 'error', title: '网络错误！' });
                reject();
            },
            complete(e) {
                /**
                 * 如果是因为code失败的场景并且开启了showFailToast、showLoading，complete执行顺序是在success回调函数之后，
                 * 此时在success回调中的showToast函数才开启就会被hideLoading关闭（这个应该是微信的bug）
                 */
                if (
                    (
                        !(e as any).data // 由于网络问题导致的失败
                    )
                    && showFailToast // 需要使用默认值
                    && props.showLoading
                ) {
                    return;
                }
                if (props.showLoading) {
                    hideLoading();
                }
            }
        });
    }));
}

export function checkAuthState() {
    return refreshAuthState().then(() => !!authState.data.jwt);
}

export function getAuthState() {
    return JSON.parse(JSON.stringify(authState));
}

export function resetAuthState() {
    return setAuthState({
        jwt: '',
        headAttr: '',
        isAdmin: '',
    });
}

export function refreshAuthState(forceRefresh = false) {
    if (!forceRefresh && authState.refreshed) return Promise.resolve();
    return getStorage({ key: AUTH_STATE_KEY }).then(res => {
        authState.data = res.data;
        authState.refreshed = true;
    }).catch(e => console.log(e));
}

export function setAuthState(data: typeof authState.data) {
    authState.data = data;
    authState.refreshed = true;
    return setStorage({ key: AUTH_STATE_KEY, data: authState.data }).catch(e => console.error(e));
}

/*export function getErrorMessageFromData(data?: {message?: string}[]): string | null {
    if (Array.isArray(data) && data.length > 0) {
        return data[0].message || null;
    }
    return null;
}*/
