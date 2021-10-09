import { isNil } from 'lodash';

type FormDataPrimitive = string | Blob | number | boolean;
interface FormDataNest {
    [x: string]: FormVal;
}
type FormVal = FormDataNest | FormDataPrimitive;

const buildFormData = (formData: FormData, data: FormVal, parentKey?: string) => {
    if (Array.isArray(data)) {
        data.forEach((el) => {
            buildFormData(formData, el, parentKey);
        });
    } else if (typeof data === 'object' && !(data instanceof File)) {
        Object.keys(data).forEach((key) => {
            buildFormData(formData, (data as FormDataNest)[key], parentKey ? `${parentKey}.${key}` : key);
        });
    } else {
        if (isNil(data)) {
            return;
        }

        const value = typeof data === 'boolean' || typeof data === 'number' ? data.toString() : data;
        formData.append(parentKey as string, value);
    }
};

const getFormData = (data: Record<string, FormDataNest>) => {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
};

const onNumberOnlyChange = (event: any, callback: any) => {
    const value = event.target.value.replace(/\+|-/gi, '');
    const number = parseInt(value);
    callback(number);
};

const chunkArray = (arr: any[], _size: number): any[][] => {
    const chunks: any[][] = [];
    arr.forEach((item) => {
        if (!chunks.length || chunks[chunks.length - 1].length === _size) chunks.push([]);
        chunks[chunks.length - 1].push(item);
    });

    return chunks;
};

export { getFormData, onNumberOnlyChange, chunkArray };
