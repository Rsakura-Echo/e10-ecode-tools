

import React from 'react';



export default class RightGraph extends React.Component {


  renderTopOne = () => {
    return `
      <svg width="430" height="383"
        viewBox="0 0 430 383" fill="none">
        <defs>
          <linearGradient id="linear_0" x1="0%" y1="50%" x2="81.78977272727273%" y2="50%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#00E0DB" stop-opacity="1" />
            <stop offset="1" stop-color="#0E5FFF" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_1" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FFFFFF" stop-opacity="0" />
            <stop offset="0.4951923076923077" stop-color="#FFFFFF" stop-opacity="1" />
            <stop offset="0.9855769230769231" stop-color="#FFFFFF" stop-opacity="0" />
          </linearGradient>
          <filter id="filter_24" x="-31" y="-31" width="261.2452830188679" height="199.8600251572327"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="15.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.19607843137254902 0 0 0 0 0.7725490196078432 0 0 0 0 1 0 0 0 0.63 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <filter id="filter_28" x="0" y="0" width="199.2452830188679" height="137.8600251572327" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"></filter>
          <filter id="filter_31" x="0" y="0" width="199.6880503144654" height="17.85237735849057" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="4.981132075471699" result="effect1_foregroundBlur" />
          </filter>
          <filter id="filter_32" x="-22" y="66.00000000000003" width="243.2452830188679" height="94.64150943396228"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="11" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.023529411764705882 0 0 0 0 0.6431372549019608 0 0 0 0 0.8549019607843137 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <linearGradient id="linear_2" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#204F76" stop-opacity="0" />
            <stop offset="1" stop-color="#05B2E6" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_3" x1="75.91145833333144%" y1="7.105427357601002e-13%" x2="76.91145833333144%"
            y2="100.00000000000071%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FEDB65" stop-opacity="1" />
            <stop offset="1" stop-color="#66FFFF" stop-opacity="1" />
          </linearGradient>
          <filter id="filter_62" x="-31" y="-31" width="261.2452830188679" height="199.8600251572327"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="15.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.19607843137254902 0 0 0 0 0.7725490196078432 0 0 0 0 1 0 0 0 0.63 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <filter id="filter_66" x="0" y="0" width="199.2452830188679" height="137.8600251572327" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"></filter>
          <filter id="filter_69" x="0" y="0" width="199.6880503144654" height="17.85237735849057" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="4.981132075471699" result="effect1_foregroundBlur" />
          </filter>
          <filter id="filter_70" x="-22" y="66.00000000000003" width="243.2452830188679" height="94.64150943396228"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="11" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.023529411764705882 0 0 0 0 0.6431372549019608 0 0 0 0 0.8549019607843137 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <linearGradient id="linear_4" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#204F76" stop-opacity="0" />
            <stop offset="1" stop-color="#05B2E6" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_5" x1="75.91145833333144%" y1="7.105427357601002e-13%" x2="76.91145833333144%"
            y2="100.00000000000071%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FEDB65" stop-opacity="1" />
            <stop offset="1" stop-color="#66FFFF" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_6" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FFFFFF" stop-opacity="0" />
            <stop offset="0.4951923076923077" stop-color="#FFFFFF" stop-opacity="1" />
            <stop offset="0.9855769230769231" stop-color="#FFFFFF" stop-opacity="0" />
          </linearGradient>
          <filter id="filter_106" x="-31" y="-31" width="261.2452830188679" height="199.8600251572327"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="15.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.19607843137254902 0 0 0 0 0.7725490196078432 0 0 0 0 1 0 0 0 0.63 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <filter id="filter_110" x="0" y="0" width="199.2452830188679" height="137.8600251572327"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"></filter>
          <filter id="filter_113" x="0" y="0" width="199.6880503144654" height="17.85237735849057"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="4.981132075471699" result="effect1_foregroundBlur" />
          </filter>
          <filter id="filter_114" x="-22" y="66.00000000000003" width="243.2452830188679" height="94.64150943396228"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="11" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.023529411764705882 0 0 0 0 0.6431372549019608 0 0 0 0 0.8549019607843137 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <linearGradient id="linear_7" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#204F76" stop-opacity="0" />
            <stop offset="1" stop-color="#05B2E6" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_8" x1="75.91145833333144%" y1="7.105427357601002e-13%" x2="76.91145833333144%"
            y2="100.00000000000071%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FEDB65" stop-opacity="1" />
            <stop offset="1" stop-color="#66FFFF" stop-opacity="1" />
          </linearGradient>
          <filter id="filter_144" x="-31" y="-31" width="261.2452830188679" height="199.8600251572327"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="15.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.19607843137254902 0 0 0 0 0.7725490196078432 0 0 0 0 1 0 0 0 0.63 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <filter id="filter_148" x="0" y="0" width="199.2452830188679" height="137.8600251572327"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"></filter>
          <filter id="filter_151" x="0" y="0" width="199.6880503144654" height="17.85237735849057"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="4.981132075471699" result="effect1_foregroundBlur" />
          </filter>
          <filter id="filter_152" x="-22" y="66.00000000000003" width="243.2452830188679" height="94.64150943396228"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha" />
            <feOffset dx="0" dy="0" />
            <feGaussianBlur stdDeviation="11" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix"
              values="0 0 0 0 0.023529411764705882 0 0 0 0 0.6431372549019608 0 0 0 0 0.8549019607843137 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect1_Shadow" />
          </filter>
          <linearGradient id="linear_9" x1="50%" y1="0%" x2="51%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#204F76" stop-opacity="0" />
            <stop offset="1" stop-color="#05B2E6" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="linear_10" x1="75.91145833333144%" y1="7.105427357601002e-13%" x2="76.91145833333144%"
            y2="100.00000000000071%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#FEDB65" stop-opacity="1" />
            <stop offset="1" stop-color="#66FFFF" stop-opacity="1" />
          </linearGradient>
        </defs>
        <g opacity="1" transform="translate(0 0)  rotate(0 215 191.35055480125487)">
          <g opacity="1" transform="translate(0 0)  rotate(0 215 10.5)">
            <g opacity="1" transform="translate(35 0)  rotate(0 197.5 10.5)">
              <g opacity="1" transform="translate(0 0)  rotate(0 77.5 10.5)"><text>
                  <tspan x="0" y="16.848" font-size="18" line-height="18" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Bold" letter-spacing="-0.008999994920136839">今年经营概况</tspan>
                </text></g>
              <g opacity="0.8" transform="translate(244 2)  rotate(0 75.5 8)"><text>
                  <tspan x="57.01599999999999" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Regular" letter-spacing="0">截止时间</tspan>
                  <tspan x="101.01599999999999" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Regular" letter-spacing="0"> x.xx.xx.xx</tspan>
                </text></g>
            </g>
            <path id="路径 2" style="stroke:url(#linear_0); stroke-width:20; stroke-opacity:100; stroke-dasharray:3 2"
              transform="translate(0 11)  rotate(0 12.3595125 0.5)" d="M0,0.5L24.72,0.5 " />
          </g>
          <g opacity="1" transform="translate(0 47.05660377358481)  rotate(0 214.65094339622635 81.82225291446245)">
            <g opacity="1" transform="translate(0 0)  rotate(0 214.65094339622635 81.82225291446245)">
              <path id="矩形" fill-rule="evenodd" fill="url(#linear_1)"
                transform="translate(384.4001357741463 142.7028418933474)  rotate(-270 0.857483964605078 20.084179970972425)"
                opacity="1" d="M0,40.17L1.71,40.17L1.71,0L0,0L0,40.17Z " />
              <g opacity="1" transform="translate(0 0)  rotate(0 100 69.5)">
                <g opacity="1" transform="translate(0 0)  rotate(0 100 69.5)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 69.32075471698116)">
                    <g id="形状结合" filter="url(#filter_24)"></g>
                    <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 68.93001257861636)">
                      <g id="椭圆形" filter="url(#filter_31)">
                        <path id="椭圆形" fill-rule="evenodd" style="fill:#09D8EC"
                          transform="translate(12.39748427672956 0)  rotate(0 87.44654088050315 8.926188679245286)"
                          opacity="0.7"
                          d="M174.89,8.93C174.89,4 135.73,0 87.45,0C39.16,0 0,4 0,8.93C0,13.86 39.16,17.85 87.45,17.85C135.73,17.85 174.89,13.86 174.89,8.93Z " />
                      </g>
                    </g>
                    <g id="形状结合" filter="url(#filter_32)">
                      <path id="形状结合" fill-rule="evenodd" style="fill:#0A208B"
                        transform="translate(0 88.00000000000003)  rotate(0 99.62264150943395 25.320754716981135)" opacity="1"
                        d="M0.409139 42.34L0 42.34L0 0L199.25 0L199.25 42.34L198.841 42.34C194.248 46.9902 151.567 50.6374 99.62 50.6374C47.6735 50.6374 5.00086 46.9902 0.409139 42.34Z " />
                    </g>
                    <path id="椭圆形" fill-rule="evenodd" fill="url(#linear_2)"
                      transform="translate(0 78.24805031446542)  rotate(0 99.62264150943395 9.132075471698116)" opacity="1"
                      d="M199.25,9.13C199.25,4.09 154.63,0 99.62,0C44.61,0 0,4.09 0,9.13C0,14.17 44.61,18.26 99.62,18.26C154.63,18.26 199.25,14.17 199.25,9.13Z " />
                  </g>
                  <g opacity="1" transform="translate(25.471698113207367 110.5849056603774)  rotate(0 70 11)"><text>
                      <tspan x="2.5" y="17.4" font-size="15" line-height="0" fill="#EBE6E6" opacity="1"
                        font-family="SourceHanSansCN-Medium" letter-spacing="0">今年标题标题出口值</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(21.58490566037733 45.66037735849068)  rotate(0 70 16)">
                    <g opacity="1" transform="translate(-0.2641509433962028 -2.654480409066035e-14)  rotate(0 70 16)"><text>
                        <tspan x="29.210495283018858" y="24.88698113207547" font-size="26.56603773584906"
                          line-height="31.61358490566037" fill="#66FFFF" opacity="1" font-family="Roboto-Regular"
                          letter-spacing="0">738.78</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(119.3490566037735 11.62264150943383)  rotate(0 8.5 12.5)"><text>
                        <tspan x="0" y="19.260377358490565" font-size="16.60377358490566" line-height="0" fill="#66FFFF"
                          opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="0">亿</tspan>
                      </text></g>
                  </g>
                  <g opacity="1" transform="translate(51.47169811320759 32.37735849056617)  rotate(0 44 5.5)">
                    <g opacity="1" transform="translate(9.438152565568121e-14 0)  rotate(0 22.5 8.5)"><text>
                        <tspan x="0" y="12.942973584905655" font-size="11.1577358490566" line-height="0" fill="#FFFFFF"
                          opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">环比变化</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(47.522012578616284 0)  rotate(0 20 8.5)"><text>
                        <tspan x="0.3791215094339684" y="12.942973584905655" font-size="11.1577358490566" line-height="0"
                          fill="#FEDB65" opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">+43.2%</tspan>
                      </text></g>
                  </g>
                </g>
                <g opacity="1"
                  transform="translate(173.76062839096284 24.717628957810433)  rotate(0 8.465786703376795 26.24150943396228)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#66FFFF"
                    transform="translate(-17.775722730585485 17.775722730585485)  rotate(-90 26.24150943396228 8.465786703376795)"
                    opacity="0.24"
                    d="M3.32,16.93L49.16,16.93C50.99,16.93 52.48,15.44 52.48,13.61L52.48,3.32C52.48,1.49 50.99,0 49.16,0L3.32,0C1.49,0 0,1.49 0,3.32L0,13.61C0,15.44 1.49,16.93 3.32,16.93Z " />
                  <path id="形状结合" fill-rule="evenodd" fill="url(#linear_3)"
                    transform="translate(1.4091829297918173 34.34652198558581)  rotate(0 7.471698113207545 6.905660377358485)"
                    opacity="1"
                    d="M14.94 1.93226L14.94 0.832264C14.94 0.372264 14.57 0.00226426 14.11 0.00226426L0.83 0.00226426C0.37 0.00226426 0 0.372264 0 0.832264L0 1.93226C0 2.39226 0.37 2.76226 0.83 2.76226L14.11 2.76226C14.57 2.76226 14.94 2.39226 14.94 1.93226Z M14.94 5.61528L14.94 4.51528C14.94 4.05528 14.57 3.68528 14.11 3.68528L0.83 3.68528C0.37 3.68528 0 4.05528 0 4.51528L0 5.61528C0 6.07528 0.37 6.44528 0.83 6.44528L14.11 6.44528C14.57 6.44528 14.94 6.07528 14.94 5.61528Z M14.94 9.2983L14.94 8.1983C14.94 7.7383 14.57 7.3683 14.11 7.3683L0.83 7.3683C0.37 7.3683 0 7.7383 0 8.1983L0 9.2983C0 9.7583 0.37 10.1283 0.83 10.1283L14.11 10.1283C14.57 10.1283 14.94 9.7583 14.94 9.2983Z M14.94 12.9813L14.94 11.8813C14.94 11.4213 14.57 11.0513 14.11 11.0513L0.83 11.0513C0.37 11.0513 0 11.4213 0 11.8813L0 12.9813C0 13.4413 0.37 13.8113 0.83 13.8113L14.11 13.8113C14.57 13.8113 14.94 13.4413 14.94 12.9813Z " />
                </g>
              </g>
              <g opacity="1" transform="translate(229.3018867924527 0)  rotate(0 100 69.5)">
                <g opacity="1" transform="translate(0 0)  rotate(0 100 69.5)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 69.32075471698116)">
                    <g id="形状结合" filter="url(#filter_62)"></g>
                    <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 68.93001257861636)">
                      <g id="椭圆形" filter="url(#filter_69)">
                        <path id="椭圆形" fill-rule="evenodd" style="fill:#09D8EC"
                          transform="translate(12.39748427672956 0)  rotate(0 87.44654088050315 8.926188679245286)"
                          opacity="0.7"
                          d="M174.89,8.93C174.89,4 135.73,0 87.45,0C39.16,0 0,4 0,8.93C0,13.86 39.16,17.85 87.45,17.85C135.73,17.85 174.89,13.86 174.89,8.93Z " />
                      </g>
                    </g>
                    <g id="形状结合" filter="url(#filter_70)">
                      <path id="形状结合" fill-rule="evenodd" style="fill:#0A208B"
                        transform="translate(0 88.00000000000003)  rotate(0 99.62264150943395 25.320754716981135)" opacity="1"
                        d="M0.409139 42.34L0 42.34L0 0L199.25 0L199.25 42.34L198.841 42.34C194.248 46.9902 151.567 50.6374 99.62 50.6374C47.6735 50.6374 5.00086 46.9902 0.409139 42.34Z " />
                    </g>
                    <path id="椭圆形" fill-rule="evenodd" fill="url(#linear_4)"
                      transform="translate(0 78.24805031446542)  rotate(0 99.62264150943395 9.132075471698116)" opacity="1"
                      d="M199.25,9.13C199.25,4.09 154.63,0 99.62,0C44.61,0 0,4.09 0,9.13C0,14.17 44.61,18.26 99.62,18.26C154.63,18.26 199.25,14.17 199.25,9.13Z " />
                  </g>
                  <g opacity="1" transform="translate(25.73584905660368 110.5849056603774)  rotate(0 77.5 11)"><text>
                      <tspan x="10" y="17.4" font-size="15" line-height="0" fill="#EBE6E6" opacity="1"
                        font-family="SourceHanSansCN-Medium" letter-spacing="0">今年标题标题进口值</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(21.58490566037733 45.66037735849068)  rotate(0 70 16)">
                    <g opacity="1" transform="translate(-0.2641509433962028 -2.654480409066035e-14)  rotate(0 70 16)"><text>
                        <tspan x="29.210495283018858" y="24.88698113207547" font-size="26.56603773584906"
                          line-height="31.61358490566037" fill="#66FFFF" opacity="1" font-family="Roboto-Regular"
                          letter-spacing="0">891.49</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(119.3490566037736 11.62264150943383)  rotate(0 8.5 12.5)"><text>
                        <tspan x="0" y="19.260377358490565" font-size="16.60377358490566" line-height="0" fill="#66FFFF"
                          opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="0">亿</tspan>
                      </text></g>
                  </g>
                  <g opacity="1" transform="translate(51.47169811320754 32.37735849056617)  rotate(0 44 5.5)">
                    <g opacity="1" transform="translate(9.438152565568121e-14 0)  rotate(0 22.5 8.5)"><text>
                        <tspan x="0" y="12.942973584905655" font-size="11.1577358490566" line-height="0" fill="#FFFFFF"
                          opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">环比变化</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(47.522012578616284 0)  rotate(0 20 8.5)"><text>
                        <tspan x="0.3791215094339684" y="12.942973584905655" font-size="11.1577358490566" line-height="0"
                          fill="#FEDB65" opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">+43.2%</tspan>
                      </text></g>
                  </g>
                </g>
                <g opacity="1"
                  transform="translate(173.76062839096295 24.717628957810433)  rotate(0 8.465786703376795 26.24150943396228)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#66FFFF"
                    transform="translate(-17.775722730585485 17.775722730585485)  rotate(-90 26.24150943396228 8.465786703376795)"
                    opacity="0.24"
                    d="M3.32,16.93L49.16,16.93C50.99,16.93 52.48,15.44 52.48,13.61L52.48,3.32C52.48,1.49 50.99,0 49.16,0L3.32,0C1.49,0 0,1.49 0,3.32L0,13.61C0,15.44 1.49,16.93 3.32,16.93Z " />
                  <path id="形状结合" fill-rule="evenodd" fill="url(#linear_5)"
                    transform="translate(1.4091829297918173 34.34652198558581)  rotate(0 7.471698113207545 6.905660377358485)"
                    opacity="1"
                    d="M14.94 1.93226L14.94 0.832264C14.94 0.372264 14.57 0.00226426 14.11 0.00226426L0.83 0.00226426C0.37 0.00226426 0 0.372264 0 0.832264L0 1.93226C0 2.39226 0.37 2.76226 0.83 2.76226L14.11 2.76226C14.57 2.76226 14.94 2.39226 14.94 1.93226Z M14.94 5.61528L14.94 4.51528C14.94 4.05528 14.57 3.68528 14.11 3.68528L0.83 3.68528C0.37 3.68528 0 4.05528 0 4.51528L0 5.61528C0 6.07528 0.37 6.44528 0.83 6.44528L14.11 6.44528C14.57 6.44528 14.94 6.07528 14.94 5.61528Z M14.94 9.2983L14.94 8.1983C14.94 7.7383 14.57 7.3683 14.11 7.3683L0.83 7.3683C0.37 7.3683 0 7.7383 0 8.1983L0 9.2983C0 9.7583 0.37 10.1283 0.83 10.1283L14.11 10.1283C14.57 10.1283 14.94 9.7583 14.94 9.2983Z M14.94 12.9813L14.94 11.8813C14.94 11.4213 14.57 11.0513 14.11 11.0513L0.83 11.0513C0.37 11.0513 0 11.4213 0 11.8813L0 12.9813C0 13.4413 0.37 13.8113 0.83 13.8113L14.11 13.8113C14.57 13.8113 14.94 13.4413 14.94 12.9813Z " />
                </g>
              </g>
            </g>
          </g>
          <g opacity="1" transform="translate(0 219.0566037735848)  rotate(0 214.65094339622635 81.82225291446245)">
            <g opacity="1" transform="translate(0 0)  rotate(0 214.65094339622635 81.82225291446245)">
              <path id="矩形" fill-rule="evenodd" fill="url(#linear_6)"
                transform="translate(384.4001357741463 142.7028418933474)  rotate(-270 0.857483964605078 20.084179970972425)"
                opacity="1" d="M0,40.17L1.71,40.17L1.71,0L0,0L0,40.17Z " />
              <g opacity="1" transform="translate(0 0)  rotate(0 100 69.5)">
                <g opacity="1" transform="translate(0 0)  rotate(0 100 69.5)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 69.32075471698116)">
                    <g id="形状结合" filter="url(#filter_106)"></g>
                    <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 68.93001257861636)">
                      <g id="椭圆形" filter="url(#filter_113)">
                        <path id="椭圆形" fill-rule="evenodd" style="fill:#09D8EC"
                          transform="translate(12.39748427672956 0)  rotate(0 87.44654088050315 8.926188679245286)"
                          opacity="0.7"
                          d="M174.89,8.93C174.89,4 135.73,0 87.45,0C39.16,0 0,4 0,8.93C0,13.86 39.16,17.85 87.45,17.85C135.73,17.85 174.89,13.86 174.89,8.93Z " />
                      </g>
                    </g>
                    <g id="形状结合" filter="url(#filter_114)">
                      <path id="形状结合" fill-rule="evenodd" style="fill:#0A208B"
                        transform="translate(0 88.00000000000003)  rotate(0 99.62264150943395 25.320754716981135)" opacity="1"
                        d="M0.409139 42.34L0 42.34L0 0L199.25 0L199.25 42.34L198.841 42.34C194.248 46.9902 151.567 50.6374 99.62 50.6374C47.6735 50.6374 5.00086 46.9902 0.409139 42.34Z " />
                    </g>
                    <path id="椭圆形" fill-rule="evenodd" fill="url(#linear_7)"
                      transform="translate(0 78.24805031446542)  rotate(0 99.62264150943395 9.132075471698116)" opacity="1"
                      d="M199.25,9.13C199.25,4.09 154.63,0 99.62,0C44.61,0 0,4.09 0,9.13C0,14.17 44.61,18.26 99.62,18.26C154.63,18.26 199.25,14.17 199.25,9.13Z " />
                  </g>
                  <g opacity="1" transform="translate(25.471698113207367 110.5849056603774)  rotate(0 70 11)"><text>
                      <tspan x="2.5" y="17.4" font-size="15" line-height="0" fill="#EBE6E6" opacity="1"
                        font-family="SourceHanSansCN-Medium" letter-spacing="0">今年单位面积出口值</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(21.58490566037733 45.66037735849068)  rotate(0 70 16)">
                    <g opacity="1" transform="translate(-0.2641509433962028 -2.654480409066035e-14)  rotate(0 70 16)"><text>
                        <tspan x="29.210495283018858" y="24.88698113207547" font-size="26.56603773584906"
                          line-height="31.61358490566037" fill="#66FFFF" opacity="1" font-family="Roboto-Regular"
                          letter-spacing="0">738.78</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(119.3490566037735 11.62264150943383)  rotate(0 8.5 12.5)"><text>
                        <tspan x="0" y="19.260377358490565" font-size="16.60377358490566" line-height="0" fill="#66FFFF"
                          opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="0">亿</tspan>
                      </text></g>
                  </g>
                  <g opacity="1" transform="translate(51.47169811320759 32.37735849056617)  rotate(0 44 5.5)">
                    <g opacity="1" transform="translate(9.438152565568121e-14 0)  rotate(0 22.5 8.5)"><text>
                        <tspan x="0" y="12.942973584905655" font-size="11.1577358490566" line-height="0" fill="#FFFFFF"
                          opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">环比变化</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(47.522012578616284 0)  rotate(0 20 8.5)"><text>
                        <tspan x="0.3791215094339684" y="12.942973584905655" font-size="11.1577358490566" line-height="0"
                          fill="#FEDB65" opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">+43.2%</tspan>
                      </text></g>
                  </g>
                </g>
                <g opacity="1"
                  transform="translate(173.76062839096284 24.717628957810433)  rotate(0 8.465786703376795 26.24150943396228)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#66FFFF"
                    transform="translate(-17.775722730585485 17.775722730585485)  rotate(-90 26.24150943396228 8.465786703376795)"
                    opacity="0.24"
                    d="M3.32,16.93L49.16,16.93C50.99,16.93 52.48,15.44 52.48,13.61L52.48,3.32C52.48,1.49 50.99,0 49.16,0L3.32,0C1.49,0 0,1.49 0,3.32L0,13.61C0,15.44 1.49,16.93 3.32,16.93Z " />
                  <path id="形状结合" fill-rule="evenodd" fill="url(#linear_8)"
                    transform="translate(1.4091829297918173 34.34652198558581)  rotate(0 7.471698113207545 6.905660377358485)"
                    opacity="1"
                    d="M14.94 1.93226L14.94 0.832264C14.94 0.372264 14.57 0.00226426 14.11 0.00226426L0.83 0.00226426C0.37 0.00226426 0 0.372264 0 0.832264L0 1.93226C0 2.39226 0.37 2.76226 0.83 2.76226L14.11 2.76226C14.57 2.76226 14.94 2.39226 14.94 1.93226Z M14.94 5.61528L14.94 4.51528C14.94 4.05528 14.57 3.68528 14.11 3.68528L0.83 3.68528C0.37 3.68528 0 4.05528 0 4.51528L0 5.61528C0 6.07528 0.37 6.44528 0.83 6.44528L14.11 6.44528C14.57 6.44528 14.94 6.07528 14.94 5.61528Z M14.94 9.2983L14.94 8.1983C14.94 7.7383 14.57 7.3683 14.11 7.3683L0.83 7.3683C0.37 7.3683 0 7.7383 0 8.1983L0 9.2983C0 9.7583 0.37 10.1283 0.83 10.1283L14.11 10.1283C14.57 10.1283 14.94 9.7583 14.94 9.2983Z M14.94 12.9813L14.94 11.8813C14.94 11.4213 14.57 11.0513 14.11 11.0513L0.83 11.0513C0.37 11.0513 0 11.4213 0 11.8813L0 12.9813C0 13.4413 0.37 13.8113 0.83 13.8113L14.11 13.8113C14.57 13.8113 14.94 13.4413 14.94 12.9813Z " />
                </g>
              </g>
              <g opacity="1" transform="translate(229.3018867924527 0)  rotate(0 100 69.5)">
                <g opacity="1" transform="translate(0 0)  rotate(0 100 69.5)">
                  <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 69.32075471698116)">
                    <g id="形状结合" filter="url(#filter_144)"></g>
                    <g opacity="1" transform="translate(0 0)  rotate(0 99.62264150943395 68.93001257861636)">
                      <g id="椭圆形" filter="url(#filter_151)">
                        <path id="椭圆形" fill-rule="evenodd" style="fill:#09D8EC"
                          transform="translate(12.39748427672956 0)  rotate(0 87.44654088050315 8.926188679245286)"
                          opacity="0.7"
                          d="M174.89,8.93C174.89,4 135.73,0 87.45,0C39.16,0 0,4 0,8.93C0,13.86 39.16,17.85 87.45,17.85C135.73,17.85 174.89,13.86 174.89,8.93Z " />
                      </g>
                    </g>
                    <g id="形状结合" filter="url(#filter_152)">
                      <path id="形状结合" fill-rule="evenodd" style="fill:#0A208B"
                        transform="translate(0 88.00000000000003)  rotate(0 99.62264150943395 25.320754716981135)" opacity="1"
                        d="M0.409139 42.34L0 42.34L0 0L199.25 0L199.25 42.34L198.841 42.34C194.248 46.9902 151.567 50.6374 99.62 50.6374C47.6735 50.6374 5.00086 46.9902 0.409139 42.34Z " />
                    </g>
                    <path id="椭圆形" fill-rule="evenodd" fill="url(#linear_9)"
                      transform="translate(0 78.24805031446542)  rotate(0 99.62264150943395 9.132075471698116)" opacity="1"
                      d="M199.25,9.13C199.25,4.09 154.63,0 99.62,0C44.61,0 0,4.09 0,9.13C0,14.17 44.61,18.26 99.62,18.26C154.63,18.26 199.25,14.17 199.25,9.13Z " />
                  </g>
                  <g opacity="1" transform="translate(25.73584905660368 110.5849056603774)  rotate(0 77.5 11)"><text>
                      <tspan x="2.5" y="17.4" font-size="15" line-height="0" fill="#EBE6E6" opacity="1"
                        font-family="SourceHanSansCN-Medium" letter-spacing="0">今年货物贸易涉外总额</tspan>
                    </text></g>
                  <g opacity="1" transform="translate(21.58490566037733 45.66037735849068)  rotate(0 70 16)">
                    <g opacity="1" transform="translate(-0.2641509433962028 -2.654480409066035e-14)  rotate(0 70 16)"><text>
                        <tspan x="29.210495283018858" y="24.88698113207547" font-size="26.56603773584906"
                          line-height="31.61358490566037" fill="#66FFFF" opacity="1" font-family="Roboto-Regular"
                          letter-spacing="0">891.49</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(119.3490566037736 11.62264150943383)  rotate(0 8.5 12.5)"><text>
                        <tspan x="0" y="19.260377358490565" font-size="16.60377358490566" line-height="0" fill="#66FFFF"
                          opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="0">亿</tspan>
                      </text></g>
                  </g>
                  <g opacity="1" transform="translate(51.47169811320754 32.37735849056617)  rotate(0 44 5.5)">
                    <g opacity="1" transform="translate(9.438152565568121e-14 0)  rotate(0 22.5 8.5)"><text>
                        <tspan x="0" y="12.942973584905655" font-size="11.1577358490566" line-height="0" fill="#FFFFFF"
                          opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">环比变化</tspan>
                      </text></g>
                    <g opacity="1" transform="translate(47.522012578616284 0)  rotate(0 20 8.5)"><text>
                        <tspan x="0.3791215094339684" y="12.942973584905655" font-size="11.1577358490566" line-height="0"
                          fill="#FEDB65" opacity="1" font-family="SourceHanSansCN-Medium" letter-spacing="0">+43.2%</tspan>
                      </text></g>
                  </g>
                </g>
                <g opacity="1"
                  transform="translate(173.76062839096295 24.717628957810433)  rotate(0 8.465786703376795 26.24150943396228)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#66FFFF"
                    transform="translate(-17.775722730585485 17.775722730585485)  rotate(-90 26.24150943396228 8.465786703376795)"
                    opacity="0.24"
                    d="M3.32,16.93L49.16,16.93C50.99,16.93 52.48,15.44 52.48,13.61L52.48,3.32C52.48,1.49 50.99,0 49.16,0L3.32,0C1.49,0 0,1.49 0,3.32L0,13.61C0,15.44 1.49,16.93 3.32,16.93Z " />
                  <path id="形状结合" fill-rule="evenodd" fill="url(#linear_10)"
                    transform="translate(1.4091829297918173 34.34652198558581)  rotate(0 7.471698113207545 6.905660377358485)"
                    opacity="1"
                    d="M14.94 1.93226L14.94 0.832264C14.94 0.372264 14.57 0.00226426 14.11 0.00226426L0.83 0.00226426C0.37 0.00226426 0 0.372264 0 0.832264L0 1.93226C0 2.39226 0.37 2.76226 0.83 2.76226L14.11 2.76226C14.57 2.76226 14.94 2.39226 14.94 1.93226Z M14.94 5.61528L14.94 4.51528C14.94 4.05528 14.57 3.68528 14.11 3.68528L0.83 3.68528C0.37 3.68528 0 4.05528 0 4.51528L0 5.61528C0 6.07528 0.37 6.44528 0.83 6.44528L14.11 6.44528C14.57 6.44528 14.94 6.07528 14.94 5.61528Z M14.94 9.2983L14.94 8.1983C14.94 7.7383 14.57 7.3683 14.11 7.3683L0.83 7.3683C0.37 7.3683 0 7.7383 0 8.1983L0 9.2983C0 9.7583 0.37 10.1283 0.83 10.1283L14.11 10.1283C14.57 10.1283 14.94 9.7583 14.94 9.2983Z M14.94 12.9813L14.94 11.8813C14.94 11.4213 14.57 11.0513 14.11 11.0513L0.83 11.0513C0.37 11.0513 0 11.4213 0 11.8813L0 12.9813C0 13.4413 0.37 13.8113 0.83 13.8113L14.11 13.8113C14.57 13.8113 14.94 13.4413 14.94 12.9813Z " />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    `
  }

  renderTopTwo = () => {
    return `
      <svg width="430" height="505"
        viewBox="0 0 430 505" fill="none">
        <defs>
          <linearGradient id="linear_0" x1="0%" y1="50%" x2="81.78977272727273%" y2="50%" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#00E0DB" stop-opacity="1" />
            <stop offset="1" stop-color="#0E5FFF" stop-opacity="1" />
          </linearGradient>
        </defs>
        <g opacity="1" transform="translate(0 0)  rotate(0 215 252.5)">
          <g opacity="1" transform="translate(0 60)  rotate(0 215 222.5)">
            <g opacity="1" transform="translate(0 0)  rotate(0 215 118.5)">
              <g opacity="1" transform="translate(0 0)  rotate(0 215 14.5)">
                <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#047CFF" transform="translate(0 0)  rotate(0 215 5)"
                    opacity="0.4"
                    d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                  <path id="路径 8" style="stroke:#20A6FF; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                    transform="translate(4.3 5)  rotate(0 153.18749999999994 0.5)" d="M0,0.5L305.82,0.5 " />
                </g>
                <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 111 6.5)"><text>
                    <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                      opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                    </tspan>
                  </text></g>
                <g opacity="1" transform="translate(317 -3.552713678800501e-15)  rotate(0 56.5 6.5)"><text>
                    <tspan x="40.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                      fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                      123.456亿元</tspan>
                  </text></g>
              </g>
              <g opacity="1" transform="translate(0 52)  rotate(0 215 14.5)">
                <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#00F9EE" transform="translate(0 0)  rotate(0 215 5)"
                    opacity="0.4"
                    d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                  <path id="路径 8" style="stroke:#00E9E3; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                    transform="translate(4.3 5)  rotate(0 129 0.5)" d="M0,0.5L258,0.5 " />
                </g>
                <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 114.5 6.5)"><text>
                    <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                      opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                    </tspan>
                  </text></g>
                <g opacity="1" transform="translate(337 -3.552713678800501e-15)  rotate(0 46.5 6.5)"><text>
                    <tspan x="20.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                      fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                      23.4567亿元</tspan>
                  </text></g>
              </g>
              <g opacity="1" transform="translate(0 104)  rotate(0 215 14.5)">
                <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#047CFF" transform="translate(0 0)  rotate(0 215 5)"
                    opacity="0.4"
                    d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                  <path id="路径 8" style="stroke:#20A6FF; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                    transform="translate(4.3 5)  rotate(0 153.18749999999994 0.5)" d="M0,0.5L305.82,0.5 " />
                </g>
                <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 111 6.5)"><text>
                    <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                      opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                    </tspan>
                  </text></g>
                <g opacity="1" transform="translate(317 -3.552713678800501e-15)  rotate(0 56.5 6.5)"><text>
                    <tspan x="40.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                      fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                      123.456亿元</tspan>
                  </text></g>
              </g>
              <g opacity="1" transform="translate(0 156)  rotate(0 215 14.5)">
                <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#00F9EE" transform="translate(0 0)  rotate(0 215 5)"
                    opacity="0.4"
                    d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                  <path id="路径 8" style="stroke:#00E9E3; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                    transform="translate(4.3 5)  rotate(0 129 0.5)" d="M0,0.5L258,0.5 " />
                </g>
                <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 114.5 6.5)"><text>
                    <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                      opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                    </tspan>
                  </text></g>
                <g opacity="1" transform="translate(337 -3.552713678800501e-15)  rotate(0 46.5 6.5)"><text>
                    <tspan x="20.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                      fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                      23.4567亿元</tspan>
                  </text></g>
              </g>
              <g opacity="1" transform="translate(0 208)  rotate(0 215 14.5)">
                <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                  <path id="矩形" fill-rule="evenodd" style="fill:#047CFF" transform="translate(0 0)  rotate(0 215 5)"
                    opacity="0.4"
                    d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                  <path id="路径 8" style="stroke:#20A6FF; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                    transform="translate(4.3 5)  rotate(0 153.18749999999994 0.5)" d="M0,0.5L305.82,0.5 " />
                </g>
                <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 111 6.5)"><text>
                    <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                      opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                    </tspan>
                  </text></g>
                <g opacity="1" transform="translate(317 -3.552713678800501e-15)  rotate(0 56.5 6.5)"><text>
                    <tspan x="40.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                      fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                      123.456亿元</tspan>
                  </text></g>
              </g>
            </g>
            <g opacity="1" transform="translate(0 260)  rotate(0 215 14.5)">
              <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                <path id="矩形" fill-rule="evenodd" style="fill:#00F9EE" transform="translate(0 0)  rotate(0 215 5)"
                  opacity="0.4"
                  d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                <path id="路径 8" style="stroke:#00E9E3; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                  transform="translate(4.3 5)  rotate(0 129 0.5)" d="M0,0.5L258,0.5 " />
              </g>
              <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 114.5 6.5)"><text>
                  <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                    opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                  </tspan>
                </text></g>
              <g opacity="1" transform="translate(337 -3.552713678800501e-15)  rotate(0 46.5 6.5)"><text>
                  <tspan x="20.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                    fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                    23.4567亿元</tspan>
                </text></g>
            </g>
            <g opacity="1" transform="translate(0 312)  rotate(0 215 14.5)">
              <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                <path id="矩形" fill-rule="evenodd" style="fill:#047CFF" transform="translate(0 0)  rotate(0 215 5)"
                  opacity="0.4"
                  d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                <path id="路径 8" style="stroke:#20A6FF; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                  transform="translate(4.3 5)  rotate(0 153.18749999999994 0.5)" d="M0,0.5L305.82,0.5 " />
              </g>
              <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 111 6.5)"><text>
                  <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                    opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                  </tspan>
                </text></g>
              <g opacity="1" transform="translate(317 -3.552713678800501e-15)  rotate(0 56.5 6.5)"><text>
                  <tspan x="40.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                    fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                    123.456亿元</tspan>
                </text></g>
            </g>
            <g opacity="1" transform="translate(0 364)  rotate(0 215 14.5)">
              <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                <path id="矩形" fill-rule="evenodd" style="fill:#00F9EE" transform="translate(0 0)  rotate(0 215 5)"
                  opacity="0.4"
                  d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                <path id="路径 8" style="stroke:#00E9E3; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                  transform="translate(4.3 5)  rotate(0 129 0.5)" d="M0,0.5L258,0.5 " />
              </g>
              <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 114.5 6.5)"><text>
                  <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                    opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                  </tspan>
                </text></g>
              <g opacity="1" transform="translate(337 -3.552713678800501e-15)  rotate(0 46.5 6.5)"><text>
                  <tspan x="20.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                    fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                    23.4567亿元</tspan>
                </text></g>
            </g>
            <g opacity="1" transform="translate(0 416)  rotate(0 215 14.5)">
              <g opacity="1" transform="translate(0 19)  rotate(0 215 5)">
                <path id="矩形" fill-rule="evenodd" style="fill:#047CFF" transform="translate(0 0)  rotate(0 215 5)"
                  opacity="0.4"
                  d="M5,10L425,10C426.33,10 427.6,9.47 428.54,8.54C429.47,7.6 430,6.33 430,5L430,5C430,3.67 429.47,2.4 428.54,1.46C427.6,0.53 426.33,0 425,0L5,0C3.67,0 2.4,0.53 1.46,1.46C0.53,2.4 0,3.67 0,5L0,5C0,6.33 0.53,7.6 1.46,8.54C2.4,9.47 3.67,10 5,10Z " />
                <path id="路径 8" style="stroke:#20A6FF; stroke-width:7; stroke-opacity:1; stroke-dasharray:3 2"
                  transform="translate(4.3 5)  rotate(0 153.18749999999994 0.5)" d="M0,0.5L305.82,0.5 " />
              </g>
              <g opacity="1" transform="translate(0 -3.552713678800501e-15)  rotate(0 111 6.5)"><text>
                  <tspan x="0" y="11.952557943339226" font-size="13" line-height="12.56911588667845" fill="#FFFFFF"
                    opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">品类名称品类名称品类名称
                  </tspan>
                </text></g>
              <g opacity="1" transform="translate(317 -3.552713678800501e-15)  rotate(0 56.5 6.5)"><text>
                  <tspan x="40.15449996695429" y="11.952557943339226" font-size="13" line-height="12.56911588667845"
                    fill="#FFFFFF" opacity="1" font-family="SourceHanSansCN-Regular" letter-spacing="-0.006499996328253358">
                    123.456亿元</tspan>
                </text></g>
            </g>
          </g>
          <g opacity="1" transform="translate(0 0)  rotate(0 215 10.5)">
            <g opacity="1" transform="translate(35 0)  rotate(0 197.5 10.5)">
              <g opacity="1" transform="translate(0 0)  rotate(0 77.5 10.5)"><text>
                  <tspan x="0" y="16.848" font-size="18" line-height="18" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Bold" letter-spacing="-0.008999994920136839">今年经营收入</tspan>
                </text></g>
              <g opacity="0.8" transform="translate(258 2)  rotate(0 68.5 8)"><text>
                  <tspan x="43.01599999999999" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Regular" letter-spacing="0">截止时间</tspan>
                  <tspan x="87.01599999999999" y="12.76" font-size="11" line-height="0" fill="#FFFFFF" opacity="1"
                    font-family="SourceHanSansCN-Regular" letter-spacing="0"> x.xx.xx.xx</tspan>
                </text></g>
            </g>
            <path id="路径 2" style="stroke:url(#linear_0); stroke-width:20; stroke-opacity:100; stroke-dasharray:3 2"
              transform="translate(0 11)  rotate(0 12.3595125 0.5)" d="M0,0.5L24.72,0.5 " />
          </g>
        </g>
      </svg>
    `
  }


  render() {
    return <div style={{ marginTop: 20 }}>
      <div dangerouslySetInnerHTML={{ __html: this.renderTopOne() }}></div>
      <div style={{ marginTop: 20 }} dangerouslySetInnerHTML={{ __html: this.renderTopTwo() }}></div>
    </div>
  }

}
