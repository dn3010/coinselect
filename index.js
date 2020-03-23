var accumulative = require('./accumulative')
var utils = require('./utils')

// order by descending value, minus the inputs approximate fee
function utxoScore (x, feeRate) {
  return x.value - (feeRate * utils.inputBytes(x))
}

module.exports = function coinSelect (utxos, outputs, feeRate) {
  utxos = utxos.concat().sort(function (a, b) {
    return utxoScore(b, feeRate) - utxoScore(a, feeRate)
  })
  return accumulative(utxos, outputs, feeRate)
}
