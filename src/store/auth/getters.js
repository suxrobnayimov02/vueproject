export const getters = {
	USER: (state) => state.user,
	USER_TOKEN: state => state.user.token,
	USER_FULL_NAME: state => state.user.fullname,
	REGION_ID: state => state.user.region_id,
	GET_IS_AUTH: state => state.user.is_auth,
	GET_APP_MODUL: state => state.app_modul,
	GET_TOTAL_EVENT: state => state.total_event,
	GET_EXPORT_DATA: state => state.export_data
}