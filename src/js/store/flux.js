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
            },
            addContact(name,phone,email,address){
                fetch("https://assets.breatheco.de/apis/fake/contact/", {
                        method: "post",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            full_name: name,
                            phone: phone,
                            address: address,
                            email:email,
                            agenda_slug:"heidysAgenda"
                        }) 
                }).then(()=>{
                    fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
                    .then(response => response.json())
                    .then(result => {
                        console.log("result", result),
                        setStore({
                            contacts: result 
                        });
                    })
                    .catch(e => console.error(e));
                })
                
            },
             editContacts(id,name,phone,email,address){
                fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
                        method: "put",
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            full_name: name,
                            phone: phone,
                            address: address,
                            email:email,
                            agenda_slug:"heidysAgenda"
                        }) 
                }).then(()=>{
                    fetch("https://assets.breatheco.de/apis/fake/contact/agenda/heidysAgenda")
                    .then(response => response.json())
                    .then(result => {
                        console.log("result", result),
                        setStore({
                            contacts: result 
                        });
                    })
                    .catch(e => console.error(e));
                })
                
            }
		}
	};
};

export default getState;
