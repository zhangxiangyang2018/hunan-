let host //主体域名设置
if (process.env.NODE_ENV == 'development') {
	host = 'http://192.168.5.28:8091'
} else {
	host = 'http://172.25.141.245:8091'
}

export default host