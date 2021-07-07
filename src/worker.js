//calculate rate by product
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	self.addEventListener("message", (e) => {
		let sum = 0;
		const array = e.data[0].products;
		const productArray = e.data[1];
		for (let i = 0; i < array.length; i++) {
			for (let p = 0; p < productArray.length; p++) {
				const scope = productArray[p].scope.split(",");
				const rate = productArray[p].rate.substr(1) * 1;
				for (let j = 0; j < scope.length; j++) {
					if (scope[j] === array[i].id) {
						sum += rate;
					}
				}
			}
		}

		postMessage(sum);
	});
};
