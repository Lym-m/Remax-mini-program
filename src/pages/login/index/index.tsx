import React from 'react';
import styles from "./index.css";
import VanButton from "@vant/weapp/lib/button";
import {View, redirectTo, setStorage} from "remax/wechat";
import VanField from '@vant/weapp/lib/field';
import Toast from '@vant/weapp/lib/toast';
import {useFormik} from "formik";
import {usePageEvent} from 'remax/macro';
import {useEnhancedFormik, useSchema} from '@/hooks/validator';
import {checkAuthState, getAuthState, setAuthState} from '@/utils/request';
import {login} from "@/api/system";

export default function Login(): JSX.Element {
    const schema = useSchema({
        account: [
            {type: 'string', required: true, message: '用户名不能为空!'},
            {type: 'string', max: 20, message: '用户名长度不能超过20位！'}
        ],
        password: [
            {type: 'string', required: true, message: '密码不能为空!'},
            {type: 'string', max: 20, message: '密码长度不能超过20位！'}
        ],
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            account: ''
        },
        validationSchema: schema,
        async onSubmit() {
            await next();
        }
    });

    const {handleChange, handleBlur, errorMessage} = useEnhancedFormik(formik);

    const next = async () => {
        try {
            console.log(formik.values);
            login(formik.values).then(res => {
               if(res.code === '0')
                console.log(res);
                setAuthState({jwt: res.data.token, headAttr: 'token', isAdmin: ''});
                setStorage({ key: 'userInfo', data: res.data }).catch(e => console.error(e));
                redirectTo({url: '/pages/main/index/index'});
            });
        } catch (e) {
            Toast.fail('登录失败');
            return;
        }
    };

    usePageEvent('onShow', async () => {
        const isLogin = await checkAuthState();
        // 预留权限
        // const authState = getAuthState();
        if (isLogin /*&& authState.data.systemType*/) {
            redirectTo({
                url: '/pages/main/index/index'
            });
        }
    });

    return (
        <View className={styles.login}>
            <View className={styles.loginForm}>
                <View className={styles.field}>
                    <View className={styles.label}>账号</View>
                    <VanField label='' title-width={0} border custom-style={{marginLeft: '-15px'}}
                              placeholder="请输入账号"
                              placeholder-style="color: #d3d5db; font-size: 18px;"
                              value={formik.values.account}
                              bind:input={handleChange('account')}
                              bind:blur={handleBlur('account')}
                              error-message={errorMessage('account')}/>
                </View>
                <View className={styles.field}>
                    <View className={styles.label}>密码</View>
                    <VanField label='' title-width={0} border password custom-style={{marginLeft: '-15px'}}
                              placeholder="请输入密码"
                              placeholder-style="color: #d3d5db; font-size: 18px;"
                              bind:input={handleChange('password')}
                              bind:blur={handleBlur('password')}
                              error-message={errorMessage('password')}/>
                </View>
                <VanButton class={styles.button} block round color="#1988f7" bind:click={formik.handleSubmit}>登录</VanButton>
            </View>
        </View>
    )
}
