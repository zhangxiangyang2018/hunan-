/*
 * @Author:  
 * @Date: 2018-11-16 14:50:12 
 * @Last Modified by: lidan
 * @Last Modified time: 2018-12-19 14:36:11
 */
/**
 * 
 * @param {domID} id 
 * @param {X轴数据} xdata 
 * @param {y1轴数据} ydata1 
 * @param {y2轴数据} ydata2 
 */

export function indexChart1(id, xdata = [], ydata1 = [], ydata2 = [], ydata3 = [], ydata4 = []) { //默认加载的折线图1
  var yAxisMax = 1;
  var yAxisMin = 1;
  var option = {
    color: ['#ea3b7f', '#259af7', '#ea3b7f', '#259af7'],
    tooltip: {
      trigger: 'item',
      formatter: function (ydata) {
        return ydata.value;
      },
      position: 'top',
    },
    title: {
      text: '各地区当年推送和接收数据量及数量统计图',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'normal',
      },
      padding: [25, 20, 30, 20]
    },
    legend: {
      data: ['推送数据量', '推送数量', '接收数据量', '接收数量'],
      x: '30px',
      y: '60px',
      icon: 'circle',
      textStyle: {
        fontWeight: 550,
        fontSize: 14
      }
    },
    grid: {
      left: '30px',
      right: '30px',
      bottom: '30px',
      top: '100px',
      y2: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        show: false
      },
      axisLabel: {
        interval: 0,
        // rotate: "45",
        alignWithLabel: true,
      },
      data: xdata
    },
    yAxis: [{
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} GB'
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        },
        axisTick: {
          show: false
        }
      },
      {
        type: 'value',
        axisLine: {
          show: false
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 2.5).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 2.5).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        },
        axisLabel: {
          formatter: '{value} 个'
        },
        splitLine: { //网格线
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [{
        itemStyle: {
          normal: {
            barBorderRadius: [50, 50, 50, 50],
          }
        },
        barMaxWidth: '30',
        name: '推送数据量',
        data: ydata3,
        type: 'bar',
        yAxisIndex: 0,

      }, {

        name: '推送数量',
        color: '#c77c9a',
        type: 'line',
        smooth: true,
        data: ydata1,
        yAxisIndex: 1,
      }, {
        itemStyle: {
          normal: {
            barBorderRadius: [50, 50, 50, 50],
          }
        },
        barMaxWidth: '30',
        name: '接收数据量',
        data: ydata4,
        type: 'bar',

        yAxisIndex: 0,

      },
      {

        name: '接收数量',
        smooth: true,
        color: '#618fff',
        type: 'line',
        data: ydata2,
        yAxisIndex: 1
      }
    ]
  };
  id.setOption(option);
}

/**
 * 
 * @param {domID} id 
 * @param {X轴数据} xdata 
 * @param {y1轴数据} ydata1 
 * @param {y2轴数据} ydata2 
 * @param {y3轴数据} ydata3 
 * @param {y4轴数据} ydata4 
 */
export function indexChart3(id, xdata = [], ydata1 = [], ydata2 = [], ydata3 = [], ydata4 = []) { //统计卫星中心接收和推送数据量及数量
  var yAxisMax = 1;
  var yAxisMin = 1;
  var option = {
    color: ['#059af7', '#ea3b7f'],
    title: {
      text: '云端数据推送情况统计',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'normal',
      },
      padding: [25, 20, 30, 20]
    },
    tooltip: {
      trigger: 'item',
      formatter: function (ydata) {
        return ydata.value;
      },
      position: 'top',
    },
    grid: {
      left: '20px',
      right: '30px',
      bottom: '60px',
      top: '110px',
      containLabel: true
    },
    legend: {
      data: [{
        name: '推送数据量',
        icon: 'circle'
      }, {
        name: '推送数量',
        icon: 'circle'
      }],
      x: '30px',
      y: '60px',
      icon: 'circle',
      textStyle: {
        fontWeight: 550,
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        show: false
      },
      axisLabel: {
        interval: 0,
        rotate: "0",
        alignWithLabel: true,
      },
      data: xdata
    },
    yAxis: [{
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} GB'
        },
        axisTick: {
          show: false
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 1.2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 1.2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        }
      },
      {
        type: 'value',
        axisLine: {
          show: false
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 1.8).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 1.8).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        },
        axisLabel: {
          formatter: '{value} 个'
        },
        splitLine: { //网格线
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [{
      itemStyle: {
        normal: {
          barBorderRadius: [50, 50, 50, 50],
        }
      },
      name: '推送数据量',
      color: '#c77c9a',
      data: ydata1,
      barMaxWidth: '30',

      yAxisIndex: 0,
      type: 'bar',
      smooth: true
    }, {
      name: '推送数量',
      color: '#ff0000',
      data: ydata3,
      yAxisIndex: 1,
      type: 'line',
      smooth: true
    }, {
      itemStyle: {
        normal: {
          barBorderRadius: [50, 50, 50, 50],
        }
      },
      name: '接收数据量',
      color: '#618fff',
      data: ydata2,
      barMaxWidth: '30',
      yAxisIndex: 0,
      type: 'bar',
      smooth: true
    }, {
      name: '接收数量',
      color: '#EDD10F',

      data: ydata4,
      yAxisIndex: 1,
      type: 'line',
      smooth: true
    }]
  };
  id.setOption(option);
}
/**
 * 
 * @param {domID} id 
 * @param {X轴数据} xdata 
 * @param {y1轴数据} ydata1 
 * @param {y2轴数据} ydata2 
 * @param {y3轴数据} ydata3 
 * @param {y4轴数据} ydata4 
 * @param {y5轴数据} ydata5 
 * @param {y6轴数据} ydata6 
 */
export function indexChart4(id, xdata = [], legendName = [], seriesData = []) { //统计卫星推送数据量及数量
  var yAxisMax = 1;
  var yAxisMin = 1;
  var option = {
    color: ['#059af7', '#ea3b7f', '#ead73b', '#8ad318', '#ead73b', '#8ad318'],
    title: {
      text: '推送卫星数据情况统计',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'normal',
      },
      padding: [25, 20, 30, 20]
    },
    tooltip: {
      trigger: 'item',
      formatter: function (ydata) {
        return ydata.value;
      },
      position: 'top',
    },
    grid: {
      left: '20px',
      right: '20px',
      bottom: '60px',
      top: '110px',
      containLabel: true
    },
    legend: {
      data: legendName,
      x: '30px',
      y: '60px',
      icon: 'circle',
      textStyle: {
        fontWeight: 550,
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      data: xdata
    },
    yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 1.2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 1.2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        },
        axisLabel: {
          formatter: '{value} GB'
        }
      },
      {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} 个'
        },
        splitLine: { //网格线
          show: false
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        }
      }
    ],
    series: seriesData
  };
  id.setOption(option);
}


/**
 * 
 * @param {domID} id 
 * @param {X轴数据} xdata 
 * @param {y1轴数据} ydata1 
 * @param {y2轴数据} ydata2 
 * @param {y3轴数据} ydata3 
 * @param {y4轴数据} ydata4 
 * @param {y5轴数据} ydata5 
 * @param {y6轴数据} ydata6 
 */
export function indexChart5(id, xdata = [], legendName = [], seriesData = []) { //统计卫星接收数据量及数量
  var yAxisMax = 1;
  var yAxisMin = 1;
  var option = {
    color: ['#059af7', '#ea3b7f', '#ead73b', '#8ad318', '#ead73b', '#8ad318'],
    title: {
      text: '终端接收卫星数据统计图',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'normal',
      },
      padding: [25, 20, 30, 20]
    },
    tooltip: {
      trigger: 'item',
      formatter: function (ydata) {
        return ydata.value;
      },
      position: 'top',
    },
    grid: {
      left: '20px',
      right: '20px',
      bottom: '60px',
      top: '110px',
      containLabel: true
    },
    legend: {
      data: legendName,
      x: '30px',
      y: '60px',
      icon: 'circle',
      textStyle: {
        fontWeight: 550,
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      data: xdata
    },
    yAxis: [{
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} GB'
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        },
        axisTick: {
          show: false
        }
      },
      {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} 个'
        },
        splitLine: { //网格线
          show: false
        },
        axisTick: {
          show: false
        },

        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 2.5).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 2.5).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        }
      }
    ],
    series: seriesData
  };
  id.setOption(option);
}
/**
 * 
 * @param {domID} id 
 * @param {X轴数据} xdata 
 * @param {y1轴数据} ydata1 
 * @param {y2轴数据} ydata2 
 * @param {y3轴数据} ydata3 
 * @param {y4轴数据} ydata4 
 */
export function indexChart6(id, xdata = [], legendName = [], seriesData = []) {
  var yAxisMax = 1;
  var yAxisMin = 1;
  var option = {
    color: ['#059af7', '#ea3b7f', '#ead73b', '#8ad318'],
    title: {
      text: '推送传感器数据情况统计',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'normal',
      },
      padding: [25, 20, 30, 20]
    },
    tooltip: {
      trigger: 'item',
      formatter: function (ydata) {
        return ydata.value;
      },
      position: 'top',
    },
    grid: {
      left: '20px',
      right: '20px',
      bottom: '60px',
      top: '110px',
      containLabel: true
    },
    legend: {
      data: legendName,
      x: '30px',
      y: '60px',
      icon: 'circle',
      textStyle: {
        fontWeight: 550,
        fontSize: 14
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      data: xdata
    },
    yAxis: [{
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} GB'
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 1.2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 1.2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        },
        axisTick: {
          show: false
        }
      },
      {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} 个'
        },
        splitLine: { //网格线
          show: false
        },
        axisTick: {
          show: false
        },
        max: function (value) {
          yAxisMax = value.max;
          return (value.max * 1.2).toFixed(0);
        },
        min: function (value) {
          if (value.min < 0) {
            yAxisMin = value.min;
            return (value.min * 1.2).toFixed(0);
          } else {
            yAxisMin = 0;
            return 0;
          }
        }
      }
    ],
    series: seriesData
  };
  id.setOption(option);
}
