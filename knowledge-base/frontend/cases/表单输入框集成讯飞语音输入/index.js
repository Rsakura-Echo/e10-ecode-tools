


import { Icon, Dialog } from '@weapp/ui';
import React from 'react';
import hex_md5 from './md5';


window.CryptoJSXf=function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
d)).finalize(c)}}});var t=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();


(function () {
  var h = CryptoJSXf, j = h.lib.WordArray
  h.enc.Base64 = {
    stringify: function (b) {
      var e = b.words, f = b.sigBytes, c = this._map
      b.clamp()
      b = []
      for (var a = 0; a < f; a += 3)for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255,
                                           g = 0; 4 > g && a + 0.75 * g < f; g++)b.push(c.charAt(d >>> 6 * (3 - g) & 63))
      if (e = c.charAt(64))for (; b.length % 4;)b.push(e);
      return b.join('')
    }, parse: function (b) {
      var e = b.length, f = this._map, c = f.charAt(64)
      c && (c = b.indexOf(c), -1 != c && (e = c))
      for (var c = [], a = 0, d = 0; d <
      e; d++)if (d % 4) {
        var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4), h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4)
        c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4)
        a++
      }
      return j.create(c, a)
    }, _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }
})()

window.CryptoJSXfNew = function(g, l) {
    var e = {}, d = e.lib = {}, m = function() {}, k = d.Base = {
            extend: function(a) {
                m.prototype = this;
                var c = new m;
                a && c.mixIn(a);
                c.hasOwnProperty("init") || (c.init = function() {
                    c.$super.init.apply(this, arguments)
                });
                c.init.prototype = c;
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        },
        p = d.WordArray = k.extend({
            init: function(a, c) {
                a = this.words = a || [];
                this.sigBytes = c != l ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || n).stringify(this)
            },
            concat: function(a) {
                var c = this.words,
                    q = a.words,
                    f = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (f % 4)
                    for (var b = 0; b < a; b++) c[f + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((f + b) % 4);
                else if (65535 < q.length)
                    for (b = 0; b < a; b += 4) c[f + b >>> 2] = q[b >>> 2];
                else c.push.apply(c, q);
                this.sigBytes += a;
                return this
            },
            clamp: function() {
                var a = this.words,
                    c = this.sigBytes;
                a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
                a.length = g.ceil(c / 4)
            },
            clone: function() {
                var a = k.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function(a) {
                for (var c = [], b = 0; b < a; b += 4) c.push(4294967296 * g.random() | 0);
                return new p.init(c, a)
            }
        }),
        b = e.enc = {}, n = b.Hex = {
            stringify: function(a) {
                var c = a.words;
                a = a.sigBytes;
                for (var b = [], f = 0; f < a; f++) {
                    var d = c[f >>> 2] >>> 24 - 8 * (f % 4) & 255;
                    b.push((d >>> 4).toString(16));
                    b.push((d & 15).toString(16))
                }
                return b.join("")
            },
            parse: function(a) {
                for (var c = a.length, b = [], f = 0; f < c; f += 2) b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << 24 - 4 * (f % 8);
                return new p.init(b, c / 2)
            }
        }, j = b.Latin1 = {
            stringify: function(a) {
                var c = a.words;
                a = a.sigBytes;
                for (var b = [], f = 0; f < a; f++) b.push(String.fromCharCode(c[f >>> 2] >>> 24 - 8 * (f % 4) & 255));
                return b.join("")
            },
            parse: function(a) {
                for (var c = a.length, b = [], f = 0; f < c; f++) b[f >>> 2] |= (a.charCodeAt(f) & 255) << 24 - 8 * (f % 4);
                return new p.init(b, c)
            }
        }, h = b.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(j.stringify(a)))
                } catch (c) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(a) {
                return j.parse(unescape(encodeURIComponent(a)))
            }
        },
        r = d.BufferedBlockAlgorithm = k.extend({
            reset: function() {
                this._data = new p.init;
                this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = h.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function(a) {
                var c = this._data,
                    b = c.words,
                    f = c.sigBytes,
                    d = this.blockSize,
                    e = f / (4 * d),
                    e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0);
                a = e * d;
                f = g.min(4 * a, f);
                if (a) {
                    for (var k = 0; k < a; k += d) this._doProcessBlock(b, k);
                    k = b.splice(0, a);
                    c.sigBytes -= f
                }
                return new p.init(k, f)
            },
            clone: function() {
                var a = k.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    d.Hasher = r.extend({
        cfg: k.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function() {
            r.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, d) {
                return (new a.init(d)).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, d) {
                return (new s.HMAC.init(a, d)).finalize(b)
            }
        }
    });
    var s = e.algo = {};
    return e
}(Math);
(function() {
var g = CryptoJSXfNew,
    l = g.lib,
    e = l.WordArray,
    d = l.Hasher,
    m = [],
    l = g.algo.SHA1 = d.extend({
        _doReset: function() {
            this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(d, e) {
            for (var b = this._hash.words, n = b[0], j = b[1], h = b[2], g = b[3], l = b[4], a = 0; 80 > a; a++) {
                if (16 > a) m[a] = d[e + a] | 0;
                else {
                    var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16];
                    m[a] = c << 1 | c >>> 31
                }
                c = (n << 5 | n >>> 27) + l + m[a];
                c = 20 > a ? c + ((j & h | ~j & g) + 1518500249) : 40 > a ? c + ((j ^ h ^ g) + 1859775393) : 60 > a ? c + ((j & h | j & g | h & g) - 1894007588) : c + ((j ^ h ^ g) - 899497514);
                l = g;
                g = h;
                h = j << 30 | j >>> 2;
                j = n;
                n = c
            }
            b[0] = b[0] + n | 0;
            b[1] = b[1] + j | 0;
            b[2] = b[2] + h | 0;
            b[3] = b[3] + g | 0;
            b[4] = b[4] + l | 0
        },
        _doFinalize: function() {
            var d = this._data,
                e = d.words,
                b = 8 * this._nDataBytes,
                g = 8 * d.sigBytes;
            e[g >>> 5] |= 128 << 24 - g % 32;
            e[(g + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);
            e[(g + 64 >>> 9 << 4) + 15] = b;
            d.sigBytes = 4 * e.length;
            this._process();
            return this._hash
        },
        clone: function() {
            var e = d.clone.call(this);
            e._hash = this._hash.clone();
            return e
        }
    });
g.SHA1 = d._createHelper(l);
g.HmacSHA1 = d._createHmacHelper(l)
})();
(function() {
var g = CryptoJSXfNew,
    l = g.enc.Utf8;
g.algo.HMAC = g.lib.Base.extend({
    init: function(e, d) {
        e = this._hasher = new e.init;
        "string" == typeof d && (d = l.parse(d));
        var g = e.blockSize,
            k = 4 * g;
        d.sigBytes > k && (d = e.finalize(d));
        d.clamp();
        for (var p = this._oKey = d.clone(), b = this._iKey = d.clone(), n = p.words, j = b.words, h = 0; h < g; h++) n[h] ^= 1549556828, j[h] ^= 909522486;
        p.sigBytes = b.sigBytes = k;
        this.reset()
    },
    reset: function() {
        var e = this._hasher;
        e.reset();
        e.update(this._iKey)
    },
    update: function(e) {
        this._hasher.update(e);
        return this
    },
    finalize: function(e) {
        var d = this._hasher;
        e = d.finalize(e);
        d.reset();
        return d.finalize(this._oKey.clone().concat(e))
    }
})
})();


const getMediaFail = (e) => {
  Dialog.message({ content: '请求麦克风失败', type: 'error' });
  console.error(e);
}

const to16kHz = (buffer) => {
  var data = new Float32Array(buffer)
  var fitCount = Math.round(data.length * (16000 / 44100))
  var newData = new Float32Array(fitCount)
  var springFactor = (data.length - 1) / (fitCount - 1)
  newData[0] = data[0]
  for (let i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor
    var before = Math.floor(tmp).toFixed()
    var after = Math.ceil(tmp).toFixed()
    var atPoint = tmp - before
    newData[i] = data[before] + (data[after] - data[before]) * atPoint
  }
  newData[fitCount - 1] = data[data.length - 1]
  return newData
}

const to16BitPCM = (input) => {
  var dataLength = input.length * (16 / 8)
  var dataBuffer = new ArrayBuffer(dataLength)
  var dataView = new DataView(dataBuffer)
  var offset = 0
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]))
    dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
  }
  return Array.from(new Int8Array(dataView.buffer))
}

class XfInput extends React.Component {

  ws = undefined;
  mediaStream = undefined;
  recorder = undefined;
  context = undefined;
  appId = "";
  apiKey = "";
  config = {
    onClose: () => {
      // this.stop()
      // this.reset()
    },
    onError: (data) => {
      // this.stop()
      // this.reset()
      // alert('WebSocket连接失败')
    },
    onMessage: (message) =>{
      console.info(message);
      // this.setResult(JSON.parse(message))
    },
    onStart: () => {
     
    }
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  getHandShakeParams() {
    var appId = this.appId
    var secretKey = this.apiKey
    var ts = Math.floor(new Date().getTime()/1000);//new Date().getTime()/1000+'';
    var signa = hex_md5(appId + ts)//hex_md5(encodeURIComponent(appId + ts));//EncryptUtil.HmacSHA1Encrypt(EncryptUtil.MD5(appId + ts), secretKey);
    var signatureSha = CryptoJSXfNew.HmacSHA1(signa, secretKey)
    var signature = CryptoJSXf.enc.Base64.stringify(signatureSha)
    signature = encodeURIComponent(signature)
    return "?appid=" + appId + "&ts=" + ts + "&signa=" +signature;
  }

  connectWebsocket = () => {
    var url = 'wss://rtasr.xfyun.cn/v1/ws'
    var urlParam = this.getHandShakeParams()

     url = `${url}${urlParam}`
    if ('WebSocket' in window) {
      this.ws = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      this.ws = new MozWebSocket(url)
    } else {
      alert(notSupportTip)
      return null
    }
    this.ws.onopen = (e) => {
      this.mediaStream.connect(this.recorder)
      this.recorder.connect(this.context.destination)
      setTimeout(() => {
        this.wsOpened(e)
      }, 500)
      this.config.onStart && this.config.onStart(e)
    }
    this.ws.onmessage = (e) => {
      console.error('接收到消息 => ', e);
      // this.config.onMessage && this.config.onMessage(e)
      this.wsOnMessage(e)
    }
    this.ws.onerror = (e) => {
      this.stop()
      console.log("关闭连接ws.onerror");
      this.config.onError && this.config.onError(e)
    }
    this.ws.onclose = (e) => {
      this.stop()
      console.log("关闭连接ws.onclose");
      this.config.onClose && this.config.onClose(e)
    }
  }

   wsOpened () {
    if (this.ws.readyState !== 1) {
      return
    }
    var audioData = buffer.splice(0, 1280)
    this.ws.send(new Int8Array(audioData))
    this.handlerInterval = setInterval(() => {
      // websocket未连接
      if (this.ws.readyState !== 1) {
        clearInterval(this.handlerInterval)
        return
      }
      if (buffer.length === 0) {
        if (this.state === 'end') {
          this.ws.send("{\"end\": true}")
          console.log("发送结束标识");
          clearInterval(this.handlerInterval)
        }
        return false
      }
      var audioData = buffer.splice(0, 1280)
      if(audioData.length > 0){
        this.ws.send(new Int8Array(audioData))
      }
    }, 40)
  }

  handleClick = () => { // 集成讯飞语音输入
    // 唤起麦克风
    this.context = new AudioContext();
    this.recorder = this.context.createScriptProcessor(0, 1, 1);
    const getMediaSuccess = (stream) => {
      console.info('获取到流 => ', stream)
      this.mediaStream = this.context.createMediaStreamSource(stream);
      this.recorder.onaudioprocess = (e) => {
        const buffer = e.inputBuffer.getChannelData(0);


        let bufTo16kHz = to16kHz(buffer)
        let bufTo16BitPCM = to16BitPCM(bufTo16kHz)
        // let bufToBase64 = transform.toBase64(bufTo16BitPCM)
        // self.postMessage({'buffer': bufTo16BitPCM})
        // console.info(buffer, bufTo16BitPCM)

        // 发送消息处理

      }
      this.connectWebsocket()
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then((stream) => {
        getMediaSuccess(stream)
      }).catch((e) => {
        getMediaFail(e)
      })
    } else {
      navigator.getUserMedia({
        audio: true,
        video: false
      }, (stream) => {
        getMediaSuccess(stream)
      }, function (e) {
        getMediaFail(e)
      })
    }

  }

  render() {
    return <div onClick={this.handleClick}>
      <Icon size="lg" name="Icon-Voice-Office-o" />
    </div>
  }

}


export default XfInput;
