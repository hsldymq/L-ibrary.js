QUnit.test('测试map方法', function (assert) {
    var input1 = [1, 2, 3, 4, 5];
    var output1 = [2, 4, 6, 8, 10];
    var input2 = {'key1': 'hello', 'key2': 'world'};
    var output2 = ['hello', 'world1'];
    var input3 = 'hello world';

    assert.deepEqual(L.map(input1, function (value) {
        return value * 2;
    }), output1, '测试数组map');

    assert.deepEqual(L.map(input2, function (value, key) {
        if (key === 'key1') { return value; }

        return value + '1';
    }), output2, '测试对象map为数组');

    assert.deepEqual(L.map(input2), [], '不提供迭代器会返回空数组');

    assert.deepEqual(L.map(input3, function (value) {
        return value * 2;
    }), [], '提供不正确的迭代对象会返回空数组');
});

QUnit.test('测试reduce方法', function (assert) {
    var input1 = [1, 2, 3, 4, 5];
    var output1 = 15;
    var input2 = ['Hello', 'World'];
    var output2 = ' HelloWorld';
    var input3 = {'key1': 2, 'key2': 2};
    var output3 = 2;

    assert.strictEqual(L.reduce(input1, function (prev, curr) {
        return prev + curr;
    }), output1, '测试reduce数组');

    assert.strictEqual(L.reduce(input2, function (prev, curr, key) {
        return prev + curr;
    }, ' '), output2, '测试reduce初始默认值');

    assert.strictEqual(L.reduce(input3, function (prev, curr, key) {
        if (key === 'key1') {
            return prev;
        }
        return prev * curr;
    }, 1), output3, '测试reduce对象');

    assert.strictEqual(L.reduce([1], function (prev, curr) {
        return 100;
    }), 1, '对只有一个值得对象/数组,返回这个值,不做任何处理');

    assert.strictEqual(L.reduce(1, function (prev, curr) {
        return prev + curr;
    }), undefined, 'reduce非对象/数组会返回undefined');

    assert.strictEqual(L.reduce([1, 2]), undefined, '不提供reduce迭代器会返回undefined');
});

QUnit.test('测试indexOf方法', function (assert) {
    assert.strictEqual(L.indexOf([1,6,9], 6), 1, '搜索存在的元素');
    assert.strictEqual(L.indexOf([11,23,99,11,8], 11, 1), 3, '从指定下标开始搜索存在的元素');
    assert.strictEqual(L.indexOf([3,8,11,9,212], 1), -1, '搜索不存在的元素');
});