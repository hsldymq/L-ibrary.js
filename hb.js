;(function(g) {

    /** @var {Object} global - 全局域对象 */
    var global = g;

    /** @var {*} previous - 防止命名冲突,保存覆盖前的对象 */
    var previous = global.L;

    /** @var {RegExp} emailFormat - 电子邮箱地址验证正则 */
    var emailFormat = /^[-a-zA-Z0-9_\.]+@[-a-zA-Z0-9]+[\.a-zA-Z]+$/;

    /** @var {RegExp} mobileFormat - 电子邮箱地址验证正则 */
    var mobileFormat = /^(?:\+86)?(?:(?:13|18)\d|14[57]|15[0-35-9]|17[067])\d{8}$/;

    /** @var {number} DEFAULT_VAR_DUMP_MAX_HIERARCHY - varDump函数默认最大递归层次 */
    var DEFAULT_VAR_DUMP_MAX_HIERARCHY = 3;

    // 原生类原型Shortcut
    var ObjectProto = Object.prototype;

    /** @var {function} toString - 原生类原型方法便捷调用 */
    var toString = ObjectProto.toString;

    var _ = function () {
        return this;
    };

    global.L = _;



    /***************************************************/
    /**********************断言方法**********************/
    /***************************************************/

    /**
     * 判断对象是否为undefined.
     * @param {*} object
     * @return {boolean}
     */
    _.isUndefined = function (object) {
        return typeof(object) === 'undefined';
    };

    /**
     * 对象是否为字符串类型.
     * @param {*} object
     * @return {boolean}
     */
    _.isString = function (object) {
        return toString.call(object) === '[object String]';
    };

    /**
     * 判断对象是否布尔值.
     * @param {*} object
     * @return {boolean}
     */
    _.isBoolean = function (object) {
        return toString.call(object) === '[object Boolean]';
    };

    /**
     * 判断对象是否为数字类型.
     * @param {*} object
     * @param {boolean} [strict=false] - 是否严格判断,默认非严格,即object为string类型且满足数字的格式也被认定为数字类型
     * @return {boolean}
     */
    _.isNumber = function (object, strict) {
        strict = _.isBoolean(strict) ? strict : false;

        if (toString.call(object) === '[object Number]') { return true };
        return ! strict && _.isString(object) && /^[-|+]?(?:\d+|\d*\.\d+)$/.test(object);
    };

    /**
     * 判断对象是否为浮点数.
     * @param {*} object
     * @param {boolean} [strict=false] - 是否严格判断,默认非严格,即当object为字符串的值也满足浮点格式也被认定为浮点数
     * @return {boolean}
     */
    _.isFloat = function (object, strict) {
        if ( ! _.isString(object) && ! _.isNumber(object, true)) { return false; }

        strict = _.isBoolean(strict) ? strict : false;
        return ( ! strict || strict && _.isNumber(object, true))
            && /^[-|+]?\d*\.\d+$/.test(object);
    };

    /**
     * 判断对象是否为整型数.
     * @param {*} object
     * @param {boolean} [strict=false] - 是否严格判断,默认非严格,即当object为字符串的值也满足整型格式也被认定为整型数
     * @return {boolean}
     */
    _.isInteger = function (object, strict) {
        if ( ! _.isString(object) && ! _.isNumber(object, true)) { return false; }

        strict = _.isBoolean(strict) ? strict : false;
        return ( ! strict || strict && _.isNumber(object, true))
            && /^[-|+]?\d+$/.test(object);
    };

    /**
     * 对象是否为Object对象.
     * @param {*} object
     * @return {boolean}
     */
    _.isObject = function (object) {
        return typeof(object) === 'object' && object !== null;
    };

    /**
     * 判断对象是否函数.
     * @param {*} object
     * @return {boolean}
     */
    _.isFunction = function (object) {
        return typeof(object) === 'function';
    };

    /**
     * 判断对象是否数组.
     * @param {*} object
     * @return {boolean}
     */
    _.isArray = function (object) {
        return toString.call(object) === '[object Array]';
    };

    /**
     * 判断对象是否日期.
     * @param {*} object
     * @return {boolean}
     */
    _.isDate = function (object) {
        return toString.call(object) === '[object Date]';
    };

    /**
     * 判断对象是否正则对象.
     * @param {*} object
     * @return {boolean}
     */
    _.isRegExp = function (object) {
        return toString.call(object) === '[object RegExp]';
    };

    /**
     * 判断是否为jQuery对象.
     * @param {*} object
     * @returns {boolean}
     */
	_.isJquery = function (object) {
		return _.isObject(object) && _.isString(object.jquery) ||
            _.isFunction(object) && _.isString(object.prototype.jquery);
	};

    /**
     * 判断对象是否为HTML DOM对象.
     * @param {*} object
     * @return {boolean}
     */
    _.isHtmlElement = function (object) {
        return object instanceof HTMLElement;
    };

    /**
     * 判断对象是否颜色值
     * 支持判断HEX,RGB(A),HSL(A)5种类型的颜色.
     * e.g. #A5B412|rgb(121, 23, 5)|rgba(123, 51, 1, 0.2)|hsl(320, 50%, 100%)|hsla(210, 12%, 5%, 0.5).
     * @param {*} object
     * @param {string|Array} [type] - 判断的颜色类型('hex', 'rgb', 'rgba', 'hsl', 'hsla')
     *      默认判断是否是这五种颜色中的一种
     *      传入以上五种类型任意一种的字符串(例如'rgb')即判断是否是这种类型的字符串
     *      传入数组例如['rgb','hsl'],则判断是否是这两种颜色中的一种
     * @return {boolean}
     */
    _.isColor = function (object, type) {
        if ( ! _.isArray(type)) {
            if ( ! _.isString(type)) {
                type = ['hex', 'rgb', 'rgba', 'hsl', 'hsla'];
            } else {
                type = [type];
            }
        }

        var matchCollection = [];
        var regExps = {
            'hex': /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
            'rgb': /^rgb\(\s*(?:2(?:[0-4]\d|5[0-5])|1\d{2}|[1-9]?\d)(?:\s*,\s*(?:2(?:[0-4]\d|5[0-5])|1\d{2}|[1-9]?\d)){2}\s*\)$/,
            'rgba': /^rgba?\(\s*(?:2(?:[0-4]\d|5[0-5])|1\d{2}|[1-9]?\d)(?:\s*,\s*(?:2(?:[0-4]\d|5[0-5])|1\d{2}|[1-9]?\d)){2}\s*,\s*(?:0|1(?:\.0)?|0?\.\d)\s*\)$/,
            'hsl': /^hsl\(\s*(?:3(?:60|[0-5]\d)|[12]\d{2}|[1-9]?\d)(?:\s*,\s*(?:(?:100|[1-9]?\d)(?:\.\d)?)%){2}\s*\)$/,
            'hsla': /^hsla\(\s*(?:3(?:60|[0-5]\d)|[12]\d{2}|[1-9]?\d)(?:\s*,\s*(?:(?:100(?:\.0)?|[1-9]?\d)(?:\.\d)?)%){2}(?:\s*,\s*(?:0|1(?:\.0)?|0?\.\d))?\s*\)$/
        };

        for (var i = 0; i < type.length; i++) {
            var typeName = type[i];
            matchCollection.push(
                _.has(typeName, regExps) ?
                    regExps[typeName].test(object) : false
            );
        }

        return _.reduce(matchCollection, function (prev, curr) {
            return prev || curr;
        });
    };

    /**
     * 判断对象是否是IP地址
     * @param {string} object
     * @return {boolean}
     */
    _.isIp = function (object) {
        return /^(?:2(?:[0-4]\d|5[0-5])|1\d{2}|[1-9]?\d)(?:\.(?:2(?:[0-4]\d|5[0-5])|1\d{2}|[1-9]?\d)){3}$/.test(object);
    };

    /**
     * 判断对象是否是电子邮箱地址
     * @param {string} object
     * @param {RegExp} [regExp] - 自定义判断邮箱地址格式的正则,默认使用预先定义好的规则
     * @return {boolean}
     */
    _.isEmail = function (object, regExp) {
        var email = _.isRegExp(regExp) ? regExp : emailFormat;

        return email.test(object);
    };

    /**
     * 判断对象是否是手机号码
     * @param {*} object
     * @param {RegExp} [regExp] - 自定义判断手机号码格式的正则,默认使用预先定义好的规则
     * @return {boolean}
     */
    _.isMobile = function (object, regEx) {
        var mobile = _.isRegExp(regEx) ? regEx : mobileFormat;

        return mobile.test(object);
    };

    /**
     * 判断指定对象或数组是否具有指定键或索引
     * @param {number|string} key - 键名或索引
     * @param {Array|Object} obj - 对象或数组
     * @returns {boolean}
     */
    _.has = function (key, obj) {
        if ( ! _.isString(key) && ! _.isNumber(key, true)) { return false; }

        return _.isArray(obj) && ! _.isUndefined(obj[key])
            || _.isObject(obj) && obj.hasOwnProperty(key);
    }

    /***************************************************/
    /*********************字符串方法*********************/
    /***************************************************/

    /**
     * 左截断字符串.
     * @param {string} str - 需要截断的字符串
     * @param {string} [trimStr] - 特征字符串,即要截断字符串,默认截断空白符(空格,制表符等等)
     * @return {string} - 返回截断后的字符串
     */
    _.ltrim = function (str, trimStr) {
        if (! _.isString(str)) return str;

        if (! _.isString(trimStr)) {
            return str.replace(/^\s*/, '');
        } else {
            while (str.indexOf(trimStr) === 0) {
                str = str.substr(trimStr.length, str.length);
            }

            return str;
        }
    };

    /**
     * 右截断字符串.
     * @param {string} str - 需要截断的字符串
     * @param {string} [trimStr] - 特征字符串,即要截断字符串,默认截断空白符(空格,制表符等等)
     * @return {string} - 返回截断后的字符串
     */
    _.rtrim = function (str, trimStr) {
        if (! _.isString(str)) return str;

        if (! _.isString(trimStr)) {
            return str.replace(/\s*$/, '');
        } else {
            while (str.lastIndexOf(trimStr) == (str.length - trimStr.length)) {
                str = str.substr(0, str.length - trimStr.length);
            }

            return str;
        }
    };

    /**
     * 截去首尾字符串.
     * @param {string} str - 需要截断的字符串
     * @param {string} [trimStr] - 特征字符串,即要截断字符串,默认截断空白符(空格,制表符等等)
     * @return {string} - 返回截断后的字符串
     */
    _.trim = function (str, trimStr) {
        if (! _.isString(str)) return str;

        if (! _.isString(trimStr)) {
            return str.replace(/^\s*|\s*$/g, '');
        } else {
            return _.ltrim(_.rtrim(str, trimStr), trimStr);
        }
    };

    /**
     * 解析HTTP URL
     * @param {string} url
     * @param {string} [returns] - 返回指定的URL部分
     *      returns = 'scheme' 返回协议
     *      returns = 'host' 返回域名
     *      returns = 'port' 返回端口号
     *      returns = 'path' 返回路径
     *      returns = 'queryString' 返回查询参数
     *      returns = 'fragment' 返回锚点值
     *      returns = * 返回整体解析对象
     * @return {Object | string}
     */
    _.parseUrl = function (url, returns) {
        var result = {
            'scheme': '',
            'host': '',
            'port': '',
            'path': '',
            'queryString': '',
            'fragment': ''
        };

        var u = url;
        var schemeRegex = /^(https?):\/\//ig;
        var hostPortRegex = /^((?:(?:[a-z0-9](?:(?:[-a-z0-9])*[a-z0-9])?)\.)*(?:[a-z](?:(?:[-a-z0-9])*[a-z0-9])?)|(?:\d+(?:\.\d+){3}))(?::(\d+))?/ig;
        var pathRegex = /^(?:\/(?:((?:[a-z0-9$\-_\.\+!\*'\(\),;:@&=]|(?:%[0-9a-f]{2}))+(?:\/(?:[a-z0-9$\-_\.\+!\*'\(\),;:@&=]|(?:%[0-9a-f]{2}))+)*)(?:\/)?)?)?/ig;
        var queryStringRegex = /^\?((?:[a-z0-9$\-_\.\+!\*'\(\),;:@&=]|(?:%[0-9a-f]{2}))+)/ig;
        var fragmentRegex = /^#((?:[a-z0-9$\-_\.\+!\*'\(\),;:@&=]|(?:%[0-9a-f]{2}))+)/ig;

        var schemeMatch = schemeRegex.exec(u);
        u = u.substr(schemeRegex.lastIndex);

        var hostPortMatch = hostPortRegex.exec(u);
        u = u.substr(hostPortRegex.lastIndex);

        var pathMatch = pathRegex.exec(u);
        // hack! lastIndex在IE低版本下与现代浏览器表现不一致
        // 具体体现为,在未匹配到任何字符的情况下,IE下lastIndex会为1,而且他浏览器为0
        u = u.substr(pathMatch[1] === '' && pathRegex.lastIndex === 1 ? 0 : pathRegex.lastIndex);

        var queryStringMatch = queryStringRegex.exec(u);
        // hack! 与其上一致
        u = u.substr(queryStringMatch[1] === '' && queryStringRegex.lastIndex === 1 ? 0 : queryStringRegex.lastIndex);

        var fragmentMatch = fragmentRegex.exec(u);

        // URL中必须带有host域,否则解析失败
        if (hostPortMatch === null) {
            return _.isString(returns) ? '' : result;
        }

        result.scheme = schemeMatch === null ? 'http' : schemeMatch[1];
        result.host = hostPortMatch[1];
        result.port = _.isUndefined(hostPortMatch[2]) || hostPortMatch[2] === '' ? (result.scheme === 'https' ? '443' : '80') : hostPortMatch[2];
        result.path = pathMatch !== null && ! _.isUndefined(pathMatch[1]) ? pathMatch[1] : '';
        result.queryString = queryStringMatch === null ? '' : queryStringMatch[1];
        result.fragment = fragmentMatch === null ? '' : fragmentMatch[1];

        return _.indexOf(['scheme', 'host', 'port', 'path', 'queryString', 'fragment'], returns) !== -1 ? result[returns] : result;
    };

    /**
     * 将字符串中的特殊字符转义为html实体.
     * @param {string} str
     * @return {string}
     */
    _.htmlSpecialCharsEncode = function (str) {
        if ( ! _.isString(str)) return str;

        return str.replace(/<|>|&|"|'/g, function(match) {
            switch (match) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '&':
                    return '&amp;';
                case '"':
                    return '&quot;';
                case '\'':
                    return '&#39;';
            }
        });
    };


    /**
     * 将字符串中的html实体还原.
     * @param {string} str
     * @return {string}
     */
    _.htmlSpecialCharsDecode = function (str) {
        if ( ! _.isString(str)) return str;

        return str.replace(/&(lt|gt|amp|quot|apos|#\d+|#x[0-9a-f]+);/ig, function(match, capture) {
            var capture = capture.toLowerCase();
            if (capture.indexOf('#x') === 0) {
                // 16进制实体编号
                capture = parseInt(capture.substr(2), 16);
            } else if (capture.indexOf('#') === 0) {
                // 10进制实体编号
                capture = parseInt(capture.substr(1));
            }
            switch (capture) {
                case 'lt':
                case 60:
                    return '<';
                case 'gt':
                case 62:
                    return '>';
                case 'amp':
                case 38:
                    return '&';
                case 'quot':
                case 34:
                    return '"';
                case 'apos':
                case 39:
                    return '\'';
                default:
                    return match;
            }
        });
    };


    /***************************************************/
    /**********************日期方法**********************/
    /***************************************************/

    /**
     * 返回当前时间或指定日期的时间戳.
     * @param {Date} [date] - 要获取秒数的Date的对象. 默认获取当前时间戳
     * @return {number}
     */
    _.timestamp = function (date) {
        var ms = _.isDate(date) ? date.getTime() : (new Date).getTime();

        return Math.floor(ms / 1000);
    };

    /**
     * 比较两个Date对象,返回这两个时间相差时间统计.
     * @param {Date} date1
     * @param {Date} date2
     * @param {string} [type=days] - 接受('days'|'hours'|'minutes'|'seconds'), 默认'days'
     *      参数为'days'时,返回两个时间相差天数,小时数,分钟数,秒数
     *      参数为'hours'时,返回两个时间相差小时数,分钟数,秒数
     *      参数为'minutes'时,返回两个时间相差分钟数,秒数
     *      参数为'seconds'时,返回两个时间相差秒数
     * @return {Object}
     *      返回值: {
             *          'days': 天数,
             *          'hours': 小时数,
             *          'minutes': 分钟数,
             *          'seconds': 秒数
             *      }
     * @description 注意,即便相差时间相同,type给定的类型不同,返回的关联数组的值也有区别:
     * 假定两个日期相差1天5小时10分5秒.
     *		当type为"days"时,返回结果为:
     *			{ 'days': 1, 'hours': 5, 'minutes': 10, 'seconds': 5 }
     *		当type为"hours"时,返回结果为:
     *			{ 'days': 0, 'hours': 29, 'minutes': 10, 'seconds': 5 }
     *		当type为"minutes"时,返回结果为:
     *			{ 'days': 0, 'hours': 0, 'minutes': 1750, 'seconds': 5 }
     *		当type为"seconds"时,返回结果为:
     *			{ 'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 105005 }
     */
    _.dateDiff = function (date1, date2, type) {
        var result = {'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 0};

        if ( ! _.isDate(date1) || ! _.isDate((date2))) {
            return result;
        }

        type = (_.isString(type) && /^(?:hours|minutes|seconds)$/i.test(type) ? type : 'days');
        type = type.toLowerCase();

        /**  @type {number} 两个时间相差的秒数 */
        var secondsDiff = Math.abs(_.timestamp(date1) - _.timestamp(date2));
        result.seconds = secondsDiff % 60;
        switch (type) {
            case 'days':
                result.days = Math.floor(secondsDiff / 86400);
                result.hours = Math.floor( (secondsDiff % 86400) / 3600);
                result.minutes = Math.floor( ((secondsDiff % 86400) % 3600) / 60 );
                break;
            case 'hours':
                result.hours = Math.floor(secondsDiff / 3600);
                result.minutes = Math.floor((secondsDiff % 3600) / 60);
                break;
            case 'minutes':
                result.minutes = Math.floor(secondsDiff / 60);
                break;
            case 'seconds':
                result.seconds = secondsDiff;
        }

        return result;
    };

    /**
     * 获得相对指定日期或当前日期的时间.
     * @param {number} offset - 相对指定日期的偏移
     * @param {string} type - 偏移类型. 天('days'),小时('hours'),分钟('minutes'),秒('seconds')
     * @param {Date} [date] - 做偏移的日期, 默认为当前.
     * @return {Date}
     */
    _.getRelativeDate = function (offset, type, date) {
        date = _.isDate(date) ? (new Date(date.valueOf())) : (new Date());

        // 检查参数类型
        if ( ! _.isInteger(offset) || ! /^(?:days|hours|minutes|seconds)$/i.test(type)) {
            return date;
        }

        type = type.toLowerCase();
        var time = date.getTime();
        switch (type) {
            case "days":
                date.setTime(time + offset * 24 * 60 * 60 * 1000);
                break;
            case "hours":
                date.setTime(time + offset * 60 * 60 * 1000);
                break;
            case "minutes":
                date.setTime(time + offset * 60 * 1000);
                break;
            case "seconds":
                date.setTime(time + offset * 1000);
        }

        return date;
    };

    /**
     * 判断当前或指定的日期,年份是否为闰年.
     * @param {number|Date} [year] 如果为Date对象或整型,判断其指定的年份,否则默认当前年份.
     * @return {boolean}
     */
    _.isLeapYear = function (year) {
        year = _.isDate(year) ?
            year.getFullYear() :
            (_.isInteger(year) ? parseInt(year) : (new Date()).getFullYear());

        return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
    };

    /***************************************************/
    /*********************array方法*********************/
    /***************************************************/

    /**
     * 迭代一个对象/数组,根据所提供的迭代器进行处理,并返回一个新的数组.
     *
     * 此方法不同于ES5或underscope中的map方法
     * 迭代器直接接受两个参数,迭代对象的键和值,不接受迭代对象本身作为参数
     * 是为了防止对对象本身进行操作而出现非预期的结果
     * 因此方法只产生新结果,不修改原对象.
     *
     * @param {Object|Array} obj - 迭代处理的对象
     * @param {function} iteratee - 迭代器函数
     *      迭代器接受两个参数:
     *          {*} value - 每次迭代需要处理的值
     *          {number|string} [key] - 其值的键名
     * @returns {Array} 如果参数不符合类型要求,则返回一个空数组
     */
    _.map = function (obj, iteratee) {
        if ( ! _.isFunction(iteratee) || !_.isObject(obj)) { return []; }

        var ret = [];
        for (var key in obj) {
            if (_.has(key, obj)) {
                ret.push(iteratee(obj[key], key));
            }
        }
        return ret;
    };

    /**
     * 合并对象/数组中的值,对每个值使用迭代器进行处理,最终返回一个值.
     *
     * 此方法不同于ES5或underscope中的reduce方法
     * 迭代器只接受3个参数,不接受迭代对象本身作为参数
     * 是为了防止对对象本身进行操作而出现非预期的结果
     * 因此方法只产生新结果,不修改原对象.
     *
     * @param {Object|Array} obj - 迭代对象/数组
     * @param {function} iteratee - 迭代器函数
     *      接受参数:
     *          {*} prev - 对象/数组上一次迭代产生的值,如果是第一次迭代,其值等于initial;
     *              如果initial未被赋值,则直接从第二次迭代,并将第一次迭代的值赋予prev
     *          {*} curr - 对象/数组当前迭代的值
     *          {number|string} [key] - 当前迭代的键名
     * @param {*} [initial] - 第一次迭代时赋予prev的初值
     * @returns {*} 如果参数不符合类型要求则返回undefined;
     *              如果对象/数组中只包含一个值,则返回这个值,不做任何处理;
     *              其他情况下,将对每个值使用迭代器进行处理.
     */
    _.reduce = function (obj, iteratee, initial) {
        if ( ! _.isFunction(iteratee) || ! _.isObject(obj)) { return; }

        var first = true,
            val = initial;

        for (var key in obj) {
            if (_.has(key, obj)) {
                if (first && _.isUndefined(initial)) {
                    val = obj[key];
                    first = false;
                    continue;
                }
                val = iteratee(val, obj[key], key);
                first = false;
            }
        }

        return val;
    };

    /**
     * 返回查找元素的下标.
     * @param {array} arr - 搜索的数组
     * @param {*} search - 搜索的对象
     * @param {number} [fromIndex=0] 从指定下标开始搜索,负数代表
     * @returns {number} 如果存在搜索的元素,返回其下标,否则返回-1
     */
    _.indexOf = function (arr, search, fromIndex) {
        if ( ! _.isArray(arr) || arr.length === 0) {
            return -1;
        }

        var len = arr.length;
        var n = +fromIndex || 0;
        var idx = Math.max(n >= 0 ? n : len - Math.abs(fromIndex), 0);

        while (idx < len) {
            if (idx in arr && arr[idx] === search) {
                return idx;
            }
            idx++;
        }

        return -1;
    }

    /***************************************************/
    /*********************object方法********************/
    /***************************************************/

    /***************************************************/
    /*********************cookie方法********************/
    /***************************************************/

    /**
     * 获得指定cookie值.
     * @param {string} name - cookie键名
     * @param {*} [defaultValue] - 默认返回值,默认返回空字符串
     * @return {*}
     */
    _.getCookie = function (name, defaultValue) {
        var returnValue = _.isUndefined(defaultValue) ? '': defaultValue;
        if ( ! _.isString(name)) {
            return returnValue;
        }
        var cookies = parseCookie();

        return _.isUndefined(cookies[name]) ? returnValue : cookies[name];
    };

    /**
     * 解析cookie,以数组形式返回.
     * @return {Array}
     */
    function parseCookie () {
        var cookies = [];
        var cookieArr = document.cookie.split(";");
        for(var i = 0; i < cookieArr.length; i++){
            var keyValPair = cookieArr[i].split("=");		//分离键值对
            var key = keyValPair[0];					//获得键名
            var value = _.isUndefined(keyValPair[1]) ? "" : keyValPair[1];	//获得值,如果cookie只是一个空键,那么返回each_cookie_arr[1]可能是一个undefined类型
            cookies[key] = value;
        }
        return cookies;
    }

    /**
     * 设置cookie.
     * @param {string} name
     * @param {string} value
     * @param {Date} [expires]
     * @param {string} [path]
     * @param {string} [domain]
     * @return {undefined}
     */
    _.setCookie = function (name , value , expires , path , domain) {
        if ( ! _.isString(name) || ! _.isString(value)) {
            return;
        }
        var cookie = name + "=" + value;
        var cookieExpires = _.isDate(expires) ? ';expires=' + expires.toGMTString() : '';
        var cookiePath = _.isString(path) ? ';path=' + path : '';
        var cookieDomain = _.isString(domain) ? ';domain=' + domain : '';

        cookie += cookieExpires + cookiePath + cookieDomain;
        document.cookie = cookie;
    };

    /**
     * 删除cookie.
     * @param {string} name - cookie名
     * @returns {undefined}
     */
    _.deleteCookie = function (name) {
        _.setCookie(name , "" , _.getRelativeDate(-1 , "d"));
    };

    /**
     * cookie是否存在.
     * @param {string} name - cookie名
     * @returns {boolean}
     */
    _.cookieExists = function (name) {
        if (_.isString(name)) {
            var cookies = parseCookie();

            return _.isUndefined(cookies[name]);
        }

        return false;
    };


    /***************************************************/
    /**********************转换方法*********************/
    /***************************************************/



    /***************************************************/
    /**********************调试方法*********************/
    /***************************************************/

    /**
     * PHP的var_dump javascript版本.
     * @param {*} object
     * @param {number} [maxHierarchy=3] - 递归进入的最深层次,默认为3
     * @return {Object}
     *      {
     *          'text': '...',  //文本形式的dump内容
     *          'html': '...'   //html形式的dump,用于输出到文档流中
     *      }
     */
    _.varDump = function (object , maxHierarchy) {
        maxHierarchy = _.isInteger(maxHierarchy) ? parseInt(maxHierarchy) : DEFAULT_VAR_DUMP_MAX_HIERARCHY;
        var hierarchy = _.isInteger(arguments[2]) ? parseInt(arguments[2]) : 1;

        var dumpTextArray = [];
        var dumpHtmlArray = [];

        if (hierarchy == 1) dumpHtmlArray.push("<pre>");

        if (! _.isObject(object)) {
            dumpTextArray.push('Variable(' + _.ucFirst(typeof(object)) + ')  =  ' + ('"' + object + '"'));
            dumpHtmlArray.push('Variable(' + _.ucFirst(typeof(object)) + ')  =  ' + '"' + _.htmlSpecialCharsEncode(object) + '"');
        } else {
            dumpTextArray.push('{\n');
            dumpHtmlArray.push('{\n');

            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    // 缩进
                    for (var i = 1; i <= hierarchy; i++) {
                        dumpTextArray.push('　　');
                        dumpHtmlArray.push('\t');
                    }
                    dumpTextArray.push(key + '(' + _.ucFirst(typeof(object[key])) + ')  :  ');
                    dumpHtmlArray.push(_.htmlSpecialCharsEncode(key) + '(' + _.ucFirst(typeof(object[key])) + ')' + '  :  ');
                    var value = object[key];

                    if (_.isFunction(value)) {
                        dumpTextArray.push('Function\n');
                        dumpHtmlArray.push('Function\n');
                    } else if (_.isObject(value)) {
                        var dump;
                        if (hierarchy >= maxHierarchy) {
                            dump = {'text' : '{   ...   }\n' , 'html' : '{   ...   }\n'};
                        } else {
                            dump = _.varDump(value , maxHierarchy , hierarchy + 1);
                        }
                        dumpTextArray.push(dump.text);
                        dumpHtmlArray.push(dump.html);
                    } else {
                        dumpTextArray.push(value + '\n');
                        dumpHtmlArray.push('"' + _.htmlSpecialCharsEncode(value) + '"\n');
                    }
                }
            }
            for (var i = 1; i < hierarchy; i++) {
                dumpTextArray.push("　　");
                dumpHtmlArray.push("\t");
            }
            dumpTextArray.push("}\n");
            dumpHtmlArray.push("}\n");
        }
        if (hierarchy === 1) dumpHtmlArray.push('</pre>');

        return {
            "text" : dumpTextArray.join(''),
            "html" : dumpHtmlArray.join('')
        };
    };
})(this);
