import hmacSHA256 from "crypto-js/hmac-sha256";

//t=1650021514,v1=a4a07560bf916250cde623b458d351abf1c26261269ffba91533afd5addd8692,v0=a7e8a7ef664ead72fe44ce5d2aef4727acebc163842db83a991f7cca673d49ec

/*
Compute an HMAC with the SHA256 hash function. 
Use the endpoint’s signing secret as the key, and use the signed_payload string as the message.
*/

/*
Step 4: Compare the signatures 
Compare the signature (or signatures) in the header to the expected signature.
For an equality match, compute the difference between the current timestamp and the received timestamp, 
then decide if the difference is within your tolerance.

To protect against timing attacks, use a constant-time string comparison to compare the expected signature 
to each of the received signatures.
*/

const constructEvent = (body: string, signature: string, secret: string) => {
    //parse body
    const { payload } = parseBody(body);

    //parse signature
    const { t: t1, v1: v1 } = parseSignature(signature);

    //hash payload
    const hashedBodyPayload = hmacSHA256(payload, secret).toString();

    //compare signature v1 with hashed payload
    const isValidSignature = v1 === hashedBodyPayload;
    if (!isValidSignature) throw new Error("Invalid signature");

    // compare t1 with current time
    const currentTime = new Date().getTime();
    const isValidTime = Math.abs(currentTime - t1) < 300;

    if (!isValidTime) throw new Error("Invalid timestamp");

    //jsonify payload
    const payloadJson = JSON.parse(payload);
    return payloadJson;
};

const parseBody = (body: string) => {
    const splitted = body.split(".");
    return {
        t: parseInt(splitted[0]),
        payload: splitted[1],
    };
};

//parse signature
const parseSignature = (signature: string) => {
    const splitted = signature.split(",");
    const t1Value = parseInt(splitted[0].split("=")[1]);
    const v1Value = splitted[1].split("=")[1];
    return {
        t: t1Value,
        v1: v1Value,
    };
};

export default constructEvent;
