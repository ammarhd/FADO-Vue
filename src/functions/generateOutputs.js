import {fado, layer1tx,layer2tx, layer3tx} from './fado.js'
import {printOutput, printOutput4} from './printOutputs.js'
var txsCount1 = 0;
var txsCount2 = 0;
var txsCount3 = 0;
var txsCount4 = 0;

var layer1Iteration = 0;
var layer2Iteration = 0;
var layer3Iteration = 0;


const generateOutput = () => {
    let newOutput = fado();
    printOutput(newOutput, "inflowLayer1");
    txsCount1++;
    
};

const generateOutput2 = () => {
    if (layer1Iteration < layer1tx.length) {
        printOutput(layer1tx[layer1Iteration], "outflowLayer2");
        layer1Iteration++;
        txsCount2++;
    }
};

const generateOutput3 = () => {
    if (layer2Iteration < layer2tx.length) {
        printOutput(layer2tx[layer2Iteration], "outflowLayer3");
        layer2Iteration++;
        txsCount3++;
    }
    
};

const generateOutput4 = () => {
    if (layer3Iteration < layer3tx.length) {
        printOutput4(layer3tx[layer3Iteration], "outflowLayer4");
        layer3Iteration++;
        txsCount4++;
    }
    
};




export{generateOutput, generateOutput2, generateOutput3, generateOutput4, txsCount1, txsCount2, txsCount3, txsCount4}