/**
 * Split a string into an array of objects with key property
 * @param {string|Array} str
 * @returns
 */
export function splitAsKeys(str) {
	if (typeof str === 'string') {
		return str.split('').map((key) => ({ key }))
	} else if (typeof str === 'object' && str && 'key' in str) {
		return str
	}
	return []
}
