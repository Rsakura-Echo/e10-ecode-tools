



import React from 'react';

export default class MiddleGraph extends React.Component {


  renderSvg = () => {

    return `
      <svg width="890" height="341"
        viewBox="0 0 890 341" fill="none">
        <defs>
          <linearGradient id="linear_0" x1="12.192451862722464%" y1="50%" x2="94.02314857269936%" y2="85.46050521743638%"
            gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#09E2F8" stop-opacity="1" />
            <stop offset="1" stop-color="#3D7FFF" stop-opacity="0.35" />
          </linearGradient>
          <linearGradient id="linear_1" x1="87.80754813727754%" y1="50%" x2="5.976851427300645%" y2="85.46050521743638%"
            gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#09E2F8" stop-opacity="1" />
            <stop offset="1" stop-color="#3D7FFF" stop-opacity="0.35" />
          </linearGradient>
          <linearGradient id="linear_2" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1871BE" stop-opacity="1" />
            <stop offset="1" stop-color="#02004D" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="linear_3" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_4" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_5" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_6" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_7" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_8" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_9" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_10" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_11" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_12" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_13" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_14" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_15" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_16" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_17" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_18" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_19" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_20" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_21" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_22" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_23" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_24" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_25" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#1EDDEC" stop-opacity="1" />
            <stop offset="1" stop-color="#077AFD" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_26" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FAC940" stop-opacity="1" />
            <stop offset="1" stop-color="#FA4C66" stop-opacity="1" />
          </linearGradient>
        </defs>
        <g opacity="1" transform="translate(0 0)  rotate(0 445 170.5)">
          <g opacity="1" transform="translate(0 0)  rotate(0 445 157.5)">
            <g opacity="1" transform="translate(0 0)  rotate(0 445 129.5)">
              <g opacity="1" transform="translate(168 0)  rotate(0 277.5 19.5)">
                <g opacity="1" transform="translate(0 0)  rotate(0 277.5 19.394873536126898)">
                  <g opacity="1"
                    transform="translate(69.0060891063834 10.75602337278633)  rotate(0 208.09648746143432 11.05175645844407)">
                    <path id="形状结合" fill-rule="evenodd" fill="url(#linear_0)"
                      transform="translate(0 0)  rotate(0 42.85925065591721 11.05175645844407)" opacity="1"
                      d="M9.61 22.1L24.17 22.1L14.56 0L0 0L9.61 22.1Z M27.9397 22.1L33.7797 22.1L24.1697 0L18.3297 0L27.9397 22.1Z M38.7219 22.1L68.0019 22.1L58.3819 0L29.1119 0L38.7219 22.1Z M70.1723 0L65.2323 0L74.8423 22.1L79.7923 22.1L70.1723 0Z M82.929 22.1L85.719 22.1L76.109 0L73.319 0L82.929 22.1Z " />
                    <path id="形状结合" fill-rule="evenodd" fill="url(#linear_1)"
                      transform="translate(330.4744736110342 0)  rotate(0 42.85925065591721 11.05175645844407)" opacity="1"
                      d="M0 22.1L9.61 0L12.4 0L2.79 22.1L0 22.1Z M5.93021 22.1L15.5402 0L20.4902 0L10.8702 22.1L5.93021 22.1Z M17.7204 22.1L27.3304 0L56.6104 0L46.9904 22.1L17.7204 22.1Z M51.9365 22.1L61.5465 0L67.3865 0L57.7765 22.1L51.9365 22.1Z M61.5495 22.1L71.1595 0L85.7195 0L76.1095 22.1L61.5495 22.1Z " />
                  </g>
                  <path id="矩形" fill-rule="evenodd" style="fill:#5FBAFF"
                    transform="translate(81.4056207426853 37.71152692996657)  rotate(0 195.9665108607034 0.5391100711436135)"
                    opacity="1" d="M0,1.08L391.93,1.08L391.93,0L0,0L0,1.08Z " />
                  <g opacity="1" transform="translate(0 0)  rotate(0 277.5 5.5)">
                    <g opacity="1" transform="translate(0 0.7560233727863306)  rotate(0 277.5 5)">
                      <path id="路径 16"
                        style="stroke:#5FBAFF; stroke-width:0.5391100711436133; stroke-opacity:1; stroke-dasharray:0 0"
                        transform="translate(153.6463702759299 4.074926503358804)  rotate(0 123.37269786863985 2.9625367483207343)"
                        d="M0,5.93L7.55,0L239.19,0L246.75,5.93 " />
                      <path id="路径 16"
                        style="stroke:#5FBAFF; stroke-width:1.078220142287227; stroke-opacity:1; stroke-dasharray:0 0"
                        transform="translate(1.838691575165785e-13 0.840266076497123)  rotate(0 277.03460833497985 2.9625367483207343)"
                        d="M0,5.93L153.75,5.93L161.29,0L392.95,0L400.48,5.93L554.07,5.93 " />
                    </g>
                  </g>
                </g>
                <g opacity="1" transform="translate(299 11)  rotate(0 34.5 13.5)"><text>
                    <tspan x="8.519999999999996" y="20.88" font-size="18" line-height="0" fill="#32C5FF" opacity="1"
                      font-family="SourceHanSansCN-Bold" letter-spacing="0">2021年</tspan>
                  </text></g>
                <g opacity="1" transform="translate(165 9)  rotate(0 85.5 10.5)"><text>
                    <tspan x="0" y="16.848" font-size="18" line-height="18" fill="#FFFFFF" opacity="1"
                      font-family="SourceHanSansCN-Bold" letter-spacing="-0.008999994920136839">进出口额度概况</tspan>
                  </text></g>
                <path id="三角形" fill-rule="evenodd" style="fill:#31C2FB"
                  transform="translate(374.6814994448112 18.04588299609011)  rotate(0 6.738875889295165 4.0433255335770975)"
                  opacity="1" d="M13.48,0L0,0L6.74,8.09L13.48,0Z " />
              </g>
              <rect id="矩形" style="stroke:url(#linear_2); stroke-width:1; stroke-opacity:100; stroke-dasharray:0 0"
                transform="translate(0 0)  rotate(0 445 129.5)" x="0.5" y="0.5" rx="0" width="889" height="258" />
            </g>
            <g opacity="1" transform="translate(20 69)  rotate(0 425 123)">
              <g opacity="1" transform="translate(29 0)  rotate(0 396 123)">
                <g opacity="1" transform="translate(3 0)  rotate(0 393.5 106.5)">
                  <g opacity="1" transform="translate(0 39.91919191919192)  rotate(0 12 86.5)">
                    <path id="路径 14" style="stroke:url(#linear_3); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 -1.171937806380876e-13)  rotate(0 0.5 85.9541315647239)"
                      d="M0.5,0L0.5,171.91 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_4); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 61.85084376701144)  rotate(0 0.500000000000002 55.15033569225185)"
                      d="M0.5,0L0.5,110.06 " />
                  </g>
                  <g opacity="1" transform="translate(415 54.88888888888891)  rotate(0 12.5 79)">
                    <path id="路径 14" style="stroke:url(#linear_5); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 0)  rotate(0 1 78.5909090909091)" d="M1,0L0.5,156.93 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_6); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 91)  rotate(0 1 33.09090909090909)" d="M1,0L0.5,65.94 " />
                  </g>
                  <g opacity="1" transform="translate(69 13.72222222222217)  rotate(0 12 99.5)">
                    <path id="路径 14" style="stroke:url(#linear_7); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 0)  rotate(0 0.5 99.17424242424245)" d="M0.5,0L0.5,198.35 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_8); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23.00000000000001 71.28148674242425)  rotate(0 0.5 63.5334990530303)"
                      d="M0.5,0L0.5,126.79 " />
                  </g>
                  <g opacity="1" transform="translate(485 39.91919191919192)  rotate(0 12 86.5)">
                    <path id="路径 14" style="stroke:url(#linear_9); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 -1.171937806380876e-13)  rotate(0 0.5 85.9541315647239)"
                      d="M0.5,0L0.5,171.91 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_10); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 61.85084376701144)  rotate(0 0.5 55.15033569225185)" d="M0.5,0L0.5,110.06 " />
                  </g>
                  <g opacity="1" transform="translate(138 76.09595959595958)  rotate(0 12 68)">
                    <path id="路径 14" style="stroke:url(#linear_11); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 0)  rotate(0 0.5 67.98737373737374)" d="M0.5,0L0.5,135.97 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_12); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 48.78483306345901)  rotate(0 0.5 43.59495720564422)" d="M0.5,0L0.5,87 " />
                  </g>
                  <g opacity="1" transform="translate(554 39.91919191919192)  rotate(0 12.5 86.5)">
                    <path id="路径 14" style="stroke:url(#linear_13); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 89.18692953632713)  rotate(0 1 41.482292807594014)" d="M1,0L0.5,82.72 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_14); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 0)  rotate(0 1 86.0757575757576)" d="M1,0L0.5,171.91 " />
                  </g>
                  <g opacity="1" transform="translate(207 43.66161616161617)  rotate(0 12 84.5)">
                    <path id="路径 14" style="stroke:url(#linear_15); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 0)  rotate(0 1 84.20454545454545)" d="M1,0L0.5,168.41 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_16); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 46.49330730619074)  rotate(0 0.5 60.9578918014501)" d="M0.5,0L0.5,121.65 " />
                  </g>
                  <g opacity="1" transform="translate(624 3.742424242424249)  rotate(0 12 104.5)">
                    <path id="路径 14" style="stroke:url(#linear_17); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 0)  rotate(0 1 104.1641414141414)" d="M1,0L0.5,208.08 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_18); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 97.42715714357506)  rotate(0 0.5 55.4505628423539)" d="M0.5,0L0.5,110.66 " />
                  </g>
                  <g opacity="1" transform="translate(276 27.44444444444434)  rotate(0 12.5 92.5)">
                    <path id="路径 14" style="stroke:url(#linear_19); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 11.40948813982522)  rotate(0 0.5 86.48600862049)" d="M0.5,0L0.5,172.97 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_20); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 0)  rotate(0 1 92.3131313131313)" d="M1,0L0.5,184.39 " />
                  </g>
                  <g opacity="1" transform="translate(693.0000000000002 74.84848484848476)  rotate(0 12 69)">
                    <path id="路径 14" style="stroke:url(#linear_21); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 0)  rotate(0 1 68.6111111111111)" d="M1,0L0.5,136.98 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_22); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 26.82539682539682)  rotate(0 0.5 55.1984126984127)" d="M0.5,0L0.5,110.15 " />
                  </g>
                  <g opacity="1" transform="translate(346 64.86868686868684)  rotate(0 12.5 74)">
                    <path id="路径 14" style="stroke:url(#linear_23); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 21.76931284677763)  rotate(0 1 62.7163536776213)" d="M1,0L0.5,125.18 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_24); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 0)  rotate(0 1 73.6010101010101)" d="M1,0L0.5,146.95 " />
                  </g>
                  <g opacity="1" transform="translate(762.0000000000002 0)  rotate(0 12.5 106.5)">
                    <path id="路径 14" style="stroke:url(#linear_25); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(0 71.37989652623799)  rotate(0 1 70.3454052722345)" d="M1,0L0.5,140.45 " />
                    <path id="路径 14备份"
                      style="stroke:url(#linear_26); stroke-width:18; stroke-opacity:100; stroke-dasharray:6 3"
                      transform="translate(23 0)  rotate(0 1 106.03535353535355)" d="M1,0L0.5,211.82 " />
                  </g>
                </g>
                <g opacity="1" transform="translate(0 231.7828282828282)  rotate(0 396 7)">
                  <g opacity="1" transform="translate(-0.49999999999999467 0.3611111111110858)  rotate(0 15.5 8)"><text>
                      <tspan x="6.95299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">1月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(138.5 1.608585858585911)  rotate(0 15.5 8)"><text>
                      <tspan x="6.95299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">3月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(68.5 1.608585858585911)  rotate(0 15.5 8)"><text>
                      <tspan x="6.95299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">2月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(208 2.85606060606051)  rotate(0 15 8)"><text>
                      <tspan x="6.45299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">4月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(277 0.3611111111110858)  rotate(0 15 8)"><text>
                      <tspan x="6.45299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">5月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(416 1.608585858585911)  rotate(0 15 8)"><text>
                      <tspan x="6.45299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">7月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(346 1.608585858585911)  rotate(0 15 8)"><text>
                      <tspan x="6.45299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">6月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(485 2.85606060606051)  rotate(0 15 8)"><text>
                      <tspan x="6.45299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">8月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(554 0.3611111111110858)  rotate(0 15 8)"><text>
                      <tspan x="6.45299999691753" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">9月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(693.0000000000002 1.608585858585911)  rotate(0 15 8)"><text>
                      <tspan x="3.403249995376294" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">11月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(623 1.608585858585911)  rotate(0 15 8)"><text>
                      <tspan x="3.403249995376294" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">10月</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(762.0000000000002 2.85606060606051)  rotate(0 15 8)"><text>
                      <tspan x="3.403249995376294" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="0.66"
                        font-family="SourceHanSansCN-Regular" letter-spacing="-0.005499996917529239">12月</tspan>
                    </text></g>
                </g>
              </g>
              <path id="路径 15" style="stroke:#FFFFFF; stroke-width:1; stroke-opacity:1; stroke-dasharray:0 0"
                transform="translate(0 230)  rotate(0 425 0.5)" d="M0,0.5L850,0.5 " />
            </g>
          </g>
          <g opacity="1" transform="translate(368 323)  rotate(0 77 9)">
            <g opacity="1" transform="translate(0 0)  rotate(0 25.5 9)">
              <path id="椭圆形" fill-rule="evenodd" style="fill:#1EDCEC" transform="translate(0 5)  rotate(0 4.5 4.5)"
                opacity="1" d="M9,4.5C9,2.02 6.98,0 4.5,0C2.02,0 0,2.02 0,4.5C0,6.98 2.02,9 4.5,9C6.98,9 9,6.98 9,4.5Z " />
              <g opacity="1" transform="translate(15 0)  rotate(0 18 9)"><text>
                  <tspan x="0" y="14.232" font-size="12" line-height="18" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Medium" letter-spacing="0">进口额</tspan>
                </text></g>
            </g>
            <g opacity="1" transform="translate(103 0)  rotate(0 25.5 9)">
              <path id="椭圆形" fill-rule="evenodd" style="fill:#F99951" transform="translate(0 5)  rotate(0 4.5 4.5)"
                opacity="1" d="M9,4.5C9,2.02 6.98,0 4.5,0C2.02,0 0,2.02 0,4.5C0,6.98 2.02,9 4.5,9C6.98,9 9,6.98 9,4.5Z " />
              <g opacity="1" transform="translate(15 0)  rotate(0 18 9)"><text>
                  <tspan x="0" y="14.232" font-size="12" line-height="18" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Medium" letter-spacing="0">出口额</tspan>
                </text></g>
            </g>
          </g>
        </g>
      </svg>
    `;

  }


  render() {

    return <div style={{ marginTop: 40 }} dangerouslySetInnerHTML={{ __html: this.renderSvg() }}>

    </div>

  }

}
