/* eslint-disable no-array-constructor */
import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import worker from "./worker.js";
import worker2 from "./worker2.js";
import worker3 from "./worker3.js";
import worker4 from "./worker4.js";
import worker5 from "./worker5.js";
import worker6 from "./worker6.js";

import WebWorker from "./workerSetup";
import "./App.css";
import { Container, Row, Col } from "react-grid-system";
import {
	createCustomer,
	createProduct,
	createOrder,
	createCoupon,
} from "./objects.js";
import Data from "./data/data.json";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rateByCustomer: "unknow",
			rateByProduct: "unknow",
			rateByOrder: "unknow",
			rateByPostCode: "unknow",
			rateByDistance: "unknow",
			percentate: 1,
			finalRate: Number.MAX_SAFE_INTEGER,
		};
	}
	customer;
	order;
	coupon;
	customerArray;
	productArray;
	orderArray;
	postcodeArray;
	couponArray;
	distanceArray;
	judge = false;
	getResult = false;
	componentDidMount = () => {
		//crearte  threads
		//find the rate by customer
		this.worker = new WebWorker(worker);
		//find the rate by product
		this.worker2 = new WebWorker(worker2);
		//find the rate by order
		this.worker3 = new WebWorker(worker3);
		//find the rate by postcode
		this.worker4 = new WebWorker(worker4);
		//find percentage by coupon
		this.worker5 = new WebWorker(worker5);
		//find the rate by distance
		this.worker6 = new WebWorker(worker6);
		//create test cases
		//create customer
		this.customer = createCustomer(
			119,
			"jake",
			"221+Burwood+Hwy+Burwood+VIC",
			"3125"
		);
		//create order
		const product1 = createProduct("p1", "washing machine", 30);
		const product2 = createProduct("p2", "hair dryer", 40);
		const product3 = createProduct("c1", "printer", 100);
		this.order = createOrder(
			1,
			// eslint-disable-next-line no-array-constructor
			new Array(product1, product2, product3),
			170.0
		);
		// crearte coupon
		this.coupon = createCoupon(1, "SALEOF20OFF");
		//
		this.customerArray = Data.customer;
		this.productArray = Data.product;
		this.orderArray = Data.order;
		this.postcodeArray = Data.postcode;
		this.couponArray = Data.coupon;
		this.distanceArray = Data.distance;
	};
	//find rate by customer thread
	fetchWebWorker2 = () => {
		this.worker2.postMessage(new Array(this.customer, this.customerArray));

		this.worker2.addEventListener("message", (event) => {
			//console.log(event.data, "+++");

			this.setState({
				rateByCustomer: event.data,
			});
			if (event.data === null) {
				return;
			}
			if (event.data * 1 < this.state.finalRate) {
				console.log(event.data);
				console.log("run!!!");
				this.setState({
					finalRate: event.data,
				});
			}

			if (event.data == 0) {
				this.worker4.terminate();
				this.worker.terminate();
				this.worker5.terminate();
				this.worker3.terminate();
				this.worker6.terminate();
			}
			console.log("find rate by customer thread  $", event.data);
		});
	};
	//find rate by producte thread
	fetchWebWorker = () => {
		this.worker.postMessage(new Array(this.order, this.productArray));

		this.worker.addEventListener("message", (event) => {
			this.setState({
				rateByProduct: event.data,
			});
			if (event.data < this.state.finalRate) {
				this.setState({
					finalRate: event.data,
				});
				console.log("run");
			}
			if (event.data == 0) {
				this.worker4.terminate();
				this.worker2.terminate();
				this.worker5.terminate();
				this.worker3.terminate();
				this.worker6.terminate();
			}
			console.log("find rate by product thread  $", event.data);
		});
	};
	//find rate by order thread
	fetchWebWorker3 = () => {
		this.worker3.postMessage(new Array(this.order, this.orderArray));

		this.worker3.addEventListener("message", (event) => {
			this.setState({
				rateByOrder: event.data,
			});
			if (event.data < this.state.finalRate) {
				this.setState({
					finalRate: event.data,
				});
			}
			if (event.data == 0) {
				this.worker4.terminate();
				this.worker.terminate();
				this.worker5.terminate();
				this.worker2.terminate();
				this.worker6.terminate();
			}
			console.log("find rate by order thread  $", event.data);
		});
	};
	//find rate by postcode thread
	fetchWebWorker4 = () => {
		this.worker4.postMessage(new Array(this.customer, this.postcodeArray));

		this.worker4.addEventListener("message", (event) => {
			this.setState({
				rateByPostCode: event.data,
			});
			if (event.data < this.state.finalRate) {
				this.setState({
					finalRate: event.data,
				});
			}
			if (event.data == 0) {
				this.worker2.terminate();
				this.worker.terminate();
				this.worker5.terminate();
				this.worker3.terminate();
				this.worker6.terminate();
			}
			console.log("find rate by postcode thread  $", event.data);
		});
	};
	//find percentage by coupon thread
	fetchWebWorker5 = () => {
		this.worker5.postMessage(new Array(this.coupon, this.couponArray));

		this.worker5.addEventListener("message", (event) => {
			this.setState({
				percentate: event.data,
			});

			console.log("find percentage by coupon thread ", event.data);
		});
	};
	//find rate by distance
	fetchWebWorker6 = () => {
		this.worker6.postMessage(
			new Array(this.customer, this.postcodeArray, this.distanceArray)
		);

		this.worker6.addEventListener("message", (event) => {
			this.setState({
				rateByDistance: event.data,
			});
			if (event.data < this.state.finalRate) {
				this.setState({
					finalRate: event.data,
				});
			}
			if (event.data == 0) {
				this.worker4.terminate();
				this.worker.terminate();
				this.worker5.terminate();
				this.worker3.terminate();
				this.worker2.terminate();
			}
			console.log("find rate by distance $", event.data);
		});
	};

	getData = () => {
		this.fetchWebWorker2();
		this.fetchWebWorker();
		this.fetchWebWorker3();
		this.fetchWebWorker4();
		this.fetchWebWorker5();
		this.fetchWebWorker6();
		//this.calculate();
		this.judge = true;
	};
	calculate = () => {
		this.getResult = true;
		let result = this.state.finalRate;
		//console.log(result, "reuslts");
		//console.log(this.getResult);
		if (result !== 0) {
			let percentage = this.state.percentate;
			if (percentage !== 1) {
				percentage = 1 - percentage;
			}
			let answer = percentage * result;
			this.setState({
				finalRate: answer,
			});
		}
	};
	render() {
		return (
			<div className="App-bottom">
				<button className="btn-worker" onClick={this.getData}>
					get data
				</button>
				{this.judge ? (
					<Container>
						<Row>
							<Col sm={4}>
								<h3> find rate by customer: </h3> ${this.state.rateByCustomer}
							</Col>
							<Col sm={4}>
								<h3>find rate by product: </h3>${this.state.rateByProduct}
							</Col>
							<Col sm={4}>
								<h3> find rate by order: </h3>${this.state.rateByOrder}
							</Col>
							<Col sm={4}>
								<h3>find rate by postcode: </h3>${this.state.rateByPostCode}
							</Col>
							<Col sm={4}>
								<h3>find rate by distance: </h3>${this.state.rateByDistance}
							</Col>
							<Col sm={4}>
								<h3>find percentage by coupon: </h3>
								{this.state.percentate}
							</Col>
						</Row>
						<hr />
						<Row>
							<Col sm={4}>
								<button className="btn-calculate" onClick={this.calculate}>
									{" "}
									calculate final delivery fee
								</button>
							</Col>

							<Col sm={4}>
								<h3> final Rate : ${this.state.finalRate}</h3>
							</Col>
						</Row>
					</Container>
				) : (
					<h1> Please click the button, get started! </h1>
				)}
			</div>
		);
	}
}

export default Home;
