QUnit.test('测试ltrim方法', function (assert) {
    assert.strictEqual(L.ltrim(' \tabc'), 'abc', '截断为abc');
    assert.strictEqual(L.ltrim('kkabc', 'kk'), 'abc', '设置截断特征字符串为kk, 截断后为abc');

    assert.notStrictEqual(L.ltrim('abc\t'), 'abc', '不应截断右边空白符');
});

QUnit.test('测试rtrim方法', function (assert) {
    assert.strictEqual(L.rtrim('abc \t'), 'abc', '截断为abc');
    assert.strictEqual(L.rtrim('abckk', 'kk'), 'abc', '设置截断特征字符串为kk, 截断后为abc');

    assert.notStrictEqual(L.rtrim('\tabc'), 'abc', '不应截断左边空白符');
});

QUnit.test('测试trim方法', function (assert) {
    var notStringObj = [];

    assert.strictEqual(L.trim('  abc \t'), 'abc', '截断为abc');
    assert.strictEqual(L.trim('kkkabckk', 'k'), 'abc', '设置截断特征字符串为k, 截断后为abc');

    assert.strictEqual(L.trim(notStringObj), notStringObj, '形参为非字符串的情况下,应返回其本身');
});

QUnit.test('测试parseUrl方法', function (assert) {
    var url1 = "http://www.qq.com:333/1.html?a=1#t";
    var url2 = "sina.com.cn/path1/path2/?b=1&c=k";
    var url3 = "https://you-ku.com?c=1&b=#%6C2";

    assert.deepEqual(L.parseUrl(url1), {
        'scheme': 'http',
        'host': 'www.qq.com',
        'port': '333',
        'path': '1.html',
        'queryString': 'a=1',
        'fragment': 't'
    }, '测试URL整体解析正确性1(http://www.qq.com:333/1.html?a=1#t)');

    assert.deepEqual(L.parseUrl(url2), {
        'scheme': 'http',
        'host': 'sina.com.cn',
        'port': '80',
        'path': 'path1/path2',
        'queryString': 'b=1&c=k',
        'fragment': ''
    }, '测试URL整体解析正确性2(sina.com.cn/path1/path2/?b=1&c=k)');

    assert.deepEqual(L.parseUrl(url3), {
        'scheme': 'https',
        'host': 'you-ku.com',
        'port': '443',
        'path': '',
        'queryString': 'c=1&b=',
        'fragment': '%6C2'
    }, '测试URL整体解析正确性3(https://you-ku.com?c=1&b=#%6C2)');

    assert.strictEqual(L.parseUrl(url2, 'scheme'), 'http', '测试URL scheme段返回值(sina.com.cn/path1/path2/?b=1&c=k)');
    assert.strictEqual(L.parseUrl(url3, 'port'), '443', '测试URL port段返回值(https://you-ku.com?c=1&b=#%6C2)');
});

QUnit.test('测试htmlSpecialCharsEncode方法', function (assert) {
    assert.strictEqual(L.htmlSpecialCharsEncode('<>&"\''), '&lt;&gt;&amp;&quot;&#39;', '对五种特殊字符转义');

    assert.strictEqual(L.htmlSpecialCharsDecode('!@#$%^&*()_+-={}][;:?/`~'), '!@#$%^&*()_+-={}][;:?/`~', '其余特殊字符不应该被转义');
});

QUnit.test('测试htmlSpecialCharsDecode方法', function (assert) {
    assert.strictEqual(L.htmlSpecialCharsDecode('&lt;&gt;&amp;&quot;&apos;'), '<>&"\'', '测试实体名转义');
    assert.strictEqual(L.htmlSpecialCharsDecode('&#60;&#62;&#38;&#34;&#39;'), '<>&"\'', '测试10进制编号实体转义');
    assert.strictEqual(L.htmlSpecialCharsDecode('&#x3C;&#x3e;&#x26;&#x22;&#x27;'), '<>&"\'', '测试16进制编号实体转义');

    assert.strictEqual(L.htmlSpecialCharsDecode('&#61;&gt;&3d;'), '&#61;>&3d;', '其余实体不应被转义')
});