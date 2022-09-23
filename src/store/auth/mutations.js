export const mutations = {
	SET_ID: (state, id) => (state.user.id = id),
	SET_USER: (state, user) => {
		state.user.id = user.id
		state.user.login = user.login
		state.user.pin = user.pin
		state.user.data = user
		state.user.age = getAge(user.birth_date)
		if (user.profile && user.profile.length) {
			state.user.fullname = user.profile.first_name + ' ' + user.profile.last_name
		}
	},
	SET_USER_TOKEN: (state, token) => (state.user.token = token),
	SET_IS_AUTH: (state, condition) => (state.user.is_auth = condition)
}
function getAge(dateString) {
	var today = new Date()
	var birthDate = new Date(dateString)
	var age = today.getFullYear() - birthDate.getFullYear()
	var m = today.getMonth() - birthDate.getMonth()
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}
	return age
}
  