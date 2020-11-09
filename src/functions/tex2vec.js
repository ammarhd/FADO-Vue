import { generateTx } from '../functions/generate_txt.js'
const allCountries = [
    "DE",
    "BE",
    "AT",
    "FR",
    "EE",
    "ES",
    "IT",
    "LT",
    "NL",
    "CZ",
    "BG",
    "EL",
    "HR",
    "CY",
    "DK",
    "IE",
    "HU",
    "LV",
    "LU",
    "MT",
];


const tx2vec = () => {
    var allAtr = generateTx();
    var txsLine = allAtr[0];
    var sCountry = allAtr[2];
    var rCountry = allAtr[3];
    var amountt = Math.floor(allAtr[1]);
    var vector = Array.from(Array(45), () => 0);
    var j = 20;

    for (let i = 0; i < 20; i++) {
        if (sCountry == allCountries[i]) {
            vector[i] = 1;
        }
        if (rCountry == allCountries[i]) {
            vector[j] = 1;
        }
        j++;
    }

    if (amountt < 101) {
        vector[40] = 1;
    } else if ((amountt > 100) & (amountt < 1001)) {
        vector[41] = 1;
    } else if ((amountt > 1000) & (amountt < 10001)) {
        vector[42] = 1;
    } else if ((amountt > 10000) & (amountt < 100001)) {
        vector[43] = 1;
    } else if (amountt > 100000) {
        vector[44] = 1;
    }

    return [txsLine, vector];
};
export{tx2vec};