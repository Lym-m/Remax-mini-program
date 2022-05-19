import React, {useEffect, useState} from 'react';
import styles from './bill.less';
import {Image, View, Text, ScrollView} from 'remax/wechat';
import VanNavBar from '@vant/weapp/lib/nav-bar';
import VanPicker from '@vant/weapp/lib/picker'
import VanPopup from "@vant/weapp/lib/popup";
import VanRow from '@vant/weapp/lib/row';
import VanCol from '@vant/weapp/lib/col';
import clsx from "clsx";
import usePageBack from "@/hooks/use-page-back";

export default function Bill(): JSX.Element {
    const [yearPopupShow, setYearPopupShow] = useState(false);
    const [year, setYear] = useState('2021年');
    const columns = ['2018年', '2019年', '2020年', '2021年', '2022年'];
    const [defaultIndex, setDefaultIndex] = useState(0);

    usePageBack(() => {
        console.log('调用数据接口');
    });

    const tableData = [
        {
            month: '11月',
            income: '0',
            spend: '98340',
            balance: '-98340',
        }, {
            month: '10月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '09月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '08月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '07月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '06月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '05月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '04月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '03月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '02月',
            income: '0',
            spend: '0',
            balance: '0',
        }, {
            month: '01月',
            income: '0',
            spend: '0',
            balance: '0',
        }
    ];

    useEffect(() => {
        const yearNum = new Date().getFullYear();
        columns.forEach((item, index) => {
            if(item.includes(yearNum.toString())) {
                setDefaultIndex(index);
            }
        })
    }, []);


    const onConfirm = (event: any) => {
        const {value, index} = event.detail;
        setDefaultIndex(index);
        setYear(value);
        setYearPopupShow(false);
    };

    const onCancel = () => {
        setYearPopupShow(false);
    };

    return (
        <View className={clsx(styles.bill, 'large-cell')}>
            <VanNavBar custom-class={styles.navBar} title="账单"/>
            <View className={styles.overview}>
                <View className={styles.overviewItem} >
                    <View className={styles.year} hover-class={styles.hover_click} onClick={() => {setYearPopupShow(true)}}>
                        {year}
                        <Image
                            className={styles.downIcon}
                            mode="aspectFit"
                            src="/image/down.png"
                        />
                    </View>
                </View>
                <View className={styles.overviewItem}>
                    结余
                    <View className={styles.balance}>
                        <Text className={styles.balanceInteger}>-98340</Text>
                        <Text>.00</Text>
                    </View>
                </View>
                <View className={styles.overviewItem}>
                    <View className={clsx(styles.incomeSpend, styles.borderRight)}>
                        收入
                        <Text className={styles.moneyNumber}>0.00</Text>
                    </View>
                    <View className={styles.incomeSpend}>
                        支出
                        <Text className={styles.moneyNumber}>98340.00</Text>
                    </View>
                </View>
            </View>
            <View className={styles.table}>
                <VanRow custom-class={styles.tableRow}>
                    <VanCol span="6" custom-class={styles.headCol}>月份</VanCol>
                    <VanCol span="6" custom-class={styles.headCol}>收入</VanCol>
                    <VanCol span="6" custom-class={styles.headCol}>支出</VanCol>
                    <VanCol span="6" custom-class={styles.headCol}>结余</VanCol>
                </VanRow>
                <View className={styles.bodyWrap}>
                    <ScrollView scrollY className={styles.tableBody}>
                        {
                            tableData.map(item => {
                                return (
                                    <VanRow key={item.month} custom-class={styles.tableRow}>
                                        <VanCol span="6" custom-class={styles.bodyCol}>{item.month}</VanCol>
                                        <VanCol span="6" custom-class={styles.bodyCol}>{item.income}</VanCol>
                                        <VanCol span="6" custom-class={styles.bodyCol}>{item.spend}</VanCol>
                                        <VanCol span="6" custom-class={styles.bodyCol}>{item.balance}</VanCol>
                                    </VanRow>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <VanPopup
                show={yearPopupShow}
                position="bottom"
                overlay={true}
                close-on-click-overlay
                custom-style="height: 40%;"
                bind:close={() => {
                    setYearPopupShow(false);
                }}>
                <VanPicker
                    columns={columns}
                    default-index={defaultIndex}
                    show-toolbar={true}
                    bind:confirm={onConfirm}
                    bind:cancel={onCancel}
                />
            </VanPopup>
        </View>
    );
}
