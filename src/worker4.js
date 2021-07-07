//calculate rate by postcode
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	self.addEventListener("message", (e) => {
		let min = Number.MAX_SAFE_INTEGER;
		//x is used to test time delay
		let x = 10000000000;
		for (let rr = 10000000000; rr > 0; rr--) {
			x--;
		}
		if (x === 0) {
			//console.log("postcode data", e.data);
			const customer = e.data[0];
			const array = e.data[1];
			for (let i = 0; i < array.length; i++) {
				const childrenArray = array[i].to.split(",");
				for (let j = 0; j < childrenArray.length; j++) {
					if (childrenArray[j] === customer.postcode) {
						//setRateByPostcode(array[i].rate);
						if (array[i].rate * 1 < min) {
							min = array[i].rate * 1;
						}
					}
				}
			}
		}

		postMessage(min);
	});
};
