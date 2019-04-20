const base =
    process.env.NODE_ENV === "production" ?
	"http://192.168.5.28:8091":
	"http://192.168.5.28:8091";
var Configport = {
    netUrl: base
}
export default Configport