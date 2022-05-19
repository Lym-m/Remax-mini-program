import React, {useEffect, useState} from 'react';
import styles from './my.less';
import {Image, View, Text, getStorage, reLaunch} from 'remax/wechat';
import VanNavBar from '@vant/weapp/lib/nav-bar';
import VanCell from '@vant/weapp/lib/cell';
import VanButton from '@vant/weapp/lib/button';
import VanCircle from '@vant/weapp/lib/circle';
import clsx from "clsx";
import {resetAuthState} from "@/utils/request";
import {queryBudgetInfo} from "@/api/my";

interface UserInfo {
    address: string,
    age: number,
    headurl: string,
    id: number,
    name: string,
    phone: string,
}

interface BudgetInfo {
    income: number,
    spend: number,
    total: number,
}

export default function My(): JSX.Element {
    const [month, setMonth] = useState('');
    const [rate, setRate] = useState(70);
    const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
    const [budgetInfo, setBudgetInfo] = useState<BudgetInfo>({} as BudgetInfo);

    useEffect(() => {
        setMonth(String(new Date().getMonth() + 1));
        getStorage({ key: 'userInfo' }).then(res => {
            setUserInfo(res.data);
            getBudgetInfo(res.data.id);
        }).catch(e => console.log(e));
    }, []);

    const getBudgetInfo = (id: number) => {
        const param = {
            userId: id,
            date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().length > 2 ? new Date().getMonth() + 1 : '0'+(new Date().getMonth() + 1)}`,
        };
        queryBudgetInfo(param).then(res => {
            if(res && res.data) {
                setBudgetInfo(res.data);
            }
        })
    };

    const logout = async () => {
        await resetAuthState();
        await reLaunch({ url: '/pages/login/index/index' });
    };

    return (
        <View className={styles.my}>
            <VanNavBar custom-class={styles.navBar} title="我的"/>
            <View className={styles.head}>
                <View className={styles.baseInfo}>
                    <Image
                        className={styles.headPhoto}
                        mode="aspectFit"
                        src="/image/default.jpg"
                    />
                    <Text className={styles.name}>{userInfo.name}</Text>
                </View>
                <View className={styles.statistical}>
                    <View className={styles.statisticalItem}>
                        <Text className={styles.number}>0</Text>
                        <Text>已连续打卡</Text>
                    </View>
                    <View className={styles.statisticalItem}>
                        <Text className={styles.number}>1</Text>
                        <Text>总记账天数</Text>
                    </View>
                    <View className={styles.statisticalItem}>
                        <Text className={styles.number}>4</Text>
                        <Text>总记账笔数</Text>
                    </View>
                </View>
            </View>
            <View className={styles.content}>
                <View className={styles.bill}>
                    <VanCell title="账单" is-link border={false}/>
                    <View className={styles.billDetail}>
                        <View className={styles.month}>
                            <Text className={styles.monthNumber}>{month}</Text>月
                        </View>
                        <View className={styles.detail}>
                            <View className={styles.detailItem}>
                                <Text className={styles.itemName}>收入</Text>
                                <Text>{budgetInfo.income}</Text>
                            </View>
                            <View className={styles.detailItem}>
                                <Text className={styles.itemName}>支出</Text>
                                <Text>{budgetInfo.spend}</Text>
                            </View>
                            <View className={styles.detailItem}>
                                <Text className={styles.itemName}>结余</Text>
                                <Text>{budgetInfo.income - budgetInfo.spend}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className={styles.setBudget}>
                    <View className={styles.budgetHead}>
                        <Text>{month}月总预算</Text>
                        <VanButton color="#FFD700" icon="plus" size="small" custom-class={styles.white}>设置预算</VanButton>
                    </View>
                    <View className={styles.budgetDetail}>
                        <VanCircle value={rate} stroke-width="8" size="80" layer-color="#dcdcdc" text={`剩余70%`} />
                        <View className={styles.detailItems}>
                            <View className={clsx(styles.commonItem, styles.border)}>
                                <Text>剩余预算：</Text>
                                <Text>{budgetInfo.total - budgetInfo.spend}</Text>
                            </View>
                            <View className={styles.commonItem}>
                                <Text>本月预算：</Text>
                                <Text>{budgetInfo.total}</Text>
                            </View>
                            <View className={styles.commonItem}>
                                <Text>本月支出：</Text>
                                <Text>{budgetInfo.spend}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View className={styles.footer}>
                <VanButton color="#4169E1" size="large" custom-class={styles.white} bind:click={logout}>退出登录</VanButton>
            </View>
        </View>
    );
}
