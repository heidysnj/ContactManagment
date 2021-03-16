const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			title: false,
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
					.then(res => res.json())
					.then(response => {
						//console.log(contacts);
						setStore({ contacts: response });
					});
			},
			addContact(name, phone, email, address) {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "post",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "heidysAgenda"
					})
				}).then(() => {
					fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
						.then(response => response.json())
						.then(result => {
							setStore({
								contacts: result
							});
						})
						.catch(e => console.error(e));
				});
			},
			editContacts(id, name, phone, email, address) {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "put",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						phone: phone,
						address: address,
						email: email,
						agenda_slug: "heidysAgenda"
					})
				}).then(() => {
					fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
						.then(response => response.json())
						.then(result => {
							console.log("edit", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			},
			deleteContacts(id) {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "delete"
				}).then(() => {
					fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
						.then(response => response.json())
						.then(result => {
							console.log("result", result),
								setStore({
									contacts: result
								});
						})
						.catch(e => console.error(e));
				});
			},
			updateTitle(bool) {
				setStore({ title: bool });
			}
		}
	};
};

export default getState;
