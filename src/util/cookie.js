const cookieUtil = {
    // 设置cookie
    set: function(name, value, expires, domain, path, secure) {
        var cookieText = "";
        cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires) {
            let exp = new Date();
            exp.setTime(exp.getTime() + expires*1);
            cookieText += "; expires=" + exp.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    // name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
    // 获取cookie
    get: function(name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = "";
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    // 删除cookie
    unset: function(name, domain, path, secure) {
        this.set(name, "", Date(0), domain, path, secure);
    }
};
export default cookieUtil;
