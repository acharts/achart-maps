
var dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;

function dateParse(val) {
  if (val instanceof Date) {
    return val;
  }
  return new Date(val);
}

function DateAdd(strInterval, NumDay, dtDate) {
  var dtTmp = new Date(dtDate);
  if (isNaN(dtTmp)) {
    dtTmp = new Date();
  }
  NumDay = parseInt(NumDay, 10);
  switch (strInterval) {
    case 's':
      dtTmp = new Date(dtTmp.getTime() + (1000 * NumDay));
      break;
    case 'n':
      dtTmp = new Date(dtTmp.getTime() + (60000 * NumDay));
      break;
    case 'h':
      dtTmp = new Date(dtTmp.getTime() + (3600000 * NumDay));
      break;
    case 'd':
      dtTmp = new Date(dtTmp.getTime() + (86400000 * NumDay));
      break;
    case 'w':
      dtTmp = new Date(dtTmp.getTime() + ((86400000 * 7) * NumDay));
      break;
    case 'm':
      dtTmp = new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + NumDay, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
      break;
    case 'y':
      //alert(dtTmp.getFullYear());
      dtTmp = new Date(dtTmp.getFullYear() + NumDay, dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
      //alert(dtTmp);
      break;
  }
  return dtTmp;
}

var dateFormat = function() {
  var token = /w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function(val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) {
        val = '0' + val;
      }
      return val;
    },
    // Some common format strings
    masks = {
      'default': 'ddd mmm dd yyyy HH:MM:ss',
      shortDate: 'm/d/yy',
      //mediumDate:   'mmm d, yyyy',
      longDate: 'mmmm d, yyyy',
      fullDate: 'dddd, mmmm d, yyyy',
      shortTime: 'h:MM TT',
      //mediumTime:   'h:MM:ss TT',
      longTime: 'h:MM:ss TT Z',
      isoDate: 'yyyy-mm-dd',
      isoTime: 'HH:MM:ss',
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUTCDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",

      //added by jayli
      localShortDate: 'yy年mm月dd日',
      localShortDateTime: 'yy年mm月dd日 hh:MM:ss TT',
      localLongDate: 'yyyy年mm月dd日',
      localLongDateTime: 'yyyy年mm月dd日 hh:MM:ss TT',
      localFullDate: 'yyyy年mm月dd日 w',
      localFullDateTime: 'yyyy年mm月dd日 w hh:MM:ss TT'

    },

    // Internationalization strings
    i18n = {
      dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
      ],
      monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ]
    };

  // Regexes and supporting functions are cached through closure
  return function(date, mask, utc) {

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length === 1 && Object.prototype.toString.call(date) === '[object String]' && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date();
    if (isNaN(date)) {
      throw SyntaxError('invalid date');
    }

    mask = String(masks[mask] || mask || masks['default']);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) === 'UTC:') {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? 'getUTC' : 'get',
      d = date[_ + 'Date'](),
      D = date[_ + 'Day'](),
      m = date[_ + 'Month'](),
      y = date[_ + 'FullYear'](),
      H = date[_ + 'Hours'](),
      M = date[_ + 'Minutes'](),
      s = date[_ + 'Seconds'](),
      L = date[_ + 'Milliseconds'](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad(d, undefined),
        ddd: i18n.dayNames[D],
        dddd: i18n.dayNames[D + 7],
        w: i18n.dayNames[D + 14],
        m: m + 1,
        mm: pad(m + 1, undefined),
        mmm: i18n.monthNames[m],
        mmmm: i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12, undefined),
        H: H,
        HH: pad(H, undefined),
        M: M,
        MM: pad(M, undefined),
        s: s,
        ss: pad(s, undefined),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L, undefined),
        t: H < 12 ? 'a' : 'p',
        tt: H < 12 ? 'am' : 'pm',
        T: H < 12 ? 'A' : 'P',
        TT: H < 12 ? 'AM' : 'PM',
        Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
        o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
      };

    return mask.replace(token, function($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

/**
 * 日期的工具方法
 * @class Chart.Date
 * @singleton
 */
var DateUtil = {
  /**
   * 日期加法
   * @param {String} strInterval 加法的类型，s(秒),n(分),h(时),d(天),w(周),m(月),y(年)
   * @param {Number} Num     数量，如果为负数，则为减法
   * @param {Date} dtDate    起始日期，默认为此时
   */
  add: function(strInterval, Num, dtDate) {
    return DateAdd(strInterval, Num, dtDate);
  },
  /**
   * 小时的加法
   * @param {Number} hours 小时
   * @param {Date} date 起始日期
   */
  addHour: function(hours, date) {
    return DateAdd('h', hours, date);
  },
  /**
   * 分的加法
   * @param {Number} minutes 分
   * @param {Date} date 起始日期
   */
  addMinute: function(minutes, date) {
    return DateAdd('n', minutes, date);
  },
  /**
   * 秒的加法
   * @param {Number} seconds 秒
   * @param {Date} date 起始日期
   */
  addSecond: function(seconds, date) {
    return DateAdd('s', seconds, date);
  },
  /**
   * 天的加法
   * @param {Number} days 天数
   * @param {Date} date 起始日期
   */
  addDay: function(days, date) {
    return DateAdd('d', days, date);
  },
  /**
   * 增加周
   * @param {Number} weeks 周数
   * @param {Date} date  起始日期
   */
  addWeek: function(weeks, date) {
    return DateAdd('w', weeks, date);
  },
  /**
   * 增加月
   * @param {Number} months 月数
   * @param {Date} date  起始日期
   */
  addMonths: function(months, date) {
    return DateAdd('m', months, date);
  },
  /**
   * 增加年
   * @param {Number} years 年数
   * @param {Date} date  起始日期
   */
  addYear: function(years, date) {
    return DateAdd('y', years, date);
  },
  /**
   * 日期是否相等，忽略时间
   * @param  {Date}  d1 日期对象
   * @param  {Date}  d2 日期对象
   * @return {Boolean}  是否相等
   */
  isDateEquals: function(d1, d2) {

    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  },
  /**
   * 日期时间是否相等，包含时间
   * @param  {Date}  d1 日期对象
   * @param  {Date}  d2 日期对象
   * @return {Boolean}  是否相等
   */
  isEquals: function(d1, d2) {
    if (d1 == d2) {
      return true;
    }
    if (!d1 || !d2) {
      return false;
    }
    if (!d1.getTime || !d2.getTime) {
      return false;
    }
    return d1.getTime() == d2.getTime();
  },
  /**
   * 字符串是否是有效的日期类型
   * @param {String} str 字符串
   * @return 字符串是否能转换成日期
   */
  isDateString: function(str) {
    return dateRegex.test(str);
  },
  /**
   * 将日期格式化成字符串
   * @param  {Date} date 日期
   * @param  {String} mask 格式化方式
   * @param  {Date} utc  是否utc时间
   * @return {String}    日期的字符串
   */
  format: function(date, mask, utc) {
    return dateFormat(date, mask, utc);
  },
  /**
   * 转换成日期
   * @param  {String|Date} date 字符串或者日期
   * @return {Date}    日期对象
   */
  parse: function(date) {
    if (typeof date === 'string') {
      date = date.replace('\/', '-');
    }
    return dateParse(date);
  },
  /**
   * 当前天
   * @return {Date} 当前天 00:00:00
   */
  today: function() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  },
  /**
   * 返回当前日期
   * @return {Date} 日期的 00:00:00
   */
  getDate: function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
};

module.exports = DateUtil;
