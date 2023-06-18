import '@fluencelabs/js-client.node'; // Import the JS Client implementation. Don't forget to add this import!
import { Fluence } from '@fluencelabs/js-client.api'; // Import the API for JS Client
import { kras } from '@fluencelabs/fluence-network-environment'; // Import list of possible relay nodes (network environment)
import { registerHelloWorld, sayHello, getRelayTime, tellFortune } from './_aqua/hello-world'; // Aqua compiler provides functions which can be directly imported like any normal TypeScript function.

export async function fluenceSayHello() {
    let res = await FluenceWrapper(() => sayHello());
    return res;
}

export async function fluenceTellFortune() {
    let res = await FluenceWrapper(() => tellFortune());
    return res;
}

export async function fluenceGetRelayTime() {
    let res = await FluenceWrapper(() => getRelayTime());
    return res;
}

const FluenceWrapper = async (fn: any) => {
    await Fluence.connect(kras[3]);
    registerHelloWorld({
        hello: (str) => {
            return str;
        },
        getFortune: async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            return 'Wealth awaits you very soon.';
        },
    });
    const result = await fn();
    console.log(result);
    await Fluence.disconnect();
    if (result) return result;
};
