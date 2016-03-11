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

/**
 * HSL颜色值转换为RGB. 
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 */
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function alertError(msg) {
	alert(msg);
}