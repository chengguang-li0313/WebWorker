//find percentage by coupon
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	self.addEventListener("message", (e) => {
		const curDate = new Date();
		const couponInput = e.data[0];
		const couponArray = e.data[1];
		let result = 1;
		for (let i = 0; i < couponArray.length; i++) {
			if (couponArray[i].code === couponInput.code) {
				const array = couponArray[i].period.split(",");
				try {
					if (array != null && array.length === 2) {
						let beginDate = new Date(array[0]);
						let endDate = new Date(array[1]);

						if (curDate >= beginDate && curDate <= endDate) {
							//setPercentage(couponArray[i].percentage);
							result = couponArray[i].percentage;
						}
					}
				} catch (e) {
					console.log(e);
				}
			}
		}

		postMessage(result);
	});
};
