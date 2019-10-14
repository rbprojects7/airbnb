import fx from 'money' ;

export function convert(base, rates, amount, from, to){
	let toCurrency;
    fx.base = base;
    fx.rates = rates;
    if(to){
    	toCurrency = to
    } else {
    	toCurrency = base
    }
    const value = amount && fx.convert(amount, {from, to: toCurrency});
    return value;
}
