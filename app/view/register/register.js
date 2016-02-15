var registerVM = require("../viewmodel/register-view-model");
var user = registerVM.instance;
function pageloaded(args){
	var page = args.object;
	page.bindingContext = user;
	autoLogin();
}
exports.pageloaded = pageloaded;
function autoLogin(){
	user.toggleAutoLogin(true);
}
exports.autoLogin = autoLogin;
function autoLoginNo(){
	user.toggleAutoLogin(false);
}
exports.autoLoginNo = autoLoginNo;
function tapGenderMale(){
	user.toggleGender(true);
}
exports.tapGenderMale = tapGenderMale;
function tapGenderFeMale(){
	user.toggleGender(false);
}
exports.tapGenderFeMale = tapGenderFeMale;

function tapAge1()
{
	user.toggleAgegroup(1);
}
exports.tapAge1 = tapAge1;
function tapAge2()
{
	user.toggleAgegroup(2);
}
exports.tapAge2 = tapAge2;
function tapAge3()
{
	user.toggleAgegroup(3);
}
exports.tapAge3 = tapAge3;
function tapAge4()
{
	user.toggleAgegroup(4);
}
exports.tapAge4 = tapAge4;
function tapAge5()
{
	user.toggleAgegroup(5);
}
exports.tapAge5 = tapAge5;
function tapAge6()
{
	user.toggleAgegroup(6);
}
exports.tapAge6 = tapAge6;
function tapAge7()
{
	user.toggleAgegroup(7);
}
exports.tapAge7 = tapAge7;