// 加载中提示
function loading (title = '加载中') {
	wx.showLoading({
		title: title,
		mask: true,
	})
}
// 加载完毕
function loaded () {
	wx.hideLoading()
}

// 对外暴露接口
export {
	loading,
	loaded,
}
