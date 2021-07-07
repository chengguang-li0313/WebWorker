//find reate by distance
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	self.addEventListener("message", (e) => {
		const array = e.data[1];
		const customer = e.data[0];
		const distanceArray = e.data[2];
		const key = "AIzaSyD6Kuwn3wTAMXNsGDZDLhdTRWshRSqAeSY";
		let googleMapUrl =
			"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=";

		let minRateByDistance = Number.MAX_SAFE_INTEGER;
		let address;

		for (let i = 0; i < array.length; i++) {
			const childrenArray = array[i].to.split(",");
			for (let j = 0; j < childrenArray.length; j++) {
				if (childrenArray[j] === customer.postcode) {
					address = array[i].from;
				}
			}
		}
		let tempAddress = address.split(" ").map((address) => address);
		let warehouseAddress = tempAddress[0];
		for (let i = 1; i < tempAddress.length; i++) {
			warehouseAddress += "+" + tempAddress[i];
		}
		let realDistance;
		let url;
		url =
			googleMapUrl +
			customer.address +
			"&destinations=" +
			warehouseAddress +
			"&key=" +
			key;
		//fetch Google Map API to calculate the distance
		fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				//console.log(result);
				realDistance = result.rows[0].elements[0].distance.text;
				realDistance = realDistance.substr(0, realDistance.length - 2);
				realDistance = realDistance.toString();

				//const array = Data.distance;

				for (let i = 0; i < distanceArray.length; i++) {
					if (realDistance * 1 <= distanceArray[i].distance * 1) {
						if (distanceArray[i].rate * 1 < minRateByDistance) {
							minRateByDistance = distanceArray[i].rate;
							postMessage(minRateByDistance);
						}
					}
				}
			});
		postMessage(minRateByDistance);
	});
};
