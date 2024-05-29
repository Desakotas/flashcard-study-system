export function fetchAddCard(question) {
	return fetch('/api/v1/cards', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify( { question } ),
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchDeleteCard(id) {
	return fetch(`/api/v1/cards/${id}`, {
		method: 'DELETE',
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchUpdateCard( id, cardUpdates ) {
	return fetch(`/api/v1/cards/${id}`, {
		method: 'PATCH',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify( cardUpdates ),
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchCards() {
	return fetch('/api/v1/cards')
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchTestCards() {
	return fetch('/api/v1/cards/test')
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchScores() {
	return fetch('/api/v1/scores')
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchAddScore(score) {
	return fetch('/api/v1/scores', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify( { score } ),
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchSession() {
	return fetch('/api/v1/session', {
		method: 'GET',
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchLogout() {
	return fetch('/api/v1/session', {
		method: 'DELETE',
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}

export function fetchLogin(username) {
	return fetch('/api/v1/session', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json'
		}),
		body: JSON.stringify({ username }),
	})
	.catch( () => Promise.reject({ error: 'networkError' }) )
	.then( response => {
		if (response.ok) {
			return response.json();
		}
		return response.json()
		.catch( error => Promise.reject({ error }) )
		.then( err => Promise.reject(err) );
	});
}
	