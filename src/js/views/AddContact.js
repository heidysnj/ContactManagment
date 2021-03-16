import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	let addContact = "Add a new contact";

	let history = useHistory();
	const { store, actions } = useContext(Context);
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [validationName, setValidationName] = useState(false);
	const [validationPhone, setValidationPhone] = useState(false);
	const [validationEmail, setValidationEmail] = useState(false);
	const [validationAddress, setValidationAddress] = useState(false);
	const [validation, setValidation] = useState(false);

	const checkInput = input => {
		return input === null || !input;
	};
	useEffect(() => {
		if (!validationName && !validationEmail && !validationPhone && !validationAddress && validation) {
			actions.addContact(name, phone, email, address);
			history.push("/");
			setValidation(false);
		} else {
			setValidation(false);
		}
	}, [validation]);

	const fields = e => {
		if (!name || !phone || !email || !address) {
			e.preventDefault();
		} else {
			actions.addContact(name, phone, email, address);
		}
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">{addContact}</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className={validationName ? "form-control is-invalid" : "form-control"}
							placeholder="Full Name"
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className={validationEmail ? "form-control is-invalid" : "form-control"}
							placeholder="Enter email"
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className={validationPhone ? "form-control is-invalid" : "form-control"}
							placeholder="Enter phone"
							onChange={e => setPhone(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className={validationAddress ? "form-control is-invalid" : "form-control"}
							placeholder="Enter address"
							onChange={e => setAddress(e.target.value)}
							required
						/>
					</div>

					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							setValidationName(checkInput(name));
							setValidationEmail(checkInput(email));
							setValidationAddress(checkInput(address));
							setValidationPhone(checkInput(phone));
							setValidation(true);
						}}>
						save
					</button>

					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
