import React from 'react';

//获取当前时间戳(以s为单位)
const formatDate = function (_date, format) {
  var date = {
    "M+": _date.getMonth() + 1,
    "d+": _date.getDate(),
    "h+": _date.getHours(),
    "m+": _date.getMinutes(),
    "s+": _date.getSeconds(),
    "q+": Math.floor((_date.getMonth() + 3) / 3),
    "S+": _date.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

//获取当前时间戳(以s为单位)
const getLunarDatas = function () {
  //公历节日
  let sFtv = new Array(
    "0101 元旦",
    "0214 情人节",
    "0308 妇女节",
    "0315 消费者日",
    "0312 植树节",
    "0401 愚人节",
    "0501 劳动节",
    "0504 青年节",
    "0512 护士节",
    "0601 儿童节",
    "0701 建党节",
    "0801 建军节",
    "0910 教师节",
    "1001 国庆节",
    "1224 平安夜",
    "1225 圣诞节")
  //农历节日
  let lFtv = new Array(
    "0101 春节",
    "0202 龙抬头",
    "0115 元宵节",
    "0505 端午节",
    "0624 火把节",
    "0707 七夕",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳",
    "1208 腊八",
    "1223 北方小年",
    "1224 南方小年");
  var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  let lunarYearArr = [
    0x0b557, //1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520 //2100
  ],
    lunarMonth = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
    lunarDay = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'],
    tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const MIN_YEAR = 1891;
  const MAX_YEAR = 2100;
  const lunarInfo = [
    [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168], [5, 1, 26, 43344], [0, 2, 13, 59728],
    [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856], [8, 1, 30, 19304], [0, 2, 19, 19168], [0, 2, 8, 42352],
    [5, 1, 29, 21096], [0, 2, 16, 53856], [0, 2, 4, 55632], [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632],
    [2, 1, 22, 19176], [0, 2, 10, 19168], [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568],
    [0, 2, 14, 46400], [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872], [0, 2, 20, 18800],
    [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968], [4, 1, 24, 44456], [0, 2, 13, 11104],
    [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800], [6, 1, 30, 25776], [0, 2, 17, 54432], [0, 2, 6, 59984],
    [5, 1, 26, 27976], [0, 2, 14, 23248], [0, 2, 4, 11104], [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560],
    [0, 2, 19, 51536], [0, 2, 8, 54432], [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736],
    [0, 2, 13, 9680], [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248], [0, 2, 17, 27808],
    [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416], [3, 1, 24, 21176], [0, 2, 12, 21168],
    [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296], [6, 1, 28, 44368], [0, 2, 15, 43856], [0, 2, 5, 19296],
    [4, 1, 25, 42352], [0, 2, 13, 42352], [0, 2, 2, 21088], [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208],
    [0, 2, 17, 22176], [0, 2, 6, 38608], [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864],
    [0, 2, 11, 53840], [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608], [0, 2, 16, 38320],
    [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656], [0, 2, 20, 27216], [0, 2, 9, 27968],
    [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256], [5, 1, 27, 18808], [0, 2, 15, 18800], [0, 2, 4, 25776],
    [3, 1, 23, 27216], [0, 2, 10, 59984], [8, 1, 31, 27432], [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736],
    [0, 2, 16, 37600], [0, 2, 5, 51552], [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208],
    [0, 2, 9, 22176], [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544], [0, 2, 14, 43344],
    [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928], [0, 2, 19, 19360], [0, 2, 8, 42416],
    [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312], [4, 1, 25, 29864], [0, 2, 12, 27296], [0, 2, 1, 44368],
    [2, 1, 22, 19880], [0, 2, 10, 19296], [6, 1, 29, 42352], [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696],
    [0, 2, 13, 54576], [0, 2, 3, 23200], [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152],
    [0, 2, 8, 42192], [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968], [0, 2, 12, 46496],
    [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168], [0, 2, 17, 42160], [0, 2, 6, 43600],
    [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448], [3, 1, 23, 21936], [0, 2, 11, 37744], [8, 2, 1, 18808],
    [0, 2, 19, 18800], [0, 2, 8, 25776], [6, 1, 28, 27216], [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872],
    [0, 2, 12, 43744], [0, 2, 2, 37600], [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432],
    [0, 2, 5, 55888], [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224], [0, 2, 11, 21200],
    [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416], [0, 2, 15, 44368], [0, 2, 5, 21920],
    [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168], [3, 1, 22, 43320], [0, 2, 9, 26928], [7, 1, 29, 29336],
    [0, 2, 17, 27296], [0, 2, 6, 44368], [5, 1, 26, 19880], [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104],
    [0, 2, 10, 53856], [8, 1, 30, 59696], [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224],
    [0, 2, 5, 19168], [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592], [0, 2, 9, 54560]
  ];
  const Lunar = {
    //是否闰年
    isLeapYear: function (year) {
      return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
    },
    //天干地支年
    lunarYear: function (year) {
      var gan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
        zhi = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
        str = year.toString().split("");
      return gan[str[3]] + zhi[year % 12];
    },
    //生肖年
    zodiacYear: function (year) {
      var zodiac = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
      return zodiac[year % 12];
    },
    //公历月份天数
    //@param year 阳历-年
    //@param month 阳历-月
    solarMonthDays: function (year, month) {
      var FebDays = this.isLeapYear(year) ? 29 : 28;
      var monthHash = ['', 31, FebDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return monthHash[month];
    },
    //农历月份天数
    lunarMonthDays: function (year, month) {
      var monthData = this.lunarMonths(year);
      return monthData[month - 1];
    },
    //农历月份天数数组
    lunarMonths: function (year) {
      var yearData = this.lunarInfo[year - MIN_YEAR];
      var leapMonth = yearData[0];
      var bit = (+yearData[3]).toString(2);
      var months = [];
      for (var i = 0; i < bit.length; i++) {
        months[i] = bit.substr(i, 1);
      }

      for (var k = 0, len = 16 - months.length; k < len; k++) {
        months.unshift('0');
      }

      months = months.slice(0, (leapMonth == 0 ? 12 : 13));
      for (var i = 0; i < months.length; i++) {
        months[i] = +months[i] + 29;
      }
      return months;
    },
    //农历每年的天数
    //@param year 农历年份
    // lunarYearDays : function(year) {
    //     var monthArray = this.lunarYearMonths(year);
    //     var len = monthArray.length;
    //     return (monthArray[len-1] == 0 ? monthArray[len-2] : monthArray[len-1]);
    // },
    //
    lunarYearMonths: function (year) {
      var monthData = this.lunarMonths(year);
      var res = [];
      var temp = 0;
      var yearData = lunarInfo[year - MIN_YEAR];
      var len = (yearData[0] == 0 ? 12 : 13);
      for (var i = 0; i < len; i++) {
        temp = 0;
        for (let j = 0; j <= i; j++) {
          temp += monthData[j];
        }
        res.push(temp);
      }
      return res;
    },
    //获取闰月
    //@param year 农历年份
    leapMonth: function (year) {
      var yearData = lunarInfo[year - MIN_YEAR];
      return yearData[0];
    },
    //计算农历日期与正月初一相隔的天数
    betweenLunarDays: function (year, month, day) {
      var yearMonth = this.lunarMonths(year);
      var res = 0;
      for (var i = 1; i < month; i++) {
        res += yearMonth[i - 1];
      }
      res += day - 1;
      return res;
    },
    //计算2个阳历日期之间的天数
    //@param year 阳历年
    //@param month
    //@param day
    //@param l_month 阴历正月对应的阳历月份
    //@param l_day   阴历初一对应的阳历天
    betweenSolarDays: function (year, month, day, l_month, l_day) {
      var time1 = new Date(year + "-" + month + "-" + day).getTime(),
        time2 = new Date(year + "-" + l_month + "-" + l_day).getTime();
      return Math.ceil((time1 - time2) / 24 / 3600 / 1000);
    },
    //根据距离正月初一的天数计算阴历日期
    //@param year 阳历年
    //@param between 天数
    lunarByBetween: function (year, between) {
      var lunarArray = [], yearMonth = [], t = 0, e = 0, leapMonth = 0, m = '';
      if (between == 0) {
        t = 1;
        e = 1;
        m = '正月';
      } else {
        year = between > 0 ? year : (year - 1);
        yearMonth = this.lunarYearMonths(year);
        leapMonth = this.leapMonth(year);
        between = between > 0 ? between : (this.lunarYearDays(year) + between);
        for (let i = 0; i < 13; i++) {
          if (between == yearMonth[i]) {
            t = i + 2;
            e = 1;
            break;
          } else if (between < yearMonth[i]) {
            t = i + 1;
            e = between - ((yearMonth[i - 1]) ? yearMonth[i - 1] : 0) + 1;
            break;
          }
        }
        m = (leapMonth != 0 && t == leapMonth + 1)
          ? ('闰'.this.chineseMonth(t - 1))
          : this.chineseMonth(((leapMonth != 0 && leapMonth + 1 < t) ? (t - 1) : t));
      }
      lunarArray.push(year, t, e); //年 月 日
      lunarArray.push(this.lunarYear(year),
        this.zodiacYear(year),
        m,
        this.chineseNumber(e)); //天干地支年 生肖年 月份 日
      lunarArray.push(leapMonth); //闰几月
      return lunarArray;
    },
    //中文月份
    chineseMonth: function (month) {
      var monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
      return monthHash[month];
    },
    //中文月份转普通月份
    toLunarMonth: function (month) {
      let monthHash = {
        "正": '01',
        "二": '02',
        "三": '03',
        "四": '04',
        "五": '05',
        "六": '06',
        "七": '07',
        "八": '08',
        "九": '09',
        "十": '10',
        "冬": '11',
        "腊": '12',
      }
      // var monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
      return monthHash[month];
    },
    //中文日期
    chineseNumber: function (num) {
      var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      let res = "";
      if (num <= 10) {
        res = '初' + dateHash[num];
      } else if (num > 10 && num < 20) {
        res = '十' + dateHash[num - 10];
      } else if (num == 20) {
        res = "二十";
      } else if (num > 20 && num < 30) {
        res = "廿" + dateHash[num - 20];
      } else if (num == 30) {
        res = "三十";
      }
      return res;
    },
    //中文日期转普通日期
    toLunarNumber: function (num) {
      // var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      const dateHash = {
        '一': 1,
        '二': 2,
        '三': 3,
        '四': 4,
        '五': 5,
        '六': 6,
        '七': 7,
        '八': 8,
        '九': 9,
        '十': 0
      };

      let res = "";
      if (num == '二十' || num == '三十') {
        if (num == '二十') {
          res = '20'
        } else if (num == '三十') {
          res = '30'
        }
      } else if (num.indexOf("初") != -1) {
        let number = num.slice(num.indexOf("初") + 1);
        res = '0' + dateHash[number];
        if (num == '初十') {
          res = '10';
        }
      } else if (num.indexOf("廿") != -1) {
        let number = num.slice(num.indexOf("廿") + 1);
        res = '2' + dateHash[number];
      } else if (num.indexOf("十") != -1) {
        let number = num.slice(num.indexOf("十") + 1);
        res = '1' + dateHash[number];
      }
      return res;
    },
    //转换农历
    toLunar: function (sy, sm, sd) {
      // 输入的月份减1处理
      sm -= 1;
      // 计算与公历基准的相差天数
      // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
      let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (24 * 60 * 60 * 1000) + 1;
      let lyCopy;
      let ly, lm, ld;
      // 确定输出的农历年份
      for (let j = 0; j < lunarYearArr.length; j++) {
        daySpan -= this.lunarYearDays(lunarYearArr[j]);
        if (daySpan <= 0) {
          ly = 1949 + j;
          // 获取农历年份确定后的剩余天数
          daySpan += this.lunarYearDays(lunarYearArr[j]);
          break
        }
      }
      lyCopy = ly;

      // 确定输出的农历月份
      for (let k = 0; k < this.lunarYearMonths(lunarYearArr[ly - 1949]).length; k++) {
        daySpan -= this.lunarYearMonths(lunarYearArr[ly - 1949])[k];
        if (daySpan <= 0) {
          // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
          if (this.hasLeapMonth(lunarYearArr[ly - 1949]) && this.hasLeapMonth(lunarYearArr[ly - 1949]) <= k) {
            if (this.hasLeapMonth(lunarYearArr[ly - 1949]) < k) {
              lm = k;
            } else if (this.hasLeapMonth(lunarYearArr[ly - 1949]) === k) {
              lm = '闰' + k;
            } else {
              lm = k + 1;
            }
          } else {
            lm = k + 1;
          }
          // 获取农历月份确定后的剩余天数
          daySpan += this.lunarYearMonths(lunarYearArr[ly - 1949])[k];
          break
        }
      }

      // 确定输出农历哪一天
      ld = daySpan;

      // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
      if (this.hasLeapMonth(lunarYearArr[ly - 1949]) && (typeof (lm) === 'string' && lm.indexOf('闰') > -1)) {
        lm = `闰${lunarMonth[/\d/.exec(lm) - 1]}`
      } else {
        lm = lunarMonth[lm - 1];
      }

      // 将计算出来的农历年份转换为天干地支年
      ly = this.getTianGan(ly) + this.getDiZhi(ly);

      // 将计算出来的农历天数转换成汉字
      if (ld < 11) {
        ld = `${lunarDay[10]}${lunarDay[ld - 1]}`
      } else if (ld > 10 && ld < 20) {
        ld = `${lunarDay[9]}${lunarDay[ld - 11]}`
      } else if (ld === 20) {
        ld = `${lunarDay[1]}${lunarDay[9]}`
      } else if (ld > 20 && ld < 30) {
        ld = `${lunarDay[11]}${lunarDay[ld - 21]}`
      } else if (ld === 30) {
        ld = `${lunarDay[2]}${lunarDay[9]}`
      }

      return {
        lyCopy: lyCopy,
        lunarYear: ly,
        lunarMonth: lm,
        lunarDay: ld,
      }
    },
    //转换公历
    //@param year  阴历-年
    //@param month 阴历-月，闰月处理：例如如果当年闰五月，那么第二个五月就传六月，相当于阴历有13个月
    //@param date  阴历-日
    toSolar: function (year, month, day) {
      var yearData = lunarInfo[year - MIN_YEAR];
      var between = this.betweenLunarDays(year, month, day);
      var ms = new Date(year + "-" + yearData[1] + "-" + yearData[2]).getTime();
      var s = ms + between * 24 * 60 * 60 * 1000;
      var d = new Date();
      d.setTime(s);
      year = d.getFullYear();
      month = d.getMonth() + 1;
      day = d.getDate();
      return [year, month, day];
    },
    //ndate:农历日期；
    //gdate:公历日期
    holidayName: function (year, ndate, gdate) {
      for (var ipp = 0; ipp < lFtv.length; ipp++) {    //农历节日
        if (lFtv[ipp].substr(0, 4) == ndate) {
          return lFtv[ipp].substr(5);
        }
        if (12 == (ndate.substr(0, 2))) {    //判断是否为除夕
          const date = this.lunarYearMonths(year)[11];
          if (date == (ndate.substr(2, 2))) return "除夕";
        }
      }
      for (var ipp = 0; ipp < sFtv.length; ipp++) {    //公历节日
        if (sFtv[ipp].substr(0, 4) == gdate) {
          return sFtv[ipp].substr(5);
        }
      }
    },
    getjq: function (yyyy, mm, dd) {
      mm = mm - 1;
      var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
      var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
      var solarTerms = "";
      //此方法是获取该日期是否为某节气
      var tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
      var tmp2 = tmp1.getUTCDate();
      if (tmp2 == dd)
        solarTerms = solarTerm[mm * 2 + 1];
      tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
      tmp2 = tmp1.getUTCDate();
      if (tmp2 == dd)
        solarTerms = solarTerm[mm * 2];

      // //　　此方法可以获取该日期处于某节气
      // while (solarTerms==""){
      //     var tmp1 = new Date((31556925974.7*(yyyy-1900)+sTermInfo[mm*2+1]*60000)+Date.UTC(1900,0,6,2,5));
      //     var tmp2 = tmp1.getUTCDate();
      //     if (tmp2==dd) solarTerms = solarTerm[mm*2+1];
      //     tmp1 = new Date((31556925974.7*(yyyy-1900)+sTermInfo[mm*2]*60000)+Date.UTC(1900,0,6,2,5));
      //     tmp2= tmp1.getUTCDate(); if (tmp2==dd) solarTerms = solarTerm[mm*2];
      //     console.log(dd)
      //     if(dd>1){
      //         dd=dd-1;
      //     }else {
      //         mm=mm-1;
      //         if(mm<0){
      //             yyyy=yyyy-1; mm=11;
      //         }
      //         dd=31;
      //     }
      // }
      return solarTerms;
    },
    // 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
    // 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
    leapMonthDays: function (ly) {
      if (this.hasLeapMonth(ly)) {
        // 获取16进制的第1位（0x除外）
        return (ly & 0xf0000) ? 30 : 29
      } else {
        return 0
      }
    },

    // 计算农历一年的总天数，参数为存储农历年的16进制
    // 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
    lunarYearDays: function (ly) {
      let totalDays = 0;

      // 获取正常月的天数，并累加
      // 获取16进制的第2-4位，需要用到>>移位运算符
      for (let i = 0x8000; i > 0x8; i >>= 1) {
        let monthDays = (ly & i) ? 30 : 29;
        totalDays += monthDays;
      }
      // 如果有闰月，需要把闰月的天数加上
      if (this.hasLeapMonth(ly)) {
        totalDays += this.leapMonthDays(ly);
      }

      return totalDays
    },

    // 获取农历每个月的天数
    // 参数需传入16进制数值
    lunarYearMonths: function (ly) {
      let monthArr = [];

      // 获取正常月的天数，并添加到monthArr数组中
      // 获取16进制的第2-4位，需要用到>>移位运算符
      for (let i = 0x8000; i > 0x8; i >>= 1) {
        monthArr.push((ly & i) ? 30 : 29);
      }
      // 如果有闰月，需要把闰月的天数加上
      if (this.hasLeapMonth(ly)) {
        monthArr.splice(this.hasLeapMonth(ly), 0, this.leapMonthDays(ly));
      }

      return monthArr
    },
    // 将农历年转换为天干，参数为农历年
    getTianGan: function (ly) {
      let tianGanKey = (ly - 3) % 10;
      if (tianGanKey === 0) tianGanKey = 10;
      return tianGan[tianGanKey - 1]
    },
    // 将农历年转换为地支，参数为农历年
    getDiZhi: function (ly) {
      let diZhiKey = (ly - 3) % 12;
      if (diZhiKey === 0) diZhiKey = 12;
      return diZhi[diZhiKey - 1]
    },
    // 计算农历年是否有闰月，参数为存储农历年的16进制
    // 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
    hasLeapMonth: function (ly) {
      // 获取16进制的最后1位，需要用到&与运算符
      if (ly & 0xf) {
        return ly & 0xf
      } else {
        return false
      }
    }
  };
  return Lunar;
}

class AsideCalendar extends React.PureComponent {
  render() {
    const lunarDateTime = getLunarDatas().toLunar(formatDate(new Date(), 'yyyy'), formatDate(new Date(), 'M'), formatDate(new Date(), 'd'));
    const lunarYear = lunarDateTime.lunarYear;
    const lunarMonth = lunarDateTime.lunarMonth;
    const lunarDay = lunarDateTime.lunarDay;
    const zodiac = getLunarDatas().zodiacYear(lunarDateTime.lyCopy);

    return (
      <div className="app-737142488378564608-asidecalendar">
        <div className="app-737142488378564608-asidecalendar-left">
          <div className="app-737142488378564608-asidecalendar-solar">
            <div className="app-737142488378564608-asidecalendar-week">
              <span>{`星期${["日", "一", "二", "三", "四", "五", "六"][new Date().getDay()]}`}</span>
            </div>
            <div className="app-737142488378564608-asidecalendar-date">
              <span>{new Date().getDate()}</span>
              <div className="app-737142488378564608-asidecalendar-date-icon"></div>
            </div>
          </div>
        </div>
        <div className="app-737142488378564608-asidecalendar-line"></div>
        <div className="app-737142488378564608-asidecalendar-right">
          <div className="app-737142488378564608-asidecalendar-lunar">
            <div className="app-737142488378564608-asidecalendar-month-date">
              <span>{lunarMonth + "月" + lunarDay}</span>
            </div>
            <div className="app-737142488378564608-asidecalendar-year">
              <span>{lunarYear + "年【" + zodiac + "年】"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AsideCalendar;