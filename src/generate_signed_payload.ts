import hmacSHA256 from "crypto-js/hmac-sha256";

export const payload = {
    object: {
        id: "sub_1KSskQL4r9sVX2wg7xNYp4Fv",
        object: "subscription",
        application_fee_percent: null,
        automatic_tax: {
            enabled: false,
        },
        billing_cycle_anchor: 1644799737,
        billing_thresholds: null,
        cancel_at: null,
        cancel_at_period_end: false,
        canceled_at: null,
        collection_method: "charge_automatically",
        created: 1644799737,
        current_period_end: 1652575737,
        current_period_start: 1649983737,
        customer: "cus_KZlWfesCUiHO6R",
        days_until_due: null,
        default_payment_method: null,
        default_source: null,
    },
};

const generateSignature = ({
    payload,
    secret,
}: {
    payload: any;
    secret: string;
}) => {
    const timeStamp = new Date().getTime();
    const signedPayload = generateSignedPayload({ payload, timeStamp });
    const hash = hmacSHA256(signedPayload, secret);
    return `t=${timeStamp},v1=${hash}`;
};

const generateSignedPayload = ({
    payload,
    timeStamp,
}: {
    payload: any;
    timeStamp: number;
}) => {
    const body = JSON.stringify(payload);
    return `${timeStamp}.${body}`;
};

export default generateSignature;
