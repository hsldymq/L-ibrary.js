QUnit.test('测试isUndefined方法', function(assert) {
    var ud = void 0;
    assert.ok(L.isUndefined(ud), '测试undefined返回值');

    assert.notOk(L.isUndefined({}), '测试非undefined变量');
});

QUnit.test('测试isString方法', function(assert) {
    assert.ok(L.isString('a'), '测试字符串字面量');
    assert.ok(L.isString(new String('abc')), '测试字符串对象');

    assert.notOk(L.isString({}), '测试非字符串');
});

QUnit.test('测试isBoolean方法', function(assert) {
    assert.ok(L.isBoolean(true), '测试布尔字面量');
    assert.ok(L.isBoolean(new Boolean()), '测试布尔对象');
    assert.ok(L.isBoolean(1 == 2), '测试布尔表达式');

    assert.notOk(L.isBoolean({}), '测试非布尔对象');
});

QUnit.test('测试isNumber方法', function(assert) {
    assert.ok(L.isNumber(123), '测试Number字面量');
    assert.ok(L.isNumber(new Number(123.12)), '测试Number对象');
    assert.ok(L.isNumber('+123'), '测试整形格式的字符串');
    assert.ok(L.isNumber('-123.12'), '测试浮点数格式的字符串(-123.12)');
    assert.ok(L.isNumber('.12'), '测试浮点数格式的字符串(.12)');

    assert.notOk(L.isNumber('123', true), '严格模式下测试整型格式的字符串');
    assert.notOk(L.isNumber('123.12', true), '严格模式下测试浮点数格式的字符串');
    assert.notOk(L.isNumber([123.12]), '测试非浮点数格式对象');
});

QUnit.test('测试isFloat方法', function(assert) {
    assert.ok(L.isFloat(123.12), '测试浮点数字面量');
    assert.ok(L.isFloat(new Number(-123.12), true), '严格模式测试Number对象');
    assert.ok(L.isFloat('.12'), '测试浮点数格式字符串');

    assert.notOk(L.isFloat('123.12', true), '严格模式下测试浮点数格式的字符串');
    assert.notOk(L.isFloat([123.12]), '测试非浮点数格式对象');
});

QUnit.test('测试isInteger方法', function(assert) {
    assert.ok(L.isInteger(123), '测试整形字面量');
    assert.ok(L.isInteger(new Number(123), true), '严格模式测试Number对象');
    assert.ok(L.isInteger('123'), '测试整型格式字符串');

    assert.notOk(L.isInteger('123', true), '严格模式测试整形格式字符串');
    assert.notOk(L.isInteger([123]), '测试非浮点数格式对象');
});

QUnit.test('测试isObject方法', function(assert) {
    assert.ok(L.isObject({}), '测试对象');
    assert.ok(L.isObject([]), '测试数组');
    assert.ok(L.isObject(new Number(123)), '测试Number对象');
    assert.ok(L.isObject(new String('123')), '测试String对象');
    assert.ok(L.isObject(new Boolean(true)), '测试Boolean对象');

    assert.notOk(L.isObject(null), 'null不认定为Object对象');
});

QUnit.test('测试isFunction方法', function(assert) {
    assert.ok(L.isFunction(function () {}), '测试匿名函数');
    assert.ok(L.isFunction(new Function()), '测试函数对象');

    assert.notOk(L.isFunction([(function () {})]), '测试非函数');
});

QUnit.test('测试isArray方法', function(assert) {
    assert.ok(L.isArray([]), '测试数组字面量');
    assert.ok(L.isArray(new Array()), '测试数组对象');

    assert.notOk(L.isArray({}), '测试非数组');
});

QUnit.test('测试isDate方法', function(assert) {
    assert.ok(L.isDate(new Date()), '测试Date对象');

    assert.notOk(L.isDate([(new Date())]), '测试非Date对象');
});

QUnit.test('测试isRegExp方法', function(assert) {
    assert.ok(L.isRegExp(/^a$/), '测试正则字面量');
    assert.ok(L.isRegExp(new RegExp()), '测试正则对象');

    assert.notOk(L.isRegExp([/a/]), '测试非正则对象');
});

QUnit.test('测试isColor的hex值判断', function (assert) {
    assert.ok(L.isColor('#1e0EfF', 'hex'), '测试六位hex值');
    assert.ok(L.isColor('#1dF', 'hex'), '测试三位hex值');

    assert.notOk(L.isColor('#99999d9', 'hex'), '测试超过六位hex值');
    assert.notOk(L.isColor('#1g19f', 'hex'), '测试少于六位不等于三位hex值');
    assert.notOk(L.isColor('#G1b', 'hex'), '测试非hex值');
    assert.notOk(L.isColor('rgb(255,255,199)', 'hex'), '测试非hex颜色值');
});

QUnit.test('测试isColor的rgb判断', function (assert) {
    assert.ok(L.isColor('rgb( 199 , 99 , 9 )', 'rgb'), '测试含空格的情况');
    assert.ok(L.isColor('rgb(255,255,199)', 'rgb'), '测试边界值');

    assert.notOk(L.isColor('rgb(266,0,0)', 'rgb'), '测试超出255的情况');
    assert.notOk(L.isColor('rgb (0,266,0)', 'rgb'), 'rgb与空格之间不允许有空格');
    assert.notOk(L.isColor('rgb(01,1,1)', 'rgb'), '颜色值不允许以0开头');
    assert.notOk(L.isColor('rgba(12,0,0,0.1)', 'rgb'), '测试非rgb颜色值');
});

QUnit.test('测试isColor的rgba判断', function (assert) {
    assert.ok(L.isColor('rgba( 255 , 99 , 255 , 0)', 'rgba'), '测试含空格的情况');
    assert.ok(L.isColor('rgba(12,0,0,0.1)', 'rgba'), '测试alpha值为小数');
    assert.ok(L.isColor('rgba(255,199,9,.1)', 'rgba'), '测试alpha值为不带整数部分的小数');

    assert.notOk(L.isColor('rgba(1,1,1)', 'rgba'), '不允许缺少alpha值');
    assert.notOk(L.isColor('rgba(1,1,1,1.1)', 'rgba'), '不允许alpha值大于1');
    assert.notOk(L.isColor('rgba(2555,1,1,0)', 'rgba'), '测试超出颜色值255的情况');
    assert.notOk(L.isColor('rgba (1,1,1,0)', 'rgba'), 'rgba与空格之间不允许有空格');
    assert.notOk(L.isColor('rgb(255,255,199)', 'rgba'), '测试非rgba颜色值');
});

QUnit.test('测试isColor的hsl判断', function (assert) {
    assert.ok(L.isColor('hsl(0 , 0% , 100%)', 'hsl'), '测试含有空格的情况');
    assert.ok(L.isColor('hsl(360,100%,100%)', 'hsl'), '测试边界值');
    assert.ok(L.isColor('hsl(1,100.0%,0.9%)', 'hsl'), '百分比允许出现小数情况');

    assert.notOk(L.isColor('hsl(0,101%,1%)', 'hsl'), '百分比不允许超过100%');
    assert.notOk(L.isColor('hsl(1,100.1%,1)', 'hsl'), '100%的情况下小数点后不能为0意外的任何数');
    assert.notOk(L.isColor('hsl(361,0%,0%)', 'hsl'), 'hue不允许超过360');
    assert.notOk(L.isColor('hsl (360,0%,0%)', 'hsl'), 'hsl与括号之间不允许有空格');
    assert.notOk(L.isColor('hsla(360,100%,100%,1.0)', 'hsl'), '测试非hsl颜色值');
});

QUnit.test('测试isColor的hsla判断', function (assert) {
    assert.ok(L.isColor('hsla( 0 , 0% , 100% , 0.1 )', 'hsla'), '测试空格的情况');
    assert.ok(L.isColor('hsla(360,100%,100%,1.0)', 'hsla'), '测试边界值');
    assert.ok(L.isColor('hsla(360,100.0%,9.4%,0.1)', 'hsla'), '测试百分比出现小数情况');
    assert.ok(L.isColor('hsla(99,100%,5%,.1)', 'hsla'), '测试alpha值为不带整数部分的小数');

    assert.notOk(L.isColor('hsla(1,1%,1%,1.1)', 'hsla'), '不允许alpha值超过1');
    assert.notOk(L.isColor('hsla(361,1%,1%,0)', 'hsla'), 'hue不允许超过360');
    assert.notOk(L.isColor('hsla(1,300%,1%,1)', 'hsla'), '不允许百分比超过100%');
    assert.notOk(L.isColor('hsl(1,100.0%,0.9%)', 'hsla'), '测试非hsla颜色值');
});

QUnit.test('测试isColor整体判断', function (assert) {
    assert.ok(L.isColor('#1dF'), '测试带整体判断的hex值');
    assert.ok(L.isColor('rgb(199,99,9)'), '测试带整体判断的rgb');
    assert.ok(L.isColor('rgba(255,99,255,0)'), '测试带整体判断的rgba');
    assert.ok(L.isColor('hsl(0,0%,100%)'), '测试带整体判断的hsl');
    assert.ok(L.isColor('hsla(0,0%,100%,0.1)'), '测试带整体判断的hsla');
    assert.ok(L.isColor('#1dF', ['hex', 'rgb']), '测试带部分判断的hex值([\'hex\', \'rgb\'])');
    assert.ok(L.isColor('rgb(199,99,9)', ['hex', 'rgb']), '测试带部分判断的rgb值([\'hex\', \'rgb\'])');

    assert.notOk(L.isColor('hsl(0,0%,100%)', ['hex, rgb']), '测试带部分判断的hsl([\'hex\', \'rgb\'])');
});

QUnit.test('测试isIp方法', function(assert) {
    assert.ok(L.isIp('255.9.99.199'), '测试IP 255.9.99.199');
    assert.ok(L.isIp('0.0.0.0'), '测试 0.0.0.0');

    assert.notOk(L.isIp('256.199.20.9'), '超出边界(256.199.20.9)');
    assert.notOk(L.isIp('d.256.20.9'), '非IP字符(d.256.20.9)');
});

QUnit.test('测试has函数', function (assert) {
    var obj = {'a': 1};
    var arr = [1, 2];
    var num = 1;

    assert.ok(L.has('a', obj), '测试对象含有键a');
    assert.ok(L.has(1, arr), '测试数组含有下标1');

    assert.notOk(L.has('b', obj), '测试对象不含有键b');
    assert.notOk(L.has(2, arr), '测试数组含有下标2');
    assert.notOk(L.has(0, num), '测试非对象/数组');
});