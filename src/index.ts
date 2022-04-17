import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();

import generateSignedPayload, { payload } from "./generate_signed_payload";
import constructEvent from "./validate_payload";

async function run() {
    const secret = process.env.SECRET ?? "";

    const signature = generateSignedPayload({ payload, secret });

    setTimeout(() => {
        try {
            constructEvent(payload, signature, secret);
            console.log("EVENT CREATED");
        } catch (error: any) {
            console.error(`INVALID REQUEST ${error.message}`);
        }
    }, 1550);
}

run();
