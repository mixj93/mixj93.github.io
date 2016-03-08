function decToHexStr(decNum) {
	var hexStr;
	hexStr = decNum.toString(16);
	return hexStr;
}

function hexToDecNum(hexStr) {
	var decNum;
	decNum = parseInt(hexStr, 16);
	return decNum;
}

function hexToRgb(hexColor) {
	hexColor = (hexColor[0] == '#') ? hexColor.slice(1) : hexColor;

	var re = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	if (re.test(hexColor)) {
		if(hexColor.length == 3) {
			var tempColor = "";
			for (var i = 0; i < hexColor.length; i++) {
				tempColor = tempColor + hexColor[i] + hexColor[i];
			}
			hexColor = tempColor;
		}

		var splitRe = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
		var hexArr = splitRe.exec(hexColor);
		var rbgArr = [];
		for (var i = 1; i < hexArr.length; i++) {
			rbgArr.push(hexToDecNum(hexArr[i]));
		}
		var rbgColor = "rgb(" + rbgArr.join(", ") + ")";

		return rbgColor;

	} else {
		alertError("十六进制颜色值位数不正确");
	}
}

function rgbToHex() {
	var rgbRe = /^rgb\([\d\,\s]+\)$/;
}

function alertError(msg) {
	alert(msg);
}