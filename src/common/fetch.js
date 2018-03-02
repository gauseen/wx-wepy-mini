import wepy from 'wepy'

const api = '/api'

export const common = function (type, url, data, options = {}) {
	const config = {
		method: type,
		url: `${api}${url}`,
		data: data,
		dataType: 'json',
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
	}

	return wepy.request(config).then(res => {
		if (res.success) {
			return res.data
		} else {
			return res.error
		}
	})
}

export const get = function (url, data, options) {
	return common('GET', url, data, options)
}

export const post = function (url, data, options) {
	return common('POST', url, data, options)
}

const install = function (instance) {
	instance.$get = get
	instance.$post = post
}

export default install
