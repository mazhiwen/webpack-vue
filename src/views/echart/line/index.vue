<template>
  <div>
    <div id="testprint">
      <div id="main" />


      <div
        v-for="(item,index) in [1,1,1,1,1,1,1,1,1]"
        :key="index"
        style="height:30px"
      >
        {{ index }}
      </div>
    </div>
    <button @click="print">
      aaaa
    </button>
  </div>
</template>

<script>

import html2canvas from 'html2canvas';
import printJS from 'print-js';

export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
      show: true,
    };
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('main'));
    myChart.hideLoading();


    let base = +new Date(2016, 9, 3);
    const oneDay = 24 * 3600 * 1000;
    let valueBase = Math.random() * 300;
    let valueBase2 = Math.random() * 50;
    const data = [];
    const data2 = [];

    for (let i = 1; i < 10; i++) {
      const now = new Date(base += oneDay);
      const dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');

      valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
      valueBase <= 0 && (valueBase = Math.random() * 300);
      data.push([dayStr, valueBase]);

      valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
      valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
      data2.push([dayStr, valueBase2]);
    }


    const option = {
      animation: false,
      title: {
        left: 'center',
        text: '触屏 tooltip 和 dataZoom 示例',
        subtext: '"tootip" and "dataZoom" on mobile device',
      },
      legend: {
        top: 'bottom',
        data: ['意向'],
      },
      tooltip: {
        triggerOn: 'none',
        position: function (pt) {
          return [pt[0], 130];
        },
      },
      xAxis: {
        type: 'time',
        // boundaryGap: [0, 0],
        axisPointer: {
          value: '2016-10-7',
          snap: true,
          lineStyle: {
            color: '#004E52',
            opacity: 0.5,
            width: 2,
          },
          label: {
            show: true,
            formatter: function (params) {
              return echarts.format.formatTime('yyyy-MM-dd', params.value);
            },
            backgroundColor: '#004E52',
          },
          handle: {
            show: true,
            color: '#004E52',
          },
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisTick: {
          inside: true,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          inside: true,
          formatter: '{value}\n',
        },
        z: 10,
      },
      grid: {
        top: 110,
        left: 15,
        right: 15,
        height: 160,
      },
      dataZoom: [{
        type: 'inside',
        throttle: 50,
      }],
      series: [
        {
          name: '模拟数据',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#8ec6ad',
            },
          },
          stack: 'a',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8ec6ad',
              }, {
                offset: 1,
                color: '#ffe',
              }]),
            },
          },
          data: data,
        },
        {
          name: '模拟数据',
          type: 'line',
          smooth: true,
          stack: 'a',
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#d68262',
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#d68262',
              }, {
                offset: 1,
                color: '#ffe',
              }]),
            },
          },
          data: data2,
        },

      ],
    };

    myChart.setOption(option);
  },
  methods: {
    print() {
      // const element = document.getElementById('testprint');
      // console.log(element.scrollHeight);
      // html2canvas(element, {
      //   // windowWidth: element.scrollWidth,
      //   windowHeight: element.scrollHeight,
      //   windowWidth: 1700,
      //   // windowHeight: 800,
      // }).then((canvas) => {
      //   document.body.appendChild(canvas);
      // });
      printJS('testprint', 'html');
    },
  },

};
</script>

<style lang="less" scoped>
#main{
  width: 100%;
  height: 600px;
}
#testprint{
  position: absolute;
  left: 0;
  top: -1000px;
  width: 100%;
  // opacity: 0;
  // display: none;
  // visibility: hidden;
}

</style>
