// eslint-disable-next-line import/no-anonymous-default-export
// export default () => {
// 	// eslint-disable-next-line no-restricted-globals
// 	self.addEventListener("message", (e) => {
// 		console.log(e.data, "e");
// 		let result = 100002;
// 		for (let i = 0; i < 100000; i++) {
// 			result--;
// 		}

// 		postMessage(result);
// 	});
// };

//calculate rate by customer
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	// eslint-disable-next-line no-restricted-globals
	self.addEventListener("message", (e) => {
		//console.log(e.data, "e");
		const customer = e.data[0];
		const customerArray = e.data[1];
		let min;
		//= Number.MAX_SAFE_INTEGER;
		for (let i = 0; i < customerArray.length; i++) {
			const array = customerArray[i].scope.split(",");
			const rate = customerArray[i].rate;
			for (let j = 0; j < array.length; j++) {
				if (array[j] * 1 === customer.id) {
					// eslint-disable-next-line no-const-assign
					min = rate.substr(1) * 1;
				}
			}
		}
		postMessage(min);
	});
};
