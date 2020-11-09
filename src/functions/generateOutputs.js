import {fado, layer1tx} from './fado.js'
import {printOutput, printOutput4} from './printOutputs.js'
var txsCount1 = 0;
var txsCount2 = 0;
var txsCount3 = 0;
var txsCount4 = 0;
var layer3 = [];
var layer4 = [];
var layer1Iteration = 0;


const generateOutput = () => {
    let newOutput = fado();
    printOutput(newOutput, "inflowLayer1");
    txsCount1++;
    if (newOutput[1] == 1) {
        layer3.push(newOutput);
        if (newOutput[2] == 1) {
            layer4.push(newOutput);
        }
    }
};

const generateOutput2 = () => {
    if (layer1Iteration < layer1tx.length) {
        printOutput(layer1tx[layer1Iteration], "outflowLayer2");
        layer1Iteration++;
        txsCount2++;
    }
};

const generateOutput3 = () => {
    let i = 0;
    setInterval(() => {
        for (var j = 0; j < 10; j++) {
            if (layer3.length > i) {
                printOutput(layer3[i], "outflowLayer3");
                i++;
                txsCount3++;
            }
        }
    }, 300);
};

const generateOutput4 = () => {
    let i = 0;
    setInterval(() => {
        for (var j = 0; j < 10; j++) {
            if (layer4.length > i) {
                printOutput4(layer4[i], "outflowLayer4");
                i++;
                txsCount4++;
            }
        }
    }, 1000);
};




export{generateOutput, generateOutput2, generateOutput3, generateOutput4, txsCount1, txsCount2, txsCount3, txsCount4}