import { getBNValue } from "./contracts";

class OneInch {
    getAmountOut = (fromAddress, toAddress, inputAmount, inputDecimal, address) => {
        return new Promise(async resolve => {
            try {
                const swapParams = {
                    fromTokenAddress: fromAddress,
                    toTokenAddress: toAddress,
                    amount: getBNValue(inputAmount, inputDecimal),
                    fromAddress: address,
                    slippage: 1,
                    disableEstimate: true,
                    allowPartialFill: false,
                };
                const response = await fetch(
                    `https://api.1inch.io/v4.0/1/swap?${(new URLSearchParams(swapParams)).toString()}`
                );
                let res = await response.json()
                if (res.statusCode === 400)
                    resolve(null)
                else {
                    res = {...res.tx, ...res, buyAmount: res.toTokenAmount, title: '1inch', marketAddress: '0x1111111254fb6c44bac0bed2854e76f90643097d'}
                    resolve(res);
                }
            } catch (e) {
                console.log(e)
                resolve({
                    status: false,
                    error: e
                })
            }
        })
    }
}
export default new OneInch();