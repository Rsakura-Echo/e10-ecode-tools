import {getLabel} from '@weapp/utils';
export default function UUID(len = 32) {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
    .replace(/[xy]/g, (c, index) => {
      /* eslint-disable no-bitwise */
      let r = (Math.random() * 16) | 0;
      let v = c === 'x' ? r : (r & 0x3) | 0x8;

      while (index === 0 && v < 10) {
        r = (Math.random() * 16) | 0;
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      }

      return v.toString(16);
    })
    .substring(0, len);
}

export const getBottomOperatBtns = () => ([
  {
    id: UUID(6),
    showType: 'ICON',
    btnFrom: 'DEFAULT',
    showContent: {
      path: '#icon-Right-refresh',
      title: getLabel('91791', '刷新'),
      style: {
        fontSize: '36',
        bgColor: 'transparent',
        borderColor: 'transparent',
        color: '#999',
        radius: '3px',
      },
    },
    event: {
      to: 'REFRESHCOM',
      value: getLabel('91792', '刷新组件'),
    },
    isOpen: false,
    showOrder: 1,
  },
  {
    id: UUID(6),
    showType: 'FONTBTN',
    showContent: getLabel('54623', '新建文档'),
    event: {
      to: 'JUMPLINK',
      value: [
        [
          {
            type: 'CLICK',
            name: getLabel('107774', '单击'),
            id: 'f713c2480e4d4859a2687b95708ade28',
            disableDelete: false,
            events: [
              {
                type: 'NewPage',
                id: 'a42fe2bd24aa48118cc0abdee52457e3',
                linkInfo: {
                  page: {
                    pageType: 'SYSTEMPAGE',
                    pageId: 'NewDocument',
                    pageName: getLabel('54623', '新建文档'),
                    openMode: '5',
                    appid: '',
                  },
                  openMode: '5',
                  params: [
                    {
                      name: 'id',
                      nameType: 'approval',
                      type: 'approval',
                      value: {
                        id: 'all',
                      },
                    },
                  ],
                  name: getLabel('54623', '新建文档'),
                },
              },
            ],
            actionDesc: `${getLabel('55626', '系统')}: ${getLabel('54623', '新建文档')}`,
          },
        ],
      ],
    },
    isOpen: true,
    showOrder: 2,
    btnFrom: 'DEFAULT',
  },
  {
    id: UUID(6),
    showType: 'FONTBTN',
    btnFrom: 'DEFAULT',
    showContent: getLabel('53938', '上一页'),
    event: {
      to: 'PREPAGE',
      value: getLabel('91793', '快捷翻页：上一页'),
    },
    isOpen: true,
    showOrder: 3,
  },
  {
    id: UUID(6),
    showType: 'FONTBTN',
    btnFrom: 'DEFAULT',
    showContent: getLabel('53939', '下一页'),
    event: {
      to: 'NEXTPAGE',
      value: getLabel('91794', '快捷翻页：下一页'),
    },
    isOpen: true,
    showOrder: 4,
  },
  {
    id: UUID(6),
    showType: 'FONTBTN',
    showContent: getLabel('54624', '进入文档库'),
    event: {
      to: 'JUMPLINK',
      value: [
        [
          {
            type: 'CLICK',
            name: getLabel('107774', '单击'),
            id: 'c7265df0dde6415a842dab4c997ab12e',
            disableDelete: false,
            events: [
              {
                type: 'NewPage',
                id: 'ad0268c78b6a41799b3bcd221796009e',
                linkInfo: {
                  page: {
                    pageType: 'SYSTEMPAGE',
                    pageId: 'DocumentHome',
                    pageName: getLabel('90758', '文档首页'),
                    openMode: '4',
                    appid: '',
                  },
                  openMode: '4',
                  params: [],
                  name: getLabel('90758', '文档首页'),
                },
              },
            ],
            actionDesc: `${getLabel('55626', '系统')}: ${getLabel('90758', '文档首页')}`,
          },
        ],
      ],
    },
    isOpen: true,
    showOrder: 5,
    btnFrom: 'DEFAULT',
  },
]);


export const getMobileBottomOperatBtns = () => ([
  {
    id: UUID(6),
    showType: 'ICON',
    btnFrom: 'DEFAULT',
    showContent: {
      path: '#icon-Right-refresh',
      title: getLabel('91791', '刷新'),
      style: {
        fontSize: '36',
        bgColor: 'transparent',
        borderColor: 'transparent',
        color: '#999',
        radius: '3px',
      },
    },
    event: {
      to: 'REFRESHCOM',
      value: getLabel('91792', '刷新组件'),
    },
    isOpen: false,
    showOrder: 1,
  },
  {
    id: UUID(6),
    showType: 'FONTBTN',
    btnFrom: 'DEFAULT',
    showContent: getLabel('53938', '上一页'),
    event: {
      to: 'PREPAGE',
      value: getLabel('91793', '快捷翻页：上一页'),
    },
    isOpen: true,
    showOrder: 2,
  },
  {
    id: UUID(6),
    showType: 'FONTBTN',
    btnFrom: 'DEFAULT',
    showContent: getLabel('53939', '下一页'),
    event: {
      to: 'NEXTPAGE',
      value: getLabel('91794', '快捷翻页：下一页'),
    },
    isOpen: true,
    showOrder: 3,
  },
]);