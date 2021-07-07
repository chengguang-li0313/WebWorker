//calculate rate by order
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	self.addEventListener("message", (e) => {
		let min = Number.MAX_SAFE_INTEGER;
		const order = e.data[0];
		const orderArray = e.data[1];
		for (let i = 0; i < orderArray.length; i++) {
			if (
				order.amount >= orderArray[i].amount * 1 &&
				orderArray[i].rate.substr(1) * 1 < min
			) {
				min = orderArray[i].rate.substr(1) * 1;
				//console.log(min, "order	");
			}
		}

		postMessage(min);
	});
};
