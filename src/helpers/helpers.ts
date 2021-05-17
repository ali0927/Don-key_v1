
export const getQueryParam = (name: string) => {
    if (typeof window === "undefined") {
        return "";
    }
    const search = window.location.search;
    const queryString = decodeURIComponent(search.slice(1, search.length));
    const queryObj: any = {};
    queryString.split("&").forEach((item) => {
        const items = item.split("=");
        queryObj[items[0]] = items[1];
    });
 
    return queryObj[name];
};

export const tuplify = <T extends any[]>(...args: T) => {
    return args;
};
