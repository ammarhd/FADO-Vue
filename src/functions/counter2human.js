import { txsCount1, txsCount2, txsCount3, txsCount4 } from './generateOutputs.js'

var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
var layer0count = '';




const countxt = () => {

    count1 = txsCount1 - count1;
    if (count1 > 100) {
        layer0count = "Processed" + " " + count1 / 20 + " " + "TXs/sec";
    } else if (count1 > 5) {
        layer0count = "Processed" + " " + count1 * 3 + " " + "TXs/min";
    } else {
        layer0count = "Processed" + " " + count1 * 18 + " " + "TXs/hour";
    }

};

const counter2 = () => {

    count2 = txsCount2 - count2;
    if (count2 / 20 > 100) {
        var layer1count = "Processed" + count2 + "TXs/sec"
    } else if (count2 / 20 > 5) {
        layer1count = "Processed" + (count2 * 60) + "TXs/min"
    } else {
        layer1count = "Processed" + (count2 * 360) + "TXs/hour"
    }
    


};

const counter3 = () => {

    count3 = txsCount3 - count3;
    if (count3 / 20 > 100) {
        var layer2count = "Processed" + count3 + "TXs/sec"
    } else if (count3 / 20 > 5) {
        layer2count = "Processed" + (count3 * 60) + "TXs/min"
    } else {
        layer2count = "Processed" + (count3 * 360) + "TXs/hour"
    }
    return layer2count;


};

const counter4 = () => {

    count4 = txsCount4 - count4;
    if (count4 / 20 > 100) {
        var layer3count = "Processed" + count4 + "TXs/sec"
    } else if (count4 / 20 > 5) {
        layer3count = "Processed" + (count4 * 60) + "TXs/min"
    } else {
        layer3count = "Processed" + (count4 * 360) + "TXs/hour"
    }
    return layer3count;


};


export { countxt, counter2, counter3, counter4, layer0count}

