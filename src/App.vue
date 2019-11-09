<template>
  <div class="example">
    {{ msg }}
    <div class="aa">
      <router-view />
    </div>

      <!-- <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition> -->

    <div id="main">

    </div>

  </div>
</template>

<script>
import usaJson from './shenzhen.json';

import hangzhou from './hangzhou-track.json';

// const echarts = require('echarts');
// import request from 'request';
// request.login.loginpost({
//   da:2,
//   ddddd:3
// }).then((res)=>{
//   console.log(res);
// })

import SYSOUTCONFIGS from 'SYSOUTCONFIG';

console.log(echarts);

export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
      show:true
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.hideLoading();

    var lines = hangzhou.map(function (track) {
        return {
            coords: track.map(function (seg, idx) {
                return seg.coord;
            })
        };
    });
    // function getBoundary(){       
    //   var bdary = new BMap.Boundary();
    //   bdary.get("深圳市福田区", function(rs){       //获取行政区域
    //     map.clearOverlays();        //清除地图覆盖物       
    //     var count = rs.boundaries.length; //行政区域的点有多少个
    //     if (count === 0) {
    //       alert('未能获取当前输入行政区域');
    //       return ;
    //     }
    //           var pointArray = [];
    //     for (var i = 0; i < count; i++) {
    //       var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
    //       map.addOverlay(ply);  //添加覆盖物
    //       pointArray = pointArray.concat(ply.getPath());
    //     }    
    //     map.setViewport(pointArray);    //调整视野  
    //     // addlabel();               
    //   });   
    // }

    // setTimeout(function(){
    //   getBoundary();
    // }, 2000);
    
    
    // var bdary = new BMap.Boundary();
		// bdary.get("深圳市福田区", (rs) => {
    //   console.log(rs);
    // });
    function renderItem(params, api) {
      
        var coords = [
          [114.11147554353012, 22.53825968738186],
          [114.11067254823502, 22.573654257697456],
          [114.0991198003972, 22.57012569325919],
          [114.09415244042033, 22.57518844931236],
          [114.08622480446684, 22.57498771806207],
          [114.07358268153745, 22.59308529613654],
          [114.0659341491058, 22.593152865041706],
          [114.05922766966219, 22.587632374925118],
          [114.03171311088394, 22.588218411552564],
          [114.01188229811332, 22.581938053129434],
          [114.0118090862143, 22.562512766899125],
          [114.00382755193021, 22.561041762076634],
          [114.00618704118195, 22.555780891754818],
          [114.00250309028675, 22.552934263261946],
          [114.00414438428349, 22.53855068413567],
          [113.99956122957309, 22.533797270013967],
          [114.00657582780654, 22.513944454892783],
          [114.00390229094863, 22.51095806210724],
          [114.01161100984942, 22.51220232385333],
          [114.02808350747209, 22.505867463751304],
          [114.04268249912377, 22.50970168596567],
          [114.0625552627617, 22.50540035489983],
          [114.0739365240777, 22.519475440190888],
          [114.08272824010096, 22.521543732625286],
          [114.08719012356754, 22.519014888022326],
          [114.09197189362612, 22.522371591677732],
          [114.09505757305188, 22.526859920914887],
          [114.08953353315066, 22.534372939396807],
          [114.10170674060399, 22.541269016155926],
          [114.11147554353012, 22.53825968738186]
        ];
        var points = [];
        for (var i = 0; i < coords.length; i++) {
            points.push(api.coord(coords[i]));
        }
        var color = api.visual('color');
        console.log();
        return {
            type: 'polygon',
            name: 'aaa',
            info: 'aa',
            shape: {
                points: echarts.graphic.clipPointsByRect(points, {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                }),
                // name: 'aaa',
            },
            style: api.style({
                fill: color,
                stroke: echarts.color.lift(color)
            })
        };
    }
    const option = {
        bmap: {
            center: [114.05096,22.541009],
            zoom: 14,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        series: [
          {
            type: 'lines',
            coordinateSystem: 'bmap',
            data: lines,
            polyline: true,
            lineStyle: {
                normal: {
                    color: 'purple',
                    opacity: 0.6,
                    width: 1
                }
            }
          },
          {
              type: 'custom',
              coordinateSystem: 'bmap',
              renderItem: renderItem,
              itemStyle: {
                  normal: {
                      opacity: 0.5
                  }
              },
              // animation: false,
              // silent: true,
              data: [0],
              z: -10
          }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', {element: 'aaa'},function (params) {
        // 控制台打印数据的名称
        console.log(params);
    });

  },
  
};
</script>

<style lang="less">
#main{
  width: 100%;
  height: 600px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.example {
  color: @aa;
  .aa {
    width: 100px;
    // height: 100px;
    background: url("./images/time.jpg");
  }
}

.test{
  display: flex;
  width:100px;
}
.test >div{
  word-wrap: break-word;
    overflow: hidden;
  // flex-basis:10px;
}
.test div:last-child{
  // flex-grow:1;
}


 *{
        margin: 0;
        padding: 0;
    }
    .wrapper{
        display: flex;
        width: 1000px;
        height: 300px;
    }
    .p1{
        flex: 2;
        border: 1px solid red;
    }
    .p2{
        border: 1px solid red;
        flex: 1;
        display: block;
        overflow: scroll;
    }
    .p3{
        width: 700px;
        height: 200px;
    }

</style>
