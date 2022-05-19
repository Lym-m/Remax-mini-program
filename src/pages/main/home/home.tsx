import React, {useEffect, useState} from 'react';
import styles from './home.less';
import {View, Text, Image, ScrollView} from 'remax/wechat';
import VanNavBar from "@vant/weapp/lib/nav-bar";
import VanDatetimePicker from "@vant/weapp/lib/datetime-picker";
import VanPopup from "@vant/weapp/lib/popup";
import {formatDateTime, groupBy} from "@/utils/util";
import VanRow from "@vant/weapp/lib/row";
import VanCol from "@vant/weapp/lib/col";
import {ICON_NAME_MAP, WEEK_DAY_MAP} from "@/utils/constant";
import {queryBillList} from "@/api/bill";

interface TableItem {
    id: number,
    type: number,
    typeName: string,
    value: number,
    date: string,
}

interface ResultTable {
    date: string,
    income: number,
    spend: number,
    data: TableItem[],
}
export default function Home(): JSX.Element {
    const [datePopupShow, setDatePopupShow] = useState(false);
    const [tableData, setTableData] = useState([] as ResultTable[]);
    const [year, setYear] = useState(() => {
        return new Date().getFullYear();
    });
    const [month, setMonth] = useState(() => {
       return new Date().getMonth() + 1;
    });
    const [pageSize, setPageSize] = useState(10);
    const [baseInfo, setBaseInfo] = useState({
        income: 0, spend: 0
    });

    useEffect(() => {
        getDetailDataList();
    }, []);

    const getDetailDataList = () => {
        const param = {
            pageSize: pageSize,
            currentPage: 1,
            time: `${year}-${month.toString().length > 2 ? month : '0'+month}`
        };
        queryBillList(param).then(res => {
            if(res && res.data.list.length > 0) {
                const list = groupBy(res.data.list, (item:TableItem) => {
                    return item.date
                });
                const result = [] as ResultTable[];
                list.forEach(item => {
                    const obj = {
                        date: '',
                        income: 0,
                        spend: 0,
                        data: item,
                    };
                    item.forEach((it: TableItem) => {
                        obj.date = it.date;
                        if(it.type === 1) {
                            obj.income += Number(it.value);
                        } else {
                            obj.spend += Number(it.value);
                        }
                    });
                    result.push(obj);
                });
                let [income, spend] = [0, 0];
                result.forEach(item => {
                    income += Number(item.income);
                    spend += Number(item.spend);
                });
                setBaseInfo({
                    income: income,
                    spend: spend,
                });
                setTableData(result.sort((a, b) => {
                    return b.date.toLowerCase().localeCompare(a.date.toLowerCase());
                }));
            }
        });
    };

    const confirmTime = (event: any) => {
        console.log(event.detail);
        setDatePopupShow(false);
    };
    const formatter = (type: string, value: number) => {
        if (type === 'year') {
            return `${value}年`;
        }
        if (type === 'month') {
            return `${value}月`;
        }
        return value;
    };

    return (
        <View className={styles.home}>
            <VanNavBar custom-class={styles.navBar} title="管家"/>
            <View className={styles.overview}>
                <View className={styles.leftItem}>
                    <Text className={styles.title}>{year}年</Text>
                    <View className={styles.year} hover-class={styles.hover_click} onClick={() => {setDatePopupShow(true)}}>
                        {month.toString().length > 2 ? month : '0'+month}月
                        <Image
                            className={styles.downIcon}
                            mode="aspectFit"
                            src="/image/down.png"
                        />
                    </View>
                </View>
                <View className={styles.rightItem}>
                    <View className={styles.overviewItem}>
                        <Text className={styles.title}>收入</Text>
                        <Text className={styles.moneyNumber}>{baseInfo.income}</Text>
                    </View>
                    <View className={styles.overviewItem}>
                        <Text className={styles.title}>支出</Text>
                        <Text className={styles.moneyNumber}>{baseInfo.spend}</Text>
                    </View>
                </View>
            </View>
            <View className={styles.table}>
                <ScrollView scrollY className={styles.tableBody}>
                    {
                        tableData.map(item => {
                            return (
                                <View className={styles.body} key={item.date}>
                                    <View className={styles.bodyHead}>
                                        <View className={styles.date}>
                                            {item.date.toString().substring(5)}
                                            <Text className={styles.week}>
                                                星期{ WEEK_DAY_MAP[new Date(item.date).getDay()]}
                                            </Text>
                                        </View>
                                        <View>
                                            {
                                                item.income > 0 && (
                                                    <Text>
                                                        收入：{item.income}
                                                    </Text>
                                                )
                                            }
                                            {
                                                item.spend > 0 && (
                                                    <Text className={styles.spend}>
                                                        支出：{item.spend}
                                                    </Text>
                                                )
                                            }
                                        </View>
                                    </View>
                                    {
                                        item.data.map(it => {
                                            return (
                                                <View className={styles.bodyRow} key={it.id}>
                                                    <View className={styles.activeItem}>
                                                        <Image
                                                            className={styles.icon}
                                                            mode="aspectFit"
                                                            src={ICON_NAME_MAP[it.typeName]}
                                                        />
                                                    </View>
                                                    <View className={styles.detail}>
                                                        <Text>{it.typeName}</Text>
                                                        <View>
                                                            {
                                                                it.type === 0 && ('-')
                                                            }
                                                            <Text>{it.value}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>

            {/*{<VanPopup
                show={datePopupShow}
                position="bottom"
                overlay={true}
                close-on-click-overlay
                custom-style="height: 40%;"
                bind:close={() => {
                    setDatePopupShow(false);
                }}>
                <VanDatetimePicker
                    type="date"
                    value={new Date().getTime()}
                    bind:confirm={confirmTime}
                    bind:cancel={() => {setDatePopupShow(false)}}
                    formatter={formatter}
                />
            </VanPopup>}*/}
        </View>
    );
}
