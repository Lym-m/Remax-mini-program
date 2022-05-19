const formatDateTime = (time: number) => {
    if(time){
        const datetime = new Date(time);
        const year = datetime.getFullYear();
        const month = datetime.getMonth();
        const date = datetime.getDate();
        const hour = datetime.getHours();
        const minute = datetime.getMinutes();
        const second = datetime.getSeconds();
        return year +
            '-' +
            ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
            '-' +
            (date < 10 ? '0' + date : date) +
            ' ' +
            (hour < 10 ? '0' + hour : hour) +
            ':' +
            (minute < 10 ? '0' + minute : minute) +
            ':' +
            (second < 10 ? '0' + second : second);
    } else {
        return '';
    }
};

const groupBy = (list: Array<unknown>, fun: Function) => {
    const groups: { [key: string]: any }  = {};
    list.forEach(item => {
        const group = JSON.stringify(fun(item));
        groups[group] = groups[group] || [];
        groups[group].push(item);
    });
    return Object.keys(groups).map(group => {
        return groups[group];
    })
};

export {formatDateTime, groupBy}
