import $ from "jquery"
import jQuery from "jquery"

//MD5部分
(function($){
    
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    
    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    
    var F = function(x, y, z) {
        return (x & y) | ((~ x) & z);
    }
    
    var G = function(x, y, z) {
        return (x & z) | (y & (~ z));
    }
    
    var H = function(x, y, z) {
        return (x ^ y ^ z);
    }
    
    var I = function(x, y, z) {
        return (y ^ (x | (~ z)));
    }
    
    var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    
    var convertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    
    var wordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };
    
    var uTF8Encode = function(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };
    
    $.extend({
        md5: function(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11=7, S12=12, S13=17, S14=22;
            var S21=5, S22=9 , S23=14, S24=20;
            var S31=4, S32=11, S33=16, S34=23;
            var S41=6, S42=10, S43=15, S44=21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
                b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
                b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
                a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
                d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
                c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
                c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
                a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
                d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
                c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
                a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
                a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
                b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
                d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        }
    });
})(jQuery);

//COMMON.js部分

//---------- 公共 start 
function getTime() { 
    var date = new Date(); 
    var seperator1 = "-"; 
    var seperator2 = ":"; 
    var year=date.getFullYear(); 
    var month=date.getMonth() + 1; 
    var strDate=date.getDate(); 
    var _Hours=date.getHours(); 
    var _Minutes=date.getMinutes(); 
    var _Seconds=date.getSeconds(); 
    if(month >= 1 && month <= 9){ 
        month = "0" + month; 
    }if(strDate >= 0 && strDate <= 9){ 
        strDate = "0" + strDate; 
    }if(_Hours >= 0 && _Hours <= 9){ 
        _Hours = "0" + _Hours; 
    }if(_Minutes >= 0 && _Minutes <= 9){ 
        _Minutes = "0" + _Minutes; 
    }if(_Seconds >= 0 && _Seconds <= 9){ 
        _Seconds = "0" + _Seconds; 
    } 
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + _Hours + seperator2 + _Minutes + seperator2 + _Seconds; 
    return currentdate; 
}
//---------- 公共 start 
//****************************|||||||||||||||||||||||||||||||||||||********************************
//****************************|||||||||||||||||||||||||||||||||||||********************************
//---------- 登陆 start 
function login_check_go_tip_confirm() { var islogin = login_check_islogin(); if (islogin != true) { layer.open({ content: '您尚未登陆，是否立即登陆？', btn: ['是', '否'], yes: function (index, layero) { login_check_go(); layer.close(index); }, no: function (index) { layer.close(index); } }); } return islogin; }
function login_check_go_tip_direct() { var islogin = login_check_islogin(); if (islogin != true) { layer.open({ content: '您尚未登陆，是否立即登陆？', btn: ['OK'], yes: function (index, layero) { login_check_go(); layer.close(index); }, cancel: function () { login_check_go(); layer.close(index); } }); } return islogin; }
function login_check_go(originurl) { var location_temp = window.location.href; if (location_temp.indexOf('login') == -1 || location_temp.indexOf('initpage') == -1) { if (window.localStorage.getItem("user_mainbodytype") == "0") { window.top.location.href = originurl ? originurl : "/login.html"; } else { window.top.location.href = originurl ? originurl : "/login.html"; } } }
function login_check_islogin() { var islogin = true; if (window.localStorage.getItem("user_accid") == "" || window.localStorage.getItem("user_accid") == "0") { islogin = false; } else { islogin = true; } return islogin; }
function login_out() { clearparams(); var islogin = login_check_islogin(); if (islogin != true) { login_check_go(); } }//登出
function login_event(accName, accPwd) {
    var data_temp = $.extend({}, _para_obj(), {
        accountname: accName,
        password: accPwd,
        agentid: window.localStorage.getItem("agentinfo_user_agentid"),
        type: "101",
        sig: $.md5((getstr_para_obj(_para_obj()) + "&accountname=" + accName + "&password=" + accPwd + "&agentid=" + window.localStorage.getItem("agentinfo_user_agentid") + "&type=101").split("&").join(""))
    });
    layer.open({ style: ' ', type: 2, time: 1 });
    $.ajax({
        async: true,
        type: 'POST',
        url: _apiurl_user + 'user_account/Login',
        contentType: _contentType_form,
        data: data_temp,
        dataType: "text",
        success: function (d) {
            var data = JSON.parse(d)
            if (data.code == 1) {
                if (data.result != "") {
                    var params_login = JSON.parse(data.result);
                    window.localStorage["randomstr"] = (params_login.randomstr) ? params_login.randomstr : "";
                    window.localStorage["sessiontype"] = params_login.sessiontype;
                    window.localStorage["sessionkey"] = (params_login.sessionkey) ? params_login.sessionkey : "";
                    window.localStorage["user_accid"] = (params_login.user_accid) ? params_login.user_accid : "";
                    window.localStorage["user_accname"] = (params_login.user_accname) ? params_login.user_accname : "";
                    window.localStorage["user_acctype"] = (params_login.user_acctype) ? params_login.user_acctype : "";
                    window.localStorage["user_roleid"] = (params_login.user_roleid) ? params_login.user_roleid : "";
                    window.localStorage["user_userid"] = (params_login.user_userid) ? params_login.user_userid : "";
                    window.localStorage["user_username"] = (params_login.user_username) ? params_login.user_username : "";
                    window.localStorage["user_mainbodytype"] = (params_login.user_mainbodytype) ? params_login.user_mainbodytype : "";
                    window.localStorage["user_platformaccid"] = (params_login.user_platformaccid) ? params_login.user_platformaccid : "";
                    window.localStorage["user_platformname"] = (params_login.user_platformname) ? params_login.user_platformname : "";

                    window.localStorage["user_agentaccid"] = (params_login.user_agentaccid) ? params_login.user_agentaccid : "";
                    window.localStorage["user_agentname"] = (params_login.user_agentname) ? params_login.user_agentname : "";

                    window.localStorage["accpermission"] = (params_login.accpermission) ? params_login.accpermission : "";
                    window.localStorage["user_acctype"] = params_login.user_acctype;
                    window.localStorage["authorizedparty_accid"] = params_login.authorizedparty_accid;
                    window.localStorage["acceptauthorization_accid"] = params_login.acceptauthorization_accid;
                    //
                    window.location.href = "pages/index.html";
                }
            } else { layer.open({ style: '', content: data.msg, time: 1 }); }
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) { layer.open({ style: '', content: _apierrmsg, time: 1 }); },
        complete: function () { }
    });


}
//---------- 登陆 end 
//****************************|||||||||||||||||||||||||||||||||||||********************************
//****************************|||||||||||||||||||||||||||||||||||||********************************
//---------- 页面返回 start
function historyback() { history.back(); }
function uninstallpage(obj) { $(obj).remove(); }
//---------- 页面返回 end
//****************************|||||||||||||||||||||||||||||||||||||********************************
//****************************|||||||||||||||||||||||||||||||||||||********************************
//---------- 权限解析 start
function parse_accpermission() {
    var obj_accpermission = [];
    var obj_accpermission_temp = new Object();
    var list = window.localStorage.getItem("accpermission").toString();
    if (list != "" && list != "[]" && list != null && list != "null") {
        obj_accpermission = JSON.parse(list);
    }
    if (obj_accpermission.length > 0) {
        $.each(obj_accpermission, function (n, item) {
            if (obj_accpermission_temp[item.permissiontype + "|" + item.permissionvalue]) {
                obj_accpermission_temp[item.permissiontype + "|" + item.permissionvalue] += "," + item.permissionoperatetype;
            } else {
                obj_accpermission_temp[item.permissiontype + "|" + item.permissionvalue] = item.permissionoperatetype;
            }
        })
    }
    return obj_accpermission_temp;
}
//---------- 权限解析 end
//****************************|||||||||||||||||||||||||||||||||||||********************************
//****************************|||||||||||||||||||||||||||||||||||||********************************

var _user_platformid = 1;
//=========初始化=========
var _contentType_form = 'application/x-www-form-urlencoded';
var _key = "@uhVqUKBHRc4XiEilOb9zpiQ3!8mYUp3RGtsSEPrCuQY1jbjAAL@R72vH59b_qhYN";
var _apierrmsg = "请检查网络是否畅通！";
var _page = 1;
var _pagecount = 10;
initparams();
var _para_obj=function(){
    return {
        d:getTime(),
        v:1,
        format:"json",
        //
        user_mainbodytype: window.localStorage.getItem("user_mainbodytype"),
        user_platformid: window.localStorage.getItem("user_platformid"),
        user_platformname: window.localStorage.getItem("user_platformname"),
        user_accid: window.localStorage.getItem("user_accid"),
        user_accname: window.localStorage.getItem("user_accname"),
        user_acctype: window.localStorage.getItem("user_acctype"),
        user_roleid: window.localStorage.getItem("user_roleid"),
        user_userid: window.localStorage.getItem("user_userid"),
        user_username: window.localStorage.getItem("user_username"),

        user_agentid: window.localStorage.getItem("user_agentid"),
        user_agentname: window.localStorage.getItem("user_agentname"),
        user_agentaccid: window.localStorage.getItem("user_agentaccid"),

        //
        randomstr: window.localStorage.getItem("randomstr"),
        sessiontype: window.localStorage.getItem("sessiontype"),
        sessionkey: window.localStorage.getItem("sessionkey"),
        device: window.localStorage.getItem("device"),
        updt: window.localStorage.getItem("updt"),
        keystr: window.localStorage.getItem("keystr"),
        nowt: window.localStorage.getItem("nowt"),
        machine: window.localStorage.getItem("machine"),
        authorizedparty_accid: window.localStorage.getItem("authorizedparty_accid"),
        acceptauthorization_accid: window.localStorage.getItem("acceptauthorization_accid")
        //
    };
}


//----清除缓存----
function clearparams() {
    //必要参数
    window.localStorage["user_mainbodytype"] = "0";
    window.localStorage["user_platformid"] = "0";
    window.localStorage["user_platformname"] = "";
    window.localStorage["user_accid"] = "0";
    window.localStorage["user_accname"] = "";
    window.localStorage["user_acctype"] = "-1";
    window.localStorage["user_roleid"] = "0";
    window.localStorage["user_userid"] = "0";
    window.localStorage["user_username"] = "";

    window.localStorage["user_agentid"] = "0";
    window.localStorage["user_agentname"] = "";
    window.localStorage["user_agentaccid"] = "0";

    window.localStorage["randomstr"] = "";
    window.localStorage["sessiontype"] = "-1";
    window.localStorage["sessionkey"] = "";
    window.localStorage["device"] = "0";
    window.localStorage["updt"] = "0";
    window.localStorage["keystr"] = _key;
    window.localStorage["nowt"] = "0";
    window.localStorage["machine"] = "";
    //其他参数

    window.localStorage["accpermission"] = "";
    window.localStorage["authorizedparty_accid"] = "";
    window.localStorage["acceptauthorization_accid"] = "";

}
//----初始化缓存----
function initparams() {
    //必要参数    
    window.localStorage.getItem("user_mainbodytype") ? "" : window.localStorage["user_mainbodytype"] = "0";
    window.localStorage.getItem("user_platformid") ? "" : window.localStorage["user_platformid"] = "0";
    window.localStorage.getItem("user_platformname") ? "" : window.localStorage["user_platformname"] = "";
    window.localStorage.getItem("user_accid") ? "" : window.localStorage["user_accid"] = "0";
    window.localStorage.getItem("user_accname") ? "" : window.localStorage["user_accname"] = "";
    window.localStorage.getItem("user_acctype") ? "" : window.localStorage["user_acctype"] = "-1";
    window.localStorage.getItem("user_roleid") ? "" : window.localStorage["user_roleid"] = "0";
    window.localStorage.getItem("user_userid") ? "" : window.localStorage["user_userid"] = "0";
    window.localStorage.getItem("user_username") ? "" : window.localStorage["user_username"] = "";

    window.localStorage.getItem("user_agentid") ? "" : window.localStorage["user_agentid"] = "0";
    window.localStorage.getItem("user_agentname") ? "" : window.localStorage["user_agentname"] = "";
    window.localStorage.getItem("user_agentaccid") ? "" : window.localStorage["user_agentaccid"] = "0";

    window.localStorage.getItem("randomstr") ? "" : window.localStorage["randomstr"] = "";
    window.localStorage.getItem("sessiontype") ? "" : window.localStorage["sessiontype"] = "-1";
    window.localStorage.getItem("sessionkey") ? "" : window.localStorage["sessionkey"] = "";
    window.localStorage.getItem("device") ? "" : window.localStorage["device"] = "0";
    window.localStorage.getItem("updt") ? "" : window.localStorage["updt"] = "0";
    window.localStorage.getItem("keystr") ? "" : window.localStorage["keystr"] = _key;
    window.localStorage.getItem("nowt") ? "" : window.localStorage["nowt"] = "0";
    window.localStorage.getItem("machine") ? "" : window.localStorage["machine"] = "";
    //其他参数

    window.localStorage.getItem("accpermission") ? "" : window.localStorage["accpermission"] = "";
    window.localStorage.getItem("authorizedparty_accid") ? "0" : window.localStorage["authorizedparty_accid"] = "0";
    window.localStorage.getItem("acceptauthorization_accid") ? "0" : window.localStorage["acceptauthorization_accid"] = "0";

    //初始化host指定agentid
    window.localStorage.getItem("agentinfo_user_agentid") ? "" : window.localStorage["agentinfo_user_agentid"] = "0";
    window.localStorage.getItem("agentinfo_user_agentname") ? "" : window.localStorage["agentinfo_user_agentname"] = "";
    window.localStorage.getItem("agentinfo_hostname") ? "" : window.localStorage["agentinfo_hostname"] = "";

}
//----标签值转换----
function getstr_para_obj(para_obj_temp) {
    var str_temp = ""
    str_temp += "d=" + para_obj_temp.d; //[0]
    str_temp += "&v=" + para_obj_temp.v; //[0]
    str_temp += "&format=" + para_obj_temp.format; //[0]
    //    
    str_temp += "&user_mainbodytype=" + para_obj_temp.user_mainbodytype; //[0]
    str_temp += "&user_platformid=" + para_obj_temp.user_platformid; //[0]
    str_temp += "&user_platformname=" + para_obj_temp.user_platformname; //[0]
    str_temp += "&user_accid=" + para_obj_temp.user_accid; //[0]
    str_temp += "&user_accname=" + para_obj_temp.user_accname; //[0]
    str_temp += "&user_acctype=" + para_obj_temp.user_acctype; //[0]        
    str_temp += "&user_roleid=" + para_obj_temp.user_roleid; //[0]     
    str_temp += "&user_userid=" + para_obj_temp.user_userid; //[0]
    str_temp += "&user_username=" + para_obj_temp.user_username; //[0]  

    str_temp += "&user_agentid=" + para_obj_temp.user_agentid; //[0]
    str_temp += "&user_agentname=" + para_obj_temp.user_agentname; //[0]
    str_temp += "&user_agentaccid=" + para_obj_temp.user_agentaccid; //[0]

    //
    str_temp += "&randomstr=" + para_obj_temp.randomstr; //[0]    
    str_temp += "&sessiontype=" + para_obj_temp.sessiontype; //[0]
    str_temp += "&sessionkey=" + para_obj_temp.sessionkey; //[0]
    str_temp += "&device=" + para_obj_temp.device; //[0]
    str_temp += "&updt=" + para_obj_temp.updt; //[0]
    str_temp += "&keystr=" + para_obj_temp.keystr; //[0]
    str_temp += "&nowt=" + para_obj_temp.nowt; //[0]
    str_temp += "&machine=" + para_obj_temp.machine; //[0]
    str_temp += "&authorizedparty_accid=" + para_obj_temp.authorizedparty_accid; //[0]
    str_temp += "&acceptauthorization_accid=" + para_obj_temp.acceptauthorization_accid; //[0]

    return str_temp;
}




//----标签值转换----
function getobj_formdata(formdata_temp, para_obj_temp) {
    formdata_temp.append("d", para_obj_temp.d);
    formdata_temp.append("v", para_obj_temp.v);
    formdata_temp.append("format", para_obj_temp.format);
    //    
    formdata_temp.append("user_mainbodytype", para_obj_temp.user_mainbodytype);
    formdata_temp.append("user_platformid", para_obj_temp.user_platformid);
    formdata_temp.append("user_platformname", para_obj_temp.user_platformname);
    formdata_temp.append("user_accid", para_obj_temp.user_accid);
    formdata_temp.append("user_accname", para_obj_temp.user_accname);
    formdata_temp.append("user_acctype", para_obj_temp.user_acctype);
    formdata_temp.append("user_roleid", para_obj_temp.user_roleid);
    formdata_temp.append("user_userid", para_obj_temp.user_userid);
    formdata_temp.append("user_username", para_obj_temp.user_username);

    formdata_temp.append("user_agentid", para_obj_temp.user_agentid);
    formdata_temp.append("user_agentname", para_obj_temp.user_agentname);
    formdata_temp.append("user_agentaccid", para_obj_temp.user_agentaccid);

    //
    formdata_temp.append("randomstr", para_obj_temp.randomstr);
    formdata_temp.append("sessiontype", para_obj_temp.sessiontype);
    formdata_temp.append("sessionkey", para_obj_temp.sessionkey);
    formdata_temp.append("device", para_obj_temp.device);
    formdata_temp.append("updt", para_obj_temp.updt);
    formdata_temp.append("keystr", para_obj_temp.keystr);
    formdata_temp.append("nowt", para_obj_temp.nowt);
    formdata_temp.append("machine", para_obj_temp.machine);
    formdata_temp.append("authorizedparty_accid", para_obj_temp.authorizedparty_accid);
    formdata_temp.append("acceptauthorization_accid", para_obj_temp.acceptauthorization_accid);
    return formdata_temp;
}

//MAIN.js部分

//============================================================= 接口使用专用
//=========初始化=========
//var apiurl_sys_interface_detail = "http://localhost:45321/";
var apiurl_sys_interface_detail = "http://106.14.115.8:9003/";
var _contentType_form_interface_detail = 'application/x-www-form-urlencoded';
var _key_interface_detail = "@uhVqUKBHRc4XiEilOb9zpiQ3!8mYUp3RGtsSEPrCuQY1jbjAAL@R72vH59b_qhYN";
initparams_interface_detail();
var _para_obj_interface_detail = {
    d: getTime(),
    v: 1,
    format: "json",
    //
    user_accid: window.localStorage.getItem("user_accid_interface_detail"),
    user_accname: window.localStorage.getItem("user_accname_interface_detail"),
    sessionkey: window.localStorage.getItem("sessionkey_interface_detail"),
    keystr: window.localStorage.getItem("keystr_interface_detail"),
};

//----清除缓存----
function clearparams_interface_detail() {
    //必要参数
    window.localStorage["user_accid_interface_detail"] = "0";
    window.localStorage["user_accname_interface_detail"] = "";
    window.localStorage["sessionkey_interface_detail"] = "";
    window.localStorage["keystr_interface_detail"] = _key_interface_detail;
}
//----初始化缓存----
function initparams_interface_detail() {
    //必要参数    
    window.localStorage.getItem("user_accid_interface_detail") ? "" : window.localStorage["user_accid_interface_detail"] = "0";
    window.localStorage.getItem("user_accname_interface_detail") ? "" : window.localStorage["user_accname_interface_detail"] = "";
    window.localStorage.getItem("sessionkey_interface_detail") ? "" : window.localStorage["sessionkey_interface_detail"] = "";
    window.localStorage.getItem("keystr_interface_detail") ? "" : window.localStorage["keystr_interface_detail"] = _key_interface_detail;
}
//----标签值转换----
function getstr_para_obj_interface_detail(para_obj_temp){
    var str_temp = ""
    str_temp += "d=" + para_obj_temp.d; //[0]
    str_temp += "&v=" + para_obj_temp.v; //[0]
    str_temp += "&format=" + para_obj_temp.format; //[0]
    //    
    str_temp += "&user_accid=" + para_obj_temp.user_accid; //[0]
    str_temp += "&user_accname=" + para_obj_temp.user_accname; //[0]
    str_temp += "&sessionkey=" + para_obj_temp.sessionkey; //[0]
    str_temp += "&keystr=" + para_obj_temp.keystr; //[0]
    //
    return str_temp;
}

const createInterFace=function(obj){
    let str=""
    for(let key in obj){
        str=str+`&${key}=${obj[key]}`
    }
    return  Object.assign({},_para_obj(),obj,{
        sig:$.md5((getstr_para_obj(_para_obj())+str).split("&").join(""))
    })      
}

//返回结果的处理
const setLocalValue=function(json){
    //传入解析后的json对象
    //定义了一个将data中的数据设置到LocalStorage中的方法
    if (json.code==1){
        if (json.result!=""){
            const params_login=JSON.parse(json.result);
            //将返回结果存入localStorage
            localStorage.setItem("randomstr",params_login.randomstr||"");

            localStorage.setItem("sessiontype",params_login.sessiontype);
            
            localStorage.setItem("sessionkey",params_login.sessionkey||"");

            localStorage.setItem("user_accid",params_login.user_accid||"")

            localStorage.setItem("user_accname",params_login.user_accname||"");

            localStorage.setItem("user_acctype",params_login.user_acctype||"")

            localStorage.setItem("user_roleid",params_login.user_roleid||"");

            localStorage.setItem("user_userid",params_login.user_userid||"");

            localStorage.setItem("user_username",params_login.user_username||"");

            localStorage.setItem("user_mainbodytype",params_login.user_mainbodytype||"");

            localStorage.setItem("user_platformaccid",params_login.user_platformaccid||"");

            localStorage.setItem("user_platformname",params_login.user_platformname||"");

            localStorage.setItem("user_agentaccid",params_login.user_agentaccid||"");
            localStorage.setItem("user_agentname",params_login.user_agentname||"");

            localStorage.setItem("accpermission",params_login.accpermission||"");
            localStorage.setItem("user_acctype",params_login.user_acctype);

            localStorage.setItem("authorizedparty_accid",params_login.authorizedparty_accid);
            localStorage.setItem("acceptauthorization_accid",params_login.acceptauthorization_accid);            
            
            //window.location.href="pages/index.html";
        }
    }
}

export {createInterFace,setLocalValue}