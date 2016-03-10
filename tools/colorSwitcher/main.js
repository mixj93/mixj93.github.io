function decToHexStr(decNum) {
	var hexStr;
	hexStr = decNum.toString(16);
	if (hexStr.length < 2){
		hexStr = "0" + hexStr;
	}
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
		var rgbArr = [];
		for (var i = 1; i < hexArr.length; i++) {
			rgbArr.push(hexToDecNum(hexArr[i]));
		}
		var rgbColor = "rgb(" + rgbArr.join(", ") + ")";

		return { 
			hex: "#"+hexColor, 
			hexValue: hexColor,
			rgb: rgbColor,
			rgbValue: rgbArr
		};

	} else {
		alertError("十六进制颜色值不正确");
	}
}

function rgbToHex(rgbColor) {
	var rgbRe = /^rgb\(\s*(\d|\d\d|1\d\d|2[0-4]\d|25[0-5])\s*\,\s*(\d|\d\d|1\d\d|2[0-4]\d|25[0-5])\s*\,\s*(\d|\d\d|1\d\d|2[0-4]\d|25[0-5])\s*\)$/;
	if (rgbRe.test(rgbColor)) {
		var rgbArr = rgbRe.exec(rgbColor);

	var hexArr = [];
	var hexColor = "";
	for (var i = 1; i < rgbArr.length; i++) {
		hexArr.push(decToHexStr(parseInt(rgbArr[i])));
	}

	hexColor = "#" + hexArr.join("");
	rgbColor = "rgb(" + rgbArr[1] +", "+ rgbArr[2] +", "+ rgbArr[3] + ")";

	return { 
		hex: hexColor,
		hexValue:  hexArr.join(""),
		rgb: rgbColor,
		rgbValue: [parseInt(rgbArr[1]), parseInt(rgbArr[2]), parseInt(rgbArr[3])]
	};

	} else {
		alertError("RGB颜色值不正确");
	}
}

function alertError(msg) {
	alert(msg);
}