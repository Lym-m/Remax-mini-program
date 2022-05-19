/* eslint-disable @typescript-eslint/no-explicit-any */
type EventFunction = (e: any) => any;

declare module '@vant/weapp/lib/button' {
    import {ComponentType} from 'react';
    const component: ComponentType<{
        type?: 'primary' | 'info' | 'warning' | 'danger';
        size?: 'normal' | 'large' | 'small' | 'mini';
        color?: string;
        block?: boolean;
        round?: boolean;
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/icon' {
    import {ComponentType} from 'react';
    const component: ComponentType<{
        name: string;
        dot?: boolean;
        info?: string;
        [key: string]: any;
    }>;

    export default component;
}


declare module '@vant/weapp/lib/action-sheet' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/area' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/calendar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/card' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/cell' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/cell-group' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/checkbox' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/checkbox-group' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
        'bind:change'?: (e: any) => void;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/circle' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/col' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/collapse' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/collapse-item' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/common' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/count-down' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/datetime-picker' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/definitions' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/dialog' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/divider' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/dropdown-item' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/dropdown-menu' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/empty' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/field' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
        border?: boolean;
        'bind:input'?: (e: any) => any;
        'bind:blur'?: (e: any) => any;
        'error-message'?: string;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/goods-action' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/goods-action-button' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/goods-action-icon' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/grid' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/grid-item' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/image' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/index-anchor' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/index-bar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/info' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/loading' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/mixins' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/nav-bar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/notice-bar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/notify' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/overlay' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/panel' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/picker' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
        'bind:change'?: EventFunction;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/picker-column' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/popup' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/progress' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/radio' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/radio-group' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
        'bind:change'?: EventFunction;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/rate' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/row' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/search' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/share-sheet' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/sidebar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/sidebar-item' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/skeleton' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/slider' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/stepper' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/steps' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/sticky' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/submit-bar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/swipe-cell' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/switch' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/tab' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/tabbar' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
        'bind:change'?: EventFunction;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/tabbar-item' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/tabs' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
        'bind:change': EventFunction
    }>;

    export default component;
}

declare module '@vant/weapp/lib/tag' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }>;

    export default component;
}

declare module '@vant/weapp/lib/toast' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
        [key: string]: any;
    }> &
        {
            clear: () => void
        };

    export default component;
}

declare module '@vant/weapp/lib/transition' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/tree-select' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/uploader' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}

declare module '@vant/weapp/lib/wxs' {
    import { ComponentType } from 'react';
    const component: ComponentType<{
    }>;

    export default component;
}
