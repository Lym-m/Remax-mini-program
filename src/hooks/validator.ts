/* eslint-disable @typescript-eslint/no-explicit-any */
import {useCallback, useMemo, DependencyList} from 'react';
import Schema, { Rules, FieldErrorList } from 'async-validator';

/**
 * 使用 validator函数校验的时候一定要注意，必须要调用callback函数，否则校验一直不会完成。
 * @param rules
 * @param deps
 */
export function useSchema(rules: Rules, deps: DependencyList = []): YupLikeSchema {
    const schema = useMemo(() => {
        return new YupLikeSchema(rules);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return schema;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useEnhancedFormik<Values>(formik: { values: Values; [key: string]: any; }) {
    const {setFieldValue, setFieldTouched, touched, errors} = formik;

    const handleChange = useCallback((field: keyof Values, option: { directValue?: boolean; withTouched?: boolean } = {}) => {
        const {
            directValue = false,
            withTouched = false
        } = option;
        return (e: any) => {
            if (withTouched) {
                setFieldTouched(field, true);
            }
            setFieldValue(field, directValue ? e : e.detail);
        };
    }, [setFieldTouched, setFieldValue]);

    const handleBlur = useCallback((field: keyof Values) => {
        return () => setFieldTouched(field, true);
    }, [setFieldTouched]);

    const errorMessage = useCallback((fieldName: keyof Values) => {
        return touched[fieldName] && (errors[fieldName] ?? '');
    }, [errors, touched]);

    return {
        handleChange,
        handleBlur,
        errorMessage
    };
}

class YupLikeSchema {
    rules: Rules;

    static transformErrors({ fields }: { fields: FieldErrorList }, values: { [key: string]: any }) {
        const errors: ValidationError[] = [];
        Object.keys(fields).forEach((key: keyof FieldErrorList) => {
            const errMsg = fields[key];
            if (errMsg.length) {
                errors.push(new ValidationError(errMsg[0].message, values[key], key.toString()));
            }
        });
        return Promise.reject(new ValidationError(errors));
    }

    constructor(rules: Rules) {
        this.rules = rules;
    }

    validate(values: { [key: string]: any }) {
        const validator = new Schema(this.rules);
        return validator
            .validate(values)
            .then(
                () => null,
                (error) => YupLikeSchema.transformErrors(error, values)
            );
    }

    validateAt(field: string, values: { [key: string]: any }) {
        if (!(field in this.rules)) {
            return Promise.resolve();
        }
        const validator = new Schema({ [field]: this.rules[field] });
        return validator
            .validate({ [field]: values[field] })
            .then(
                () => null,
                (error) => YupLikeSchema.transformErrors(error, values)
            );
    }
}


type Params = Record<string, unknown>;
// const strReg = /\$\{\s*(\w+)\s*\}/g;

function toArray<T>(value?: null | T | T[]) {
    return value == null ? [] : ([] as T[]).concat(value);
}

class ValidationError extends Error {
    value: any;
    path?: string;
    type?: string;
    errors: string[];

    params?: Params;

    inner: ValidationError[];

    static isError(err: any): err is ValidationError {
        return err && err.name === 'ValidationError';
    }

    constructor(
        errorOrErrors: string | ValidationError | ValidationError[],
        value?: any,
        field?: string,
        type?: string,
    ) {
        super();

        this.name = 'ValidationError';
        this.value = value;
        this.path = field;
        this.type = type;

        this.errors = [];
        this.inner = [];

        toArray(errorOrErrors).forEach((err) => {
            if (ValidationError.isError(err)) {
                this.errors.push(...err.errors);
                this.inner = this.inner.concat(err.inner.length ? err.inner : err);
            } else {
                this.errors.push(err);
            }
        });

        this.message =
            this.errors.length > 1
                ? `${this.errors.length} errors occurred`
                : this.errors[0];

        if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
    }
}
