import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	let ind = 0;
	let id = props.match.params.id;
	for (let i in store.contacts) {
		if (store.contacts[i].id === id) {
			ind = i;
		}
	}
	let contact = store.contacts[ind];
	let history = useHistory();
	const [phone, setPhone] = useState(contact ? contact.phone : "");
	const [name, setName] = useState(contact ? contact.full_name : "");
	const [email, setEmail] = useState(contact ? contact.email : "");
	const [address, setAddress] = useState(contact ? contact.address : "");
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
			actions.editContacts(id, name, phone, email, address);
			history.push("/");
			setValidation(false);
		} else {
			setValidation(false);
		}
	}, [validation]);

	const validateEmail = input => {
		if (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(input)) {
			actions.editContacts(id, name, phone, email, address);
			return input === null || !input;
		} else {
			alert("Sorry, this email" + " " + input + " " + "is invalid");
			history.push("/edit/:id");
		}
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className={validationName ? "form-control is-invalid" : "form-control"}
							placeholder="Full Name"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className={validationEmail ? "form-control is-invalid" : "form-control"}
							placeholder="Enter email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className={validationPhone ? "form-control is-invalid" : "form-control"}
							placeholder="Enter phone"
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className={validationAddress ? "form-control is-invalid" : "form-control"}
							placeholder="Enter address"
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>

					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							setValidationName(checkInput(name));
							setValidationEmail(validateEmail(email));
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
EditContact.propTypes = {
	match: PropTypes.object
};
