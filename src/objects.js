/* eslint-disable no-new-object */
//create customer object
export function createCustomer(id, name, address, postcode) {
	// eslint-disable-next-line no-new-object
	let obj = new Object();
	obj.id = id;
	obj.name = name;
	obj.address = address;
	obj.postcode = postcode;
	return obj;
}
//Create product object
export function createProduct(id, name, price) {
	// eslint-disable-next-line no-new-object
	let p = new Object();
	p.id = id;
	p.name = name;
	p.price = price;
	return p;
}
//Create Order object
export function createOrder(id, products, amount) {
	let o = new Object();
	o.id = id;
	o.products = products;
	o.amount = amount;
	return o;
}
//Create Coupon Object
export function createCoupon(id, code) {
	let coupon = new Object();
	coupon.id = id;
	coupon.code = code;
	return coupon;
}
