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

const generatePayload = (payload: any) => {
    const body = JSON.stringify(payload);
    const timeStamp = new Date().getTime();
    return `${timeStamp}.${body}`;
};

export default generatePayload;
