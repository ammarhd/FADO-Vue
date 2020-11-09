import {tx2vec} from '../functions/tex2vec.js'
var w = Array.from(Array(45), () => 0.0);
var l0 = 0;
var layer1tx = [];
var m_t = 0;

const fado = () => {
    var l2norm = require("compute-l2norm");
    var allAtr = tx2vec();
    var tx = allAtr[0];
    var y_vec = allAtr[1];
    var vecMinusW = [];
    var v_t = [];
    var gamma = 0;
    var w_new = [];

    for (let i = 0; i < 45; i++) {
        vecMinusW.push(y_vec[i] - w[i]);
    }
    var norm = l2norm(vecMinusW);
    if (norm >= 1.65) {
        m_t++;
        gamma = 1 / Math.sqrt(m_t);
        for (let i = 0; i < 45; i++) {
            v_t.push(vecMinusW[i] / norm);
            v_t[i] *= gamma;
            w_new.push(w[i] + v_t[i]);
        }

        w = w_new;
        layer1tx.push(tx);
    }
    l0++;

    console.log(vecMinusW);
    console.log(w);
    console.log(norm);
    console.log(m_t);
    console.log(l0);
    console.log(m_t / l0);

    return tx;
};
export{fado, layer1tx}