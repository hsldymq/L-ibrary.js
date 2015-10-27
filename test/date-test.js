QUnit.test('测试timestamp方法', function (assert) {
    var ms = 99999999;
    var s = 99999;
    assert.strictEqual(L.timestamp(new Date(ms)), s, '测试指定日期返回的时间戳');
});

QUnit.test('测试isLeapYear方法', function (assert) {
    var d1 = new Date(2004, 2, 2);
    var d2 = new Date(1999, 2, 2);

    assert.ok(L.isLeapYear(d1), '2004年(Date对象)是闰年');
    assert.ok(L.isLeapYear(2008), '2008年(整形)是闰年');

    assert.notOk(L.isLeapYear(d2), '1999年不是闰年');
});

QUnit.test('测试dateDiff方法', function (assert) {
    var date1 = new Date(2015, 0, 1);
    var date2 = new Date(2016, 0, 1, 10, 10, 10);

    assert.deepEqual(L.dateDiff(date1, date2), {
        'days': 365,
        'hours': 10,
        'minutes': 10,
        'seconds': 10
    }, '测试2015-01-01 00:00:00至2016-01-01 10:10:10的天分时秒');

    assert.deepEqual(L.dateDiff(date1, date2, 'hours'), {
        'days': 0,
        'hours': 8770,
        'minutes': 10,
        'seconds': 10
    }, '测试2015-01-01 00:00:00至2016-01-01 10:10:10的分时秒');

    assert.deepEqual(L.dateDiff(date1, date2, 'minutes'), {
        'days': 0,
        'hours': 0,
        'minutes': 526210,
        'seconds': 10
    }, '测试2015-01-01 00:00:00至2016-01-01 10:10:10的时秒');

    assert.deepEqual(L.dateDiff(date1, date2, 'seconds'), {
        'days': 0,
        'hours': 0,
        'minutes': 0,
        'seconds': 31572610
    }, '测试2015-01-01 00:00:00至2016-01-01 10:10:10的秒数');
});

QUnit.test('测试getRelativeDate方法', function (assert) {
    var date = new Date(2015, 0, 1, 5, 5, 5);

    var rDaysDate = L.getRelativeDate(31, 'days', date);
    var dDateObj = {
        'year': rDaysDate.getFullYear(),
        'month': rDaysDate.getMonth(),
        'day': rDaysDate.getDate(),
        'hour': rDaysDate.getHours(),
        'minute': rDaysDate.getMinutes(),
        'second': rDaysDate.getSeconds()
    };
    var rHoursDate = L.getRelativeDate(24, 'hours', date);
    var hDateObj = {
        'year': rHoursDate.getFullYear(),
        'month': rHoursDate.getMonth(),
        'day': rHoursDate.getDate(),
        'hour': rHoursDate.getHours(),
        'minute': rHoursDate.getMinutes(),
        'second': rHoursDate.getSeconds()
    };
    var rMinutesDate = L.getRelativeDate(3, 'minutes', date);
    var mDateObj = {
        'year': rMinutesDate.getFullYear(),
        'month': rMinutesDate.getMonth(),
        'day': rMinutesDate.getDate(),
        'hour': rMinutesDate.getHours(),
        'minute': rMinutesDate.getMinutes(),
        'second': rMinutesDate.getSeconds()
    };
    var rSecondsDate = L.getRelativeDate(3, 'seconds', date);
    var sDateObj = {
        'year': rSecondsDate.getFullYear(),
        'month': rSecondsDate.getMonth(),
        'day': rSecondsDate.getDate(),
        'hour': rSecondsDate.getHours(),
        'minute': rSecondsDate.getMinutes(),
        'second': rSecondsDate.getSeconds()
    };

    assert.deepEqual(dDateObj, {
        'year': 2015,
        'month': 1,
        'day': 1,
        'hour': 5,
        'minute': 5,
        'second': 5
    }, '测试相对天数计算');
    assert.deepEqual(hDateObj, {
        'year': 2015,
        'month': 0,
        'day': 2,
        'hour': 5,
        'minute': 5,
        'second': 5
    }, '测试相对小时数计算');
    assert.deepEqual(mDateObj, {
        'year': 2015,
        'month': 0,
        'day': 1,
        'hour': 5,
        'minute': 8,
        'second': 5
    }, '测试相对分钟数计算');
    assert.deepEqual(sDateObj, {
        'year': 2015,
        'month': 0,
        'day': 1,
        'hour': 5,
        'minute': 5,
        'second': 8
    }, '测试相对秒数计算');
});