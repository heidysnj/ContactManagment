const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
					.then(res => res.json())
					.then(response => {
						console.log(contacts);
						setStore({ contacts: response });
					});
			}
		}
	};
};

export default getState;
