import React, {useEffect, useState} from 'react';
import styles from './account.less';
import {Image, View, Text, getStorage, showToast} from 'remax/wechat';
import VanNavBar from '@vant/weapp/lib/nav-bar';
import VanTabs from '@vant/weapp/lib/tabs';
import VanTab from '@vant/weapp/lib/tab';
import VanGrid from '@vant/weapp/lib/grid';
import VanGridItem from '@vant/weapp/lib/grid-item';
import VanPopup from '@vant/weapp/lib/popup';
import VanField from '@vant/weapp/lib/field';
import Toast from '@vant/weapp/lib/toast';
import VanDatetimePicker from '@vant/weapp/lib/datetime-picker';
import clsx from 'clsx';
import {CALCULATOR_ITEM, INCOME_ITEM, SPEND_ITEM} from '@/utils/constant';
import {useEnhancedFormik} from "@/hooks/validator";
import {useFormik} from "formik";
import {formatDateTime} from "@/utils/util";
import usePageBack from "@/hooks/use-page-back";
import {addBudget} from "@/api/bill";

export default function Account(): JSX.Element {
    const [userId, setUserId] = useState(0);
    const [active, setActive] = useState(0);
    const [activeItem, setActiveItem] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('现在');
    const [dateTimePopup, setDateTimePopup] = useState(false);

    const formik = useFormik({
        initialValues: {
            remark: ''
        },
        async onSubmit() {
            const param = {
                userId: '',
                type: '',
                typeName: '',
                time: date === '现在' ? formatDateTime(new Date().getTime()) : date,
                remark: formik.values.remark,
                value: amount,
            };
            console.log(param);
        }
    });

    const onSubmit = () => {
        const param = {
            userId: userId,
            type: active,
            typeName: activeItem,
            time: date === '现在' ? formatDateTime(new Date().getTime()) : date,
            remark: formik.values.remark,
            value: amount,
        };
        addBudget(param).then(res => {
            if(res.code === '0'){
                cancel();
                showToast({ icon: 'success', title: '操作成功！'});
            }
        });
    };

    const {handleChange, handleBlur} = useEnhancedFormik(formik);

    useEffect(() => {
        cancel();
        getStorage({ key: 'userInfo' }).then(res => {
            setUserId(res.data.id);
        }).catch(e => console.log(e));
    }, [active]);

    usePageBack(() => {
        console.log('调用数据接口');
    });

    const tabChange = (event: any) => {
        setActive(event.detail.index);
    };

    const cancel = () => {
        setActiveItem('');
        setDateTimePopup(false);
        setShowPopup(false);
    };

    const changeSelect = (item: string): void => {
        setActiveItem(item);
        setShowPopup(true);
    };

    const onClose = () => {
        setShowPopup(false);
    };

    const calculatorAmount = (val: string) => {
        if (amount.indexOf('.') > -1 && val === '.') {
            return;
        }
        if (amount.indexOf('.') > -1 && amount.split(".")[1].length >= 2 && val !== 'del') {
            return;
        }
        if (val === 'del') {
            setAmount(amount.substring(0, amount.length - 1))
        } else {
            setAmount(amount + val);
        }
    };

    const confirmTime = (event: any) => {
        setDate(formatDateTime(event.detail));
        setDateTimePopup(false);
    };

    const spend = () => {
        return (
            <VanGrid square column-num="4">
                {
                    SPEND_ITEM.map(item => {
                        return (
                            <VanGridItem use-slot key={item.id} bind:click={() => {
                                changeSelect(item.label)
                            }}>
                                <View className={activeItem === item.label ? styles.activeItem : styles.commonItem}>
                                    <Image
                                        className={styles.itemIcon}
                                        mode="aspectFit"
                                        src={item.icon}
                                    />
                                </View>
                                <Text className={styles.itemLabel}>{item.label}</Text>
                            </VanGridItem>
                        )
                    })
                }
            </VanGrid>
        )
    };
    const income = () => {
        return (
            <VanGrid square column-num="4">
                {
                    INCOME_ITEM.map(item => {
                        return (
                            <VanGridItem use-slot key={item.id} bind:click={() => {
                                changeSelect(item.label)
                            }}>
                                <View className={activeItem === item.label ? styles.activeItem : styles.commonItem}>
                                    <Image
                                        className={styles.itemIcon}
                                        mode="aspectFit"
                                        src={item.icon}
                                    />
                                </View>
                                <Text className={styles.itemLabel}>{item.label}</Text>
                            </VanGridItem>
                        )
                    })
                }
            </VanGrid>
        )
    };
    const calculator = () => {
        return (
            <VanGrid direction="horizontal" column-num="4">
                {
                    CALCULATOR_ITEM.map(item => {
                        if (item.id === 31) {
                            return (
                                <View hover-class={styles.hover_click}>
                                    <VanGridItem use-slot key={item.id} bind:click={() => {
                                        calculatorAmount(item.value)
                                    }}>
                                        <Text className={clsx(styles.keyLabel)}>{item.label}</Text>
                                    </VanGridItem>
                                </View>
                            )
                        } else {
                            return (
                                <View hover-class={styles.hover_click}>
                                    <VanGridItem use-slot key={item.id} bind:click={() => {
                                        calculatorAmount(item.value)
                                    }}>
                                        <Text className={styles.keyLabel}>{item.label}</Text>
                                    </VanGridItem>
                                </View>
                            )
                        }
                    })
                }
            </VanGrid>
        )
    };
    return (
        <View className={styles.account}>
            {
                showPopup && <VanNavBar custom-class={styles.nav} title="记一笔" left-arrow bind:click-left={cancel}/>
            }
            {
                !showPopup && <VanNavBar custom-class={styles.nav} title="记一笔" />
            }
            <VanTabs active={active} type="line" nav-class={styles.nav} bind:click={tabChange}>
                <VanTab title="支出">
                    <View className={clsx(styles.tabs, showPopup ? styles.short : styles.long)}>
                        {spend()}
                    </View>
                </VanTab>
                <VanTab title="收入">
                    <View className={styles.tabs}>
                        {income()}
                    </View>
                </VanTab>
            </VanTabs>
            <VanPopup
                show={showPopup}
                position="bottom"
                overlay={false}
                custom-style="height: 35%;"
                bind:close={onClose}>
                <View className={styles.popupContent}>
                    <View className={styles.row}>
                        <View className={styles.remark}>
                            <VanField label='备注:'
                                      title-width="35"
                                      value={formik.values.remark}
                                      bind:input={handleChange('remark')}
                                      bind:blur={handleBlur('remark')}/>
                        </View>
                        <View className={styles.amount}>
                            {amount}
                        </View>
                    </View>
                    {calculator()}
                    <View className={styles.popupFooter}>
                        <View className={clsx(styles.footerItem, styles.white)} hover-class={styles.hover_click} onClick={() => {setDateTimePopup(true)}}>{date}</View>
                        <View className={clsx(styles.footerItem, styles.gold)} hover-class={styles.hover_btn_click} onClick={onSubmit}>完成</View>
                    </View>
                </View>
            </VanPopup>
            <VanPopup
                show={dateTimePopup}
                position="bottom"
                overlay={false}
                close-on-click-overlay
                custom-style="height: 35%;"
                bind:close={onClose}>
                <VanDatetimePicker
                    type="datetime"
                    value={new Date().getTime()}
                    max-date={new Date().getTime()}
                    bind:confirm={confirmTime}
                    bind:cancel={() => {setDateTimePopup(false)}}
                />
            </VanPopup>
        </View>
    );
}
