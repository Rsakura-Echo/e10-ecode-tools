
import { regOvProps } from '@weapp/utils';
import React from 'react';

/**
 * 比较两个日期是否是同一天
 */
const checkDateDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() 
    && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

regOvProps('weappUi', 'MCalendar', (props) => {
  if (props.weId === 'ecode-calendar-01') {
    props.renderCellItem = (data) => {
      if (checkDateDay(data.date, new Date())) { // 同一天
        // 修改props 中的阳历显示文字
        const { children } = data;
        const childArr = React.Children.toArray(children);
        try {
          childArr[0].props.children.props.children[1].props.children[1].props.children = '今';
          return childArr;
        } catch (e) {}
        return children;
      }
      return data.children
    }
  }
  return props;
});