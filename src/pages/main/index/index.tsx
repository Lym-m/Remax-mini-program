import React, {useState} from 'react';
import {Image, View} from 'remax/wechat';
import styles from './index.less';
import VanTabbar from '@vant/weapp/lib/tabbar';
import VanTabbarItem from '@vant/weapp/lib/tabbar-item';
import Home from '@/pages/main/home/home';
import My from '@/pages/main/my/my';
import Account from "@/pages/main/account/account";
import Bill from '@/pages/main/bill/bill';

export default function OrderIndex(): JSX.Element {
    const [active, setActive] = useState<'home' | 'account' | 'bill' | 'my'>('home');

    let currentTabPage: React.ReactNode;

    switch (active) {
        case 'home': {
            currentTabPage = <Home/>;
            break;
        }
        case 'account': {
            currentTabPage = <Account/>;
            break;
        }
        case 'bill': {
            currentTabPage = <Bill />;
            break;
        }
        case 'my': {
            currentTabPage = <My/>;
            break;
        }
        default: {
            break;
        }
    }

    return (
        <View className={styles.orderIndex}>
            {currentTabPage}
            <VanTabbar safe-area-inset-bottom active={active} bind:change={e => setActive(e.detail)}>
                <VanTabbarItem name="home">
                    <View className={styles.tabbarIconWrap} slot="icon-active">
                        <Image className={styles.tabbarIcon} src="/image/home-active-icon.png" mode="aspectFit"/>
                    </View>
                    <View className={styles.tabbarIconWrap} slot="icon">
                        <Image className={styles.tabbarIcon} src="/image/home-icon.png" mode="aspectFit"/>
                    </View>
                    明细
                </VanTabbarItem>
                <VanTabbarItem name="account">
                    <View className={styles.tabbarIconWrap} slot="icon-active">
                        <Image className={styles.tabbarIcon} src="/image/add-active.png" mode="aspectFit"/>
                    </View>
                    <View className={styles.tabbarIconWrap} slot="icon">
                        <Image className={styles.tabbarIcon} src="/image/add.png" mode="aspectFit"/>
                    </View>
                    记账
                </VanTabbarItem>
                <VanTabbarItem name="bill">
                    <View className={styles.tabbarIconWrap} slot="icon-active">
                        <Image className={styles.tabbarIcon} src="/image/bill-active.png" mode="aspectFit"/>
                    </View>
                    <View className={styles.tabbarIconWrap} slot="icon">
                        <Image className={styles.tabbarIcon} src="/image/bill.png" mode="aspectFit"/>
                    </View>
                    账单
                </VanTabbarItem>
                <VanTabbarItem name="my">
                    <View className={styles.tabbarIconWrap} slot="icon-active">
                        <Image className={styles.tabbarIcon} src="/image/my-active-icon.png" mode="aspectFit"/>
                    </View>
                    <View className={styles.tabbarIconWrap} slot="icon">
                        <Image className={styles.tabbarIcon} src="/image/my-icon.png" mode="aspectFit"/>
                    </View>
                    我的
                </VanTabbarItem>
            </VanTabbar>
        </View>
    );
}
