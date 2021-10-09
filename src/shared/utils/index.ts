import { isNil, omitBy } from 'lodash';
import queryString from 'query-string';

function handlePayload(payload: any) {
    const newPayload: any = {};
    payload &&
    Object.keys(payload).forEach((key) => {
        newPayload[key] = payload[key] === '' ? null : payload[key];
    });
    return omitBy(newPayload, isNil);
}

function camelToSnake(value: string) {
    return value.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();
}

const stringifyParams = (data: any) => {
    const { params, option } = data;
    return queryString.stringify(handlePayload({ ...params }), {
        arrayFormat: 'brackets',
        encode: false,
        skipNull: true,
        skipEmptyString: true,
        ...option,
    });
};

function getCurrentDomain() {
    const parts = window.location.hostname.split('.');
    parts.shift();
    return parts.join('.');
}

export { stringifyParams, camelToSnake, getCurrentDomain };
