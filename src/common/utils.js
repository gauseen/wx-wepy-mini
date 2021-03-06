// 判断所有数据类型是否为空
export function isEmpty (value) {
	const type = getType(value)

	switch (type) {
		case 'object':
			return Object.keys(value).length === 0
		case 'array':
			return value.length === 0
		case 'number':
			return !isNaN(value)
		default:
			return !!value
	}
}

// 解析链接中的数据
export function parseUrl (url) {
	url = url || window.location.href

	const splitUrl = url.split('?')
	const [link, params] = splitUrl

	if (params) {
		const result = {url: link}
		const _params = params.split('&')
		_params.forEach(item => {
			const [name, key] = item.split('=')
			result[name] = decodeURIComponent(key)
		})
		return result
	} else return {}
}

// 对象转form数据
// 举个栗子 {name: 'woolson', msg: 'hello'} => name=woolson&msg=hello
export function obj2Params (data) {
	var dataType = getType(data)

	if (dataType !== 'object') {
		console.error('function obj2Params receive a nonsupport type parameter.')
		return
	}

	return resolveObj(data).join('&')
}

export function resolveObj (obj, parents) {
	var result = []
	var parentsStr = ''

	if (parents) parentsStr = parents.join('.') + '.'
	else parents = []

	Object.keys(obj).forEach(function (key) {
		switch (getType(obj[key])) {
			case 'object':
				var insetObj = resolveObj(obj[key], parents.concat([key]))
				result = result.concat(insetObj)
				break
			case 'array':
				result.push(parentsStr + key + '=' + obj[key].join())
				break
			default:
				result.push(parentsStr + key + '=' + obj[key])
				break
		}
	})
	return result
}

// 获取数据具体类型
// 举个栗子: 'string', 'object', 'number', 'null', 'undefined'
export function getType (value) {
	var typer = Object.prototype.toString
	var typeStr = typer.call(value)

	typeStr = typeStr.replace(/.*\s(\w+)\]/g, '$1')
	return typeStr.toLowerCase()
}

// 根据各个环境配置不同变量；sit、uat测试环境；it生产环境
export function configENV (config = {lang: 'cn'}) {
	const _ENV_ = document.domain.replace(/(sit|uat|it|.{0}).*/g, '$1') || 'location'
	const key = `${_ENV_}_${config.lang}`
	return config[key]
}

// 日期格式化，举个栗子：
// yy-MM-dd ==> 18-01-05
// yyyy-MM-dd ==> 2018-01-05
// yyyy-MM-dd hh:mm ==> 2018-01-05 15:30
// yyyy-MM-dd hh:mm:ss ==> 2018-01-05 15:30:11
// yyyy-M-d h:m:s ==> 2018-1-5 8:8:8
export function dateFormat (date, fmt) {
	if (!date) return
	// iOS Android 日期兼容
	var dateArr = date.split(/[- :/]/)
	date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4], dateArr[5])

	var tmp = fmt || 'yyyy-MM-dd'
	var newDate = new Date(date)
	var fullYear = newDate.getFullYear()
	var year = String(fullYear).substr(2)
	var month = newDate.getMonth() + 1
	var monthWithZero = ('0' + month).substr(-2)
	var day = newDate.getDate()
	var dayWithZero = ('0' + day).substr(-2)
	var hh = newDate.getHours()
	var hhWithZero = ('0' + hh).substr(-2)
	var mm = newDate.getMinutes()
	var mmWithZero = ('0' + mm).substr(-2)
	var ss = newDate.getSeconds()
	var ssWithZero = ('0' + ss).substr(-2)

	var items = [
		{ key: 'yyyy', value: fullYear },	// 2018年
		{ key: 'yy', value: year },			// 18年
		{ key: 'MM', value: monthWithZero }, // 01月
		{ key: 'M', value: month },		// 1月
		{ key: 'dd', value: dayWithZero },	// 01日
		{ key: 'd', value: day },  // 1日
		{ key: 'hh', value: hhWithZero }, // 09时
		{ key: 'h', value: hh }, // 9时
		{ key: 'mm', value: mmWithZero }, // 03分
		{ key: 'm', value: mm }, // 3分
		{ key: 'ss', value: ssWithZero }, // 08秒
		{ key: 's', value: ss }, // 8秒
	]

	items.forEach(item => {
		tmp = tmp.replace(item.key, item.value)
	})

	return tmp
}
