sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/m/MessageToast', "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment",
	"sap/ui/core/message/Message", "sap/m/library", 'sap/m/MessageStrip', 'sap/m/MessageBox'
], function (Controller, MessageToast, JSONModel, Fragment, Message, mobileLibrary, MessageStrip, MessageBox) {
	"use strict";

	return Controller.extend("ink.trng.proj.ecomSstop.controller.Login", {
		onInit: function () {
			var oSelectedRow = {
				"ID": "",
				"Firstname": "",
				"Lastname": "",
				"Email": "",
				"Password": "",
				"Confirmpassword": "",
				"DoB": "",
				"Contactno": "",
				"gender": "",
				"NewEmailRegistration": ""

			};
			this.newEmailforverify = "";
			this.contactforverify = "";
			this.newpass = "";
			this.pass = "";
			this.f1 = false;
			this.f2 = false;
			this.f3 = false;
			this.f4 = false;
			this.f5 = false;
			this.f6 = false;
			this.f7 = false;
			this.f8 = false;
			this.f9 = false;
			this.timer = "";
			var oModel = new JSONModel(oSelectedRow);
			this.getView().setModel(oModel, "oViewModel");

			//	this.getOwnerComponent().getModel("oEmptyModel").setProperty("/oSelectedRow", oSelectedRow);
			var visibledata = {
				"lengthcheck": false,
				"Numeric": false,
				"Uppercase": false,
				"Strongpassword": false,
				"successPassword": false,
				"Lowercase": false,
				"ShowPassword": false,
				"FirstName": false,
				"LastName": false,
				"MaxLength1": false,
				"EmailPattern": false,
				"confirmPasswordpattern": false,
				"showpass": false,
				"showpassbtn": true,
				"hidepassbtn": false,
				"addpass": true,
				"showpass1": false,
				"showpassbtn1": true,
				"hidepassbtn1": false,
				"addpass1": true,
				"showpass3": false,
				"showpassbtn3": true,
				"hidepassbtn3": false,
				"addpass3": true,
				"EmailPatternverify": false,
				"EmailPatternsubmit": false,
				"timeup": false,
				"Contactnopattern": false,
				"ContactPatternsubmit": false,
				"Forgotpasswordemail": false,
				"LoginPage": true,
				"RegisterPage": false,
				"AfterSubmit": false

			};
			var oModel1 = new JSONModel(visibledata);
			this.getView().setModel(oModel1, "oVisibilityModel");
			this.fpc = false; //forgotPassword1
			this.loginEmail = "";
			this.loginpassword = "";
			this.newEmail = "";
			this.newid = 0;
			this.newotp = "";
			var ologindata = {
				"ID": "",
				"Email": "",
				"Password": ""
			};
			var oModel = new JSONModel(ologindata);
			this.getView().setModel(oModel, "oLoginModel");

			var oregisterdata = {

				"userdata": [{
					"ID": "1",
					"Email": "chinmayi@gmail.com",
					"NewEmail": "",
					"Password": "Chinnu123*"
				}, {
					"ID": "2",
					"Email": "subhiksha@gmail.com",
					"NewEmail": "",
					"Password": "Subhiksha123*"
				}]
			};

			this.getOwnerComponent().getModel("oRegisterModel").setProperty("/oregisterdata", oregisterdata);

		},
		OnpressLogin: function () {
			this.loginflag = false;
			this.getView().getModel("oLoginModel").setProperty("Email", this.loginEmail);
			this.getView().getModel("oLoginModel").setProperty("Password", this.loginpassword);
			var len = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata").length;
			//console.log(len);
			for (var i = 0; i < len; i++) {

				if ((this.loginEmail == this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/Email")) && (this
						.loginpassword ==
						this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/Password"))) {
					this.loginflag = true;
					break;
				} else {
					this.loginflag = false;
				}
			}
			if (this.loginflag == true) {
				MessageToast.show("login successful");

			} else {
				MessageToast.show("login not successful");
			}
		},
		eMailLogin: function (oEvent) {
			this.loginEmail = oEvent.getParameters().value;

			if (this.loginEmail.length > 0) {
				var noSpaces2 = this.loginEmail.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", false);
					//	MessageToast.show("valid email");
					var newlen = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata").length;
					for (var i = 0; i < newlen; i++) {
						if (this.loginEmail == this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/Email")) {
							this.newid = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/ID");
							//console.log(this.newid);
						}
					}
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", true);
				}
			}
		},
		passWordLogin: function (oEvent) {
			this.loginpassword = oEvent.getParameters().value;

		},
		onPasswordChangeSubmit: function () {
			if ((this.newEmail).length <= 0) {
				this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", true);
			} else {
				this.getView().getModel("oRegisterModel").setProperty("/oregisterdata/userdata/NewEmail", this.newEmail);
				var len1 = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata").length;
				for (var i = 0; i < len1; i++) {
					if (this.newid == this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/ID")) {
						//console.log(this.newid);
						//console.log(this.getView().getModel("oRegisterModel").getProperty("/userdata/" + i + "/ID"));
						this.getView().getModel("oRegisterModel").setProperty("/oregisterdata/userdata/" + i + "/NewEmail", this.newEmail);
						//console.log(this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/NewEmail"));
					}
				}
				this.dialog1.close();
				if (!this.dialog2) {
					this.dialog2 = sap.ui.xmlfragment("idItemFrag2", "ink.trng.proj.ecomSstop.view.forgotpassword2", this);
					this.getView().addDependent(this.dialog2);
				}
				var EmptyJsonModel = this.getOwnerComponent().getModel("oRegisterModel");
				EmptyJsonModel.setProperty("/NewEmail", this.newEmail);

				var time = this.getView().byId("timer");
				var fiveMinutesLater = new Date();
				var scs = fiveMinutesLater.setMinutes(fiveMinutesLater.getMinutes() + 1);
				var countdowntime = scs;
				var x = setInterval(function () {
					var that = this;
					var now = new Date().getTime();
					var cTime = countdowntime - now;
					var minutes = Math.floor((cTime % (1000 * 60 * 60)) / (1000 * 60));
					var second = Math.floor((cTime % (1000 * 60)) / 1000);
					var timer = "OTP Expires in" +" "+ minutes + ":" + second + " " + "Seconds";
					EmptyJsonModel.setProperty("/text", timer);
					if (cTime < 0) {
						var timer = "OTP Expires in" + "0:0" + "Minutes";
						EmptyJsonModel.setProperty("/text", timer);
					}
				});
				this.dialog2.open();
			}

		},
		onPasswordChangeCancel: function () {
			this.dialog1.close();
			this.dialog1.destroy();
			this.dialog1 = null;
		},
		OnPressingForgotPassword: function () {
			if (!this.dialog1) {
				this.dialog1 = sap.ui.xmlfragment("idItemFrag1", "ink.trng.proj.ecomSstop.view.forgotpassword1", this);
				this.getView().addDependent(this.dialog1);
			}
			this.dialog1.open();
		},
		fpasswordmail: function (oEvent) {
			this.newEmail = oEvent.getParameters().value;
			if (this.newEmail.length > 0) {
				var noSpaces2 = this.newEmail.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", false);

				} else {

					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", true);
				}
			}

		},
		onSubmitforgotpassword2: function () {
			this.dialog2.close();
			if (!this.dialog3) {
				this.dialog3 = sap.ui.xmlfragment("idItemFrag1", "ink.trng.proj.ecomSstop.view.forgotpassword3", this);
				this.getView().addDependent(this.dialog3);
			}
			this.dialog3.open();
		},
		NewPassword: function (oEvent) {
			this.newpass = oEvent.getParameters().value;
			var passlen = this.newpass.length;
			this.isNumberFieldValid(this.newpass, passlen);

		},
		isNumberFieldValid: function (testNumber, inputlen) {

			if (inputlen == 0 || inputlen < 6 || inputlen > 12) {
				this.getView().getModel("oVisibilityModel").setProperty("/lengthcheck", true);
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/lengthcheck", false);

			}
			var noSpaces = testNumber.replace(/ +/, ""); //Remove leading spaces

			var isNum = /.*[0-9a-zA-Z,~,!,@,#,$,%,^,&,*].*/.test(noSpaces);

			var isnumber = /.*[0-9].*/.test(noSpaces);
			var isUpperChar = /.*[A-Z].*/.test(noSpaces);
			var isLowerChar = /.*[a-z].*/.test(noSpaces);
			var isSpecialChar = /.*[~,!,@,#,$,%,^,&,*].*/.test(noSpaces);
			if (isNum) {
				if (isnumber) {
					this.getView().getModel("oVisibilityModel").setProperty("/Numeric", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Numeric", true);
				}
				if (isUpperChar) {
					this.getView().getModel("oVisibilityModel").setProperty("/Uppercase", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Uppercase", true);
				}
				if (isLowerChar) {

					this.getView().getModel("oVisibilityModel").setProperty("/Lowercase", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Lowercase", true);
				}
				if (isSpecialChar) {
					this.getView().getModel("oVisibilityModel").setProperty("/Strongpassword", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Strongpassword", true);
				}

			}

		},
		NewConfirmPassword: function (oEvent) {
			var conpass = oEvent.getParameters().value;

			if (conpass.length > 0) {
				if (this.newpass != conpass) {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", true);
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", false);
					this.getView().getModel("oLoginModel").setProperty("/Confirmpassword", conpass);

				}
			}
		},
		onPressingsubmitfp3: function () {
			this.dialog3.close();
		},
		OnPressingRegisterhereButton: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/LoginPage", false);
			this.getView().getModel("oVisibilityModel").setProperty("/RegisterPage", true);
		},
		//RegisterPage functions

		firstName: function (oEvent) {
			var firstname = oEvent.getParameters().value;
			if (firstname.length > 0) {
				var noSpaces = firstname.replace(/ +/, "");
				var isAllChar = /^[A-Za-z]+$/.test(noSpaces);
				if (isAllChar) {
					this.getView().getModel("oVisibilityModel").setProperty("/FirstName", false);
					this.getView().getModel("oViewModel").setProperty("/Firstname", firstname);
					this.f1 = true;
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/FirstName", true);
				}
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/FirstName", true);
			}
		},
		lastName: function (oEvent) {
			var lastname = oEvent.getParameters().value;
			if (lastname.length > 0) {
				var noSpaces1 = lastname.replace(/ +/, "");
				var isAllChar1 = /^[A-Za-z]+$/.test(noSpaces1);
				if (isAllChar1) {
					this.getView().getModel("oVisibilityModel").setProperty("/LastName", false);
					this.getView().getModel("oViewModel").setProperty("/Lastname", lastname);
					this.f2 = true;
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/LastName", true);
				}
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/LastName", true);
			}

		},
		contactNumber: function (oEvent) {
			var contactnum = oEvent.getParameters().value;
			if (contactnum.length > 0 && contactnum.length <= 10) {

				this.getView().getModel("oVisibilityModel").setProperty("/MaxLength1", false);
				this.getView().getModel("oViewModel").setProperty("/Contactno", contactnum);
				this.f3 = true;

			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/MaxLength1", true);
			}

		},
		eMail: function (oEvent) {
			var email = oEvent.getParameters().value;
			if (email.length > 0) {
				var noSpaces2 = email.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/EmailPattern", false);
					this.getView().getModel("oViewModel").setProperty("/Email", email);
					this.f4 = true;
				} else {

					this.getView().getModel("oVisibilityModel").setProperty("/EmailPattern", true);
				}
			}
		},
		passWord: function (oEvent) {
			this.pass = oEvent.getParameters().value;
			var passlen = this.pass.length;
			this.isNumberFieldValid(this.pass, passlen);

		},
		confirmPassword: function (oEvent) {
			var conpass = oEvent.getParameters().value;

			if (conpass.length > 0) {
				if (this.pass != conpass) {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", true);
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", false);
					this.getView().getModel("oViewModel").setProperty("/Confirmpassword", conpass);
					this.f5 = true;
				}
			}
		},
		Onpresssubmit: function () {
			var dob = this.getView().byId("date").getValue();

			if (dob.length > 0) {

				this.getView().getModel("oViewModel").setProperty("/DoB", dob);
				this.f6 = true;
			}
			if (this.f1 == true && this.f2 == true && this.f3 == true && this.f4 == true && this.f5 == true && this.f6 == true && this.f8 ==
				true) {
				this.getView().getModel("oVisibilityModel").setProperty("/AfterSubmit", true);

			}

		},
		_getDialog: function () {
			if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment("idItemFrag1", "ink.trng.proj.ecomSstop.view.otp1", this);
				this.getView().addDependent(this.dialog);
				var EmptyJsonModel = this.getOwnerComponent().getModel("oRegisterModel");

				var fiveMinutesLater = new Date();
				var scs = fiveMinutesLater.setMinutes(fiveMinutesLater.getMinutes() + 1);
				var countdowntime = scs;
				var x = setInterval(function () {
					var that = this;
					var now = new Date().getTime();
					var cTime = countdowntime - now;
					var minutes = Math.floor((cTime % (1000 * 60 * 60)) / (1000 * 60));
					var second = Math.floor((cTime % (1000 * 60)) / 1000);
					this.timer = "OTP Expires in" +" "+ minutes + ":" + second+" "+ " Seconds";
					//console.log(typeof (minutes));
					EmptyJsonModel.setProperty("/text1", this.timer);
					if (cTime < 0) {

						this.timer = "Your OTP got expired!! Please Select Reset Button to get New OTP!!";
						var newtimer = "OTP Expires in" + "0:0" + "Seconds";
						EmptyJsonModel.setProperty("/text1", this.timer);

					}
				});
				this.dialog.open();
			}

		},

		onSubmit: function () {
			this.dialog.close();
			this.dialog.destroy();
			this.dialog = null;
			this.getView().getModel("oVisibilityModel").setProperty("/LoginPage", true);
			this.getView().getModel("oVisibilityModel").setProperty("/RegisterPage", false);

		},
		showPassword: function () {
			this.getView().byId("showpasswordid").setValue(this.pass);
			this.getView().getModel("oVisibilityModel").setProperty("/showpass", true);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn", false);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn", true);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass", false);
			this.isNumberFieldValid(this.pass, this.pass.length);
		},
		hidePassword: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/showpass", false);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn", true);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn", false);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass", true);

		},

		handleLinkPress: function (evt) {
			MessageBox.alert("Terms and Conditions");
		},

		onSelectGender: function (oEvent) {
			var selectedG = oEvent.getSource().getSelectedIndex();
			var male = "Male";
			var female = "Female";
			var others = "Other";
			if (selectedG == 0) {

				this.getView().getModel("oViewModel").setProperty("/gender", male);
				this.f7 = true;

			} else if (selectedG == 1) {

				this.getView().getModel("oViewModel").setProperty("/gender", female);
				this.f7 = true;

			} else if (selectedG == 2) {

				this.getView().getModel("oViewModel").setProperty("/gender", others);
				this.f7 = true;

			}
		},
		Isselected: function (oEvent) {
			var check = oEvent.getSource();
			if (check.bOutput == true) {
				this.f8 = true;
			} else {
				this.f8 = false;
			}
		},
		verifyEmail: function (oEvent) {
			this.newEmailforverify = oEvent.getParameters().value;
			if (this.newEmailforverify.length > 0) {
				var noSpaces2 = this.newEmailforverify.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternverify", false);
					this.getView().getModel("oViewModel").setProperty("/NewEmailRegistration", this.newEmailforverify);
					this.f9 = false;

				} else {
					this.f9 = true;
					this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternverify", true);
				}
			}

		},
		onpressemailverify: function () {
			if ((this.newEmailforverify).length <= 0) {
				this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternsubmit", true);
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternsubmit", false);
				this.dialognew.close();
				this._getDialog();
			}

		},
		onpressemailverifyCancel: function () {

			this.dialognew.close();
			this.dialognew.destroy();
			this.dialognew = null;
		},
		onpressingotpemailcancel: function () {
			this.dialog.close();
		},
		onResendOTPEmail: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/timeup", true);

		},
		verifyContactNumber: function (oEvent) {
			this.contactforverify = oEvent.getParameters().value;
			if (this.contactforverify.length > 0 && this.contactforverify.length <= 10) {

				this.getView().getModel("oVisibilityModel").setProperty("/Contactnopattern", false);
				this.getView().getModel("oViewModel").setProperty("/Contactno", this.contactforverify);
				this.f3 = true;

			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/Contactnopattern", true);
			}
		},
		onpresscontactnoverifyCancel: function () {
			this.dialogphone.close();
			this.dialogphone.destroy();
			this.dialogphone = null;

		},
		onpresscontactnoverify: function () {
			if ((this.contactforverify).length <= 0) {
				this.getView().getModel("oVisibilityModel").setProperty("/ContactPatternsubmit", true);
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/ContactPatternsubmit", false);
				this.dialogphone.close();
				this._getDialog();
			}
		},
		EmailVerification: function () {
			if (!this.dialognew) {
				this.dialognew = sap.ui.xmlfragment("idItemFrag7", "ink.trng.proj.ecomSstop.view.Emailverification", this);
				this.getView().addDependent(this.dialognew);
			}
			this.dialognew.open();
		},
		PhoneNoVerification: function () {
			if (!this.dialogphone) {
				this.dialogphone = sap.ui.xmlfragment("idItemFrag5", "ink.trng.proj.ecomSstop.view.phoneverification", this);
				this.getView().addDependent(this.dialogphone);
			}
			this.dialogphone.open();
		},
		showPassword1: function () {
			this.getView().byId("newshowpasswordid").setValue(this.loginpassword);
			this.getView().getModel("oVisibilityModel").setProperty("/showpass1", true);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn1", false);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn1", true);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass1", false);
			//this.isNumberFieldValid(this.pass, this.pass.length);
		},
		hidePassword1: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/showpass1", false);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn1", true);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn1", false);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass1", true);

		}
	});
});