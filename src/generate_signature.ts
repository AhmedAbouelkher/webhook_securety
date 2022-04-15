import hmacSHA256 from "crypto-js/hmac-sha256";

// Use key
// Use payload as message

const generateSignature = (payload: any, secret: string) => {
    const hash = hmacSHA256(JSON.stringify(payload), secret);
    const timeStamp = new Date().getTime();
    return `t=${timeStamp},v1=${hash}`;
};

export default generateSignature;
