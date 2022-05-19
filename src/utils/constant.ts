export const SPEND_ITEM =  [
    {
        id: 1,
        label: '餐饮',
        icon: '/image/icon/spend/food.png'
    }, {
        id: 2,
        label: '购物',
        icon: '/image/icon/spend/shopping.png'
    }, {
        id: 3,
        label: '日用品',
        icon: '/image/icon/spend/daily.png'
    }, {
        id: 4,
        label: '交通',
        icon: '/image/icon/spend/traffic.png'
    }, {
        id: 5,
        label: '蔬菜',
        icon: '/image/icon/spend/vegetables.png'
    }, {
        id: 6,
        label: '水果',
        icon: '/image/icon/spend/fruit.png'
    }, {
        id: 7,
        label: '运动',
        icon: '/image/icon/spend/sport.png'
    }, {
        id: 8,
        label: '娱乐',
        icon: '/image/icon/spend/entertainment.png'
    }, {
        id: 9,
        label: '服饰',
        icon: '/image/icon/spend/clothes.png'
    }, {
        id: 10,
        label: '美容',
        icon: '/image/icon/spend/beauty.png'
    }, {
        id: 11,
        label: '住房',
        icon: '/image/icon/spend/house.png'
    }, {
        id: 12,
        label: '居家',
        icon: '/image/icon/spend/home.png'
    }, {
        id: 13,
        label: '孩子',
        icon: '/image/icon/spend/child.png'
    }, {
        id: 14,
        label: '长辈',
        icon: '/image/icon/spend/elder.png'
    }, {
        id: 15,
        label: '旅行',
        icon: '/image/icon/spend/travel.png'
    }, {
        id: 16,
        label: '烟酒',
        icon: '/image/icon/spend/smoke.png'
    }, {
        id: 17,
        label: '汽车',
        icon: '/image/icon/spend/car.png'
    }, {
        id: 18,
        label: '医疗',
        icon: '/image/icon/spend/medical.png'
    }, {
        id: 19,
        label: '书籍',
        icon: '/image/icon/spend/books.png'
    }, {
        id: 20,
        label: '宠物',
        icon: '/image/icon/spend/pet.png'
    }, {
        id: 21,
        label: '礼金',
        icon: '/image/icon/spend/amounts.png'
    }, {
        id: 22,
        label: '礼物',
        icon: '/image/icon/spend/gift.png'
    }
]

export const INCOME_ITEM =  [
    {
        id: 23,
        label: '工资',
        icon: '/image/icon/income/salary.png'
    }, {
        id: 24,
        label: '兼职',
        icon: '/image/icon/income/partTime.png'
    }, {
        id: 25,
        label: '理财',
        icon: '/image/icon/income/financial.png'
    }, {
        id: 26,
        label: '礼金',
        icon: '/image/icon/income/income.png'
    }, {
        id: 27,
        label: '其他',
        icon: '/image/icon/income/other.png'
    }
];

export const CALCULATOR_ITEM = [
    {
        id: 28,
        value: '7',
        label: '7',
    },
    {
        id: 29,
        value: '8',
        label: '8',
    },
    {
        id: 30,
        value: '9',
        label: '9',
    },
    {
        id: 31,
        value: 'del',
        label: '删除',
    },
    {
        id: 32,
        value: '4',
        label: '4',
    },
    {
        id: 33,
        value: '5',
        label: '5',
    },
    {
        id: 34,
        value: '6',
        label: '6',
    },
    {
        id: 35,
        value: '.',
        label: '.',
    },
    {
        id: 36,
        value: '1',
        label: '1',
    },
    {
        id: 37,
        value: '2',
        label: '2',
    },
    {
        id: 38,
        value: '3',
        label: '3',
    },
    {
        id: 39,
        value: '0',
        label: '0',
    },
];

export const WEEK_DAY_MAP: Record<number, string> = {
    0: '天',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
};

export const ICON_NAME_MAP: Record<string, string> = {
    "餐饮": "/image/icon/spend/food.png",
    "购物": "/image/icon/spend/shopping.png",
    "日用品": "/image/icon/spend/daily.png",
    "交通": "/image/icon/spend/traffic.png",
    "蔬菜": "/image/icon/spend/vegetables.png",
    "水果": "/image/icon/spend/fruit.png",
    "运动": "/image/icon/spend/sport.png",
    "娱乐": "/image/icon/spend/entertainment.png",
    "服饰": "/image/icon/spend/clothes.png",
    "美容": "/image/icon/spend/beauty.png",
    "住房": "/image/icon/spend/house.png",
    "居家": "/image/icon/spend/home.png",
    "孩子": "/image/icon/spend/child.png",
    "长辈": "/image/icon/spend/elder.png",
    "旅行": "/image/icon/spend/travel.png",
    "烟酒": "/image/icon/spend/smoke.png",
    "汽车": "/image/icon/spend/car.png",
    "医疗": "/image/icon/spend/medical.png",
    "书籍": "/image/icon/spend/books.png",
    "宠物": "/image/icon/spend/pet.png",
    "礼金": "/image/icon/spend/amounts.png",
    "礼物": "/image/icon/spend/gift.png",
    "工资": "/image/icon/income/salary.png",
    "理财": "/image/icon/income/financial.png",
    "兼职": "/image/icon/income/partTime.png",
    "其他": "/image/icon/income/other.png",
};

// 0、待审核   1、审核未通过   2、审核通过    3、已冻结
export enum DRIVER_AUDIT_STATUS {
    // eslint-disable-next-line no-unused-vars
    TO_AUDIT = 0,
    // eslint-disable-next-line no-unused-vars
    NO_PASS = 1,
    // eslint-disable-next-line no-unused-vars
    PASS = 2,
    // eslint-disable-next-line no-unused-vars
    FREEZE = 3,
}
