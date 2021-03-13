import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
	const [phone, setPhone] = useState(contact ? contact.phone : "");
	const [name, setName] = useState(contact ? contact.full_name : "");
	const [email, setEmail] = useState(contact ? contact.email : "");
	const [address, setAddress] = useState(contact ? contact.address : "");

	function validateFields() {
		if (
			name === "" ||
			phone === "" ||
			email === "" ||
			address === "" ||
			name === null ||
			phone === null ||
			email === null ||
			address === null
		) {
			alert("Empty fields");
		} else if (isNaN(phone)) {
			alert("Invalid phone format");
		}
		return false;
	}

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
					<Link to={"/"}>
						<button
							type="button"
							className="btn btn-primary form-control"
							onClick={() => {
								validateFields();
								actions.editContacts(id, name, phone, email, address);
							}}>
							save
						</button>
					</Link>
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
