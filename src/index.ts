import dotenv from "dotenv";

dotenv.config();

import generateSignature from "./generate_signature";
import generatePayload, { payload } from "./generate_payload";
import constructEvent from "./validate_payload";

async function run() {
    const secret = process.env.SECRET ?? "";

    const signature = generateSignature(payload, secret);
    const signedPayload = generatePayload(payload);

    console.log("*-----***-----*");

    setTimeout(() => {
        try {
            const event = constructEvent(signedPayload, signature, secret);
            console.log("EVENT:", event);
        } catch (error: any) {
            console.error(error.message);
        }
    }, 100);
}

run();
