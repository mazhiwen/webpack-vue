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
    <div
      class="popup_win"
      :style="{
        left:`${popUpWin.left}px`,
        top:`${popUpWin.top}px`
      }"
    >
      <h3>福田区区政府：</h3>
      <ul>
        <li>区纪委监委</li>
        <li>区委编办</li>
        <li>区委区政府办</li>
        <li>区委党校</li>

      </ul>
    </div>
  </div>
</template>

<script>
import usaJson from './shenzhen.json';

import hangzhou from './hangzhou-track.json';


import SYSOUTCONFIGS from 'SYSOUTCONFIG';


export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
      show:true,
      popUpWin:{
        left:100,
        top:0
      }
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
    const futianSTRCoords = [
      [
        [
          114.08726692199707,
          22.566780679492734
        ],
        [
          114.08752441406249,
          22.56614660700191
        ],
        [
          114.08709526062012,
          22.566384384527698
        ],
        [
          114.0816020965576,
          22.558378982351623
        ],
        [
          114.0816879272461,
          22.55187920514417
        ],
        [
          114.09971237182616,
          22.552037739939138
        ],
        [
          114.09971237182616,
          22.570664309865617
        ],
        [
          114.08726692199707,
          22.566780679492734
        ]
      ],
      [
        [
          114.08143043518066,
          22.558220454844033
        ],
        [
          114.08108711242676,
          22.557665607132662
        ],
        [
          114.08048629760742,
          22.557903399282278
        ],
        [
          114.07628059387207,
          22.551403599666305
        ],
        [
          114.0761947631836,
          22.542763148088515
        ],
        [
          114.10031318664551,
          22.543714416963457
        ],
        [
          114.09945487976074,
          22.551958472564426
        ],
        [
          114.08228874206543,
          22.551562135007757
        ],
        [
          114.08040046691895,
          22.557190021603603
        ],
        [
          114.07816886901855,
          22.552037739939138
        ],
        [
          114.08040046691895,
          22.557586342991698
        ],
        [
          114.08143043518066,
          22.558220454844033
        ]
      ],
      [
        [
          114.06778335571288,
          22.568682879468113
        ],
        [
          114.06778335571288,
          22.543318055728953
        ],
        [
          114.07576560974121,
          22.542921693356273
        ],
        [
          114.07576560974121,
          22.55164140261017
        ],
        [
          114.08692359924316,
          22.567256231947127
        ],
        [
          114.07971382141113,
          22.5727249672656
        ],
        [
          114.06778335571288,
          22.568682879468113
        ]
      ],
      [
        [
          114.06735420227051,
          22.56876213723083
        ],
        [
          114.02512550354004,
          22.560836135418967
        ],
        [
          114.0332794189453,
          22.553385278341302
        ],
        [
          114.03576850891113,
          22.54165332611524
        ],
        [
          114.06726837158203,
          22.54315951091646
        ],
        [
          114.06735420227051,
          22.56876213723083
        ]
      ],
      [
        [
          114.02469635009764,
          22.56051908587018
        ],
        [
          113.99405479431152,
          22.556080315658914
        ],
        [
          114.00032043457031,
          22.548708470991805
        ],
        [
          113.99388313293457,
          22.546013289677703
        ],
        [
          113.9955997467041,
          22.535469868930868
        ],
        [
          114.03533935546875,
          22.542049692130014
        ],
        [
          114.0332794189453,
          22.553306011740816
        ],
        [
          114.02469635009764,
          22.56051908587018
        ]
      ],
      [
        [
          114.09988403320312,
          22.54363514480761
        ],
        [
          114.08117294311523,
          22.54236678412239
        ],
        [
          114.08220291137695,
          22.537689603373494
        ],
        [
          114.07859802246094,
          22.534756375281635
        ],
        [
          114.08091545104979,
          22.531505968673724
        ],
        [
          114.09971237182616,
          22.5345978206367
        ],
        [
          114.09988403320312,
          22.54363514480761
        ]
      ],
      [
        [
          114.08091545104979,
          22.54260460263864
        ],
        [
          114.04426574707031,
          22.54181187265774
        ],
        [
          114.04478073120116,
          22.53118885173799
        ],
        [
          114.05156135559082,
          22.531664526868514
        ],
        [
          114.05156135559082,
          22.517948569979943
        ],
        [
          114.06108856201172,
          22.521199295592247
        ],
        [
          114.06529426574707,
          22.517472847622763
        ],
        [
          114.07147407531738,
          22.517631421923767
        ],
        [
          114.0761947631836,
          22.51493563406273
        ],
        [
          114.08555030822752,
          22.523419259382383
        ],
        [
          114.08040046691895,
          22.531585247793878
        ],
        [
          114.07773971557617,
          22.534914929744517
        ],
        [
          114.08194541931151,
          22.537768878943577
        ],
        [
          114.08091545104979,
          22.54260460263864
        ]
      ],
      [
        [
          114.04409408569335,
          22.54189114586069
        ],
        [
          113.99585723876953,
          22.534835652535836
        ],
        [
          113.99139404296875,
          22.535469868930868
        ],
        [
          113.99036407470703,
          22.532457315112012
        ],
        [
          113.9886474609375,
          22.532615872214585
        ],
        [
          113.9883041381836,
          22.53023749656207
        ],
        [
          113.98804664611816,
          22.524608511026262
        ],
        [
          113.99886131286621,
          22.530078936728977
        ],
        [
          114.0095043182373,
          22.52984109663804
        ],
        [
          114.01482582092284,
          22.530792454544404
        ],
        [
          114.01765823364258,
          22.526511292363335
        ],
        [
          114.0377426147461,
          22.51493563406273
        ],
        [
          114.04495239257812,
          22.527145546985007
        ],
        [
          114.04409408569335,
          22.54189114586069
        ]
      ],
      [
        [
          114.04520988464355,
          22.530554615682156
        ],
        [
          114.04546737670898,
          22.526432010330872
        ],
        [
          114.03465270996094,
          22.50724442091497
        ],
        [
          114.04692649841309,
          22.504865608572995
        ],
        [
          114.05078887939453,
          22.50320041558609
        ],
        [
          114.05525207519531,
          22.505024197335548
        ],
        [
          114.05645370483398,
          22.509940358764066
        ],
        [
          114.05799865722656,
          22.51398416697013
        ],
        [
          114.0640926361084,
          22.517472847622763
        ],
        [
          114.06100273132324,
          22.520327157202154
        ],
        [
          114.05096054077148,
          22.517234985830115
        ],
        [
          114.05070304870604,
          22.530951013558354
        ],
        [
          114.04520988464355,
          22.530554615682156
        ]
      ],
      [
        [
          113.99431228637695,
          22.55726928597232
        ],
        [
          114.07344818115234,
          22.571377617836507
        ],
        [
          114.07138824462889,
          22.57431006737855
        ],
        [
          114.06984329223633,
          22.577717970886745
        ],
        [
          114.06323432922363,
          22.580571034588164
        ],
        [
          114.0571403503418,
          22.5793030135699
        ],
        [
          114.05096054077148,
          22.59182420967759
        ],
        [
          114.03156280517578,
          22.59483546677807
        ],
        [
          114.00941848754883,
          22.589922329157808
        ],
        [
          114.00289535522461,
          22.562342110821778
        ],
        [
          113.99431228637695,
          22.55726928597232
        ]
      ]
    ];
    function renderItem(params, api) {
      
        // var coords = [
        //   [114.11147554353012, 22.53825968738186],
        //   [114.11067254823502, 22.573654257697456],
        //   [114.0991198003972, 22.57012569325919],
        //   [114.09415244042033, 22.57518844931236],
        //   [114.08622480446684, 22.57498771806207],
        //   [114.07358268153745, 22.59308529613654],
        //   [114.0659341491058, 22.593152865041706],
        //   [114.05922766966219, 22.587632374925118],
        //   [114.03171311088394, 22.588218411552564],
        //   [114.01188229811332, 22.581938053129434],
        //   [114.0118090862143, 22.562512766899125],
        //   [114.00382755193021, 22.561041762076634],
        //   [114.00618704118195, 22.555780891754818],
        //   [114.00250309028675, 22.552934263261946],
        //   [114.00414438428349, 22.53855068413567],
        //   [113.99956122957309, 22.533797270013967],
        //   [114.00657582780654, 22.513944454892783],
        //   [114.00390229094863, 22.51095806210724],
        //   [114.01161100984942, 22.51220232385333],
        //   [114.02808350747209, 22.505867463751304],
        //   [114.04268249912377, 22.50970168596567],
        //   [114.0625552627617, 22.50540035489983],
        //   [114.0739365240777, 22.519475440190888],
        //   [114.08272824010096, 22.521543732625286],
        //   [114.08719012356754, 22.519014888022326],
        //   [114.09197189362612, 22.522371591677732],
        //   [114.09505757305188, 22.526859920914887],
        //   [114.08953353315066, 22.534372939396807],
        //   [114.10170674060399, 22.541269016155926],
        //   [114.11147554353012, 22.53825968738186]
        // ];
        var coords = futianSTRCoords[api.value(0)];
        var points = [];
        for (var i = 0; i < coords.length; i++) {
            points.push(api.coord(coords[i]));
        }
        var color = api.visual('color');
        
        return {
            type: 'polygon',
            name: 'aaa',
            info: 'aa',
            shape: {
                points: echarts.graphic.clipPointsByRect(points, {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height,
                    // name:'23131',
                }),
                // name: 'aaa',
            },
            style: api.style({
                fill: color,
                stroke: echarts.color.lift(color),
                lineWidth:0,
                shadowBlur:0,
                shadowOffsetX:0,
                shadowOffsetY:0,
                shadowColor:'rgba(0, 0, 0, 0.5)',

            }),
            styleEmphasis: api.style({
                fill: color,
                stroke: echarts.color.lift(color),
                lineWidth:10,
                shadowBlur:2,
                shadowOffsetX:2,
                shadowOffsetY:-2,
                shadowColor:'rgba(255, 0, 0, 1)',

            })
        };
    }
    function getLabelStyle(params){
      return {
        normal: {
          formatter: '{b}',
          position:  ['35%', '50%'],
          show: true,
          color:'rgba(0,0,0,1)',
          fontWeight:'bolder',
          fontSize:18,
          ...params
        }
      }
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
          // {
          //   type: 'lines',
          //   coordinateSystem: 'bmap',
          //   data: lines,
          //   polyline: true,
          //   lineStyle: {
          //       normal: {
          //           color: 'purple',
          //           opacity: 0.6,
          //           width: 1
          //       }
          //   }
          // },
          {
              name: 'Top5',
              type: 'effectScatter',
              coordinateSystem: 'bmap',
              data: [
                {
                  name:'福田区',
                  value:[114.06, 22.53, 279]
                }
              ],
              symbolSize: function (val) {
                  return val[2] / 10;
              },
              showEffectOn: 'emphasis',
              rippleEffect: {
                  brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  }
              },
              itemStyle: {
                  normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
              },
              zlevel: 1
          },
          {
              type: 'custom',
              coordinateSystem: 'bmap',
              renderItem: renderItem,
              dimensions: ['date', 'open', 'close', 'highest', 'lowest','date1', 'ope1n', 'c1lose', 'highe1st', 'lo1west'],
              itemStyle: {
                  normal: {
                      opacity: 0.5
                  },
                  
              },
              color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: 'red' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'blue' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
              },
              // borderColor: '#00ff7f',
              // borderWidth: 10,
              // borderType:'solid',
              // shadowColor: 'rgba(0, 0, 0, 0.5)',
              // shadowBlur: 10,
              // color: {
              //     type: 'radial',
              //     x: 0.5,
              //     y: 0.5,
              //     r: 1,
              //     colorStops: [{
              //         offset: 0, color: 'red' // 0% 处的颜色
              //     }, {
              //         offset: 1, color: 'blue' // 100% 处的颜色
              //     }],
              //     global: false // 缺省为 false
              // },
              // animation: false,
              // silent: true,
              // data: [222,33],
              data:[
                {
                  value:0,
                  name:'园岭街道',
                  label: getLabelStyle()
                },
                {
                  value:1,
                  name:'福田哈哈哈44444借到',
                  label: getLabelStyle(),
                },
                {
                  value:2,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:3,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:4,
                  name:'福rrr田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:5,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:6,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:7,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:8,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                },
                {
                  value:9,
                  name:'福田哈哈哈借到',
                  label: getLabelStyle()
                }],
              z: -10
          }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', {element: 'aaa'}, (params) => {
      // 控制台打印数据的名称
      const event = params.event.event;
      this.popUpWin.left = event.clientX - 100;
      this.popUpWin.top = event.clientY - 330;
    });
    // myChart.on('click', (params) => {
    //     // 控制台打印数据的名称
    //     console.log(params);
    //     const event = params.event.event;
    //     this.popUpWin.left = event.clientX;
    //     this.popUpWin.top = event.clientY;
    // });
  },
  
};
</script>

<style lang="less" scoped>
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

.popup_win{
  position:absolute;
  width: 200px;
  height: 300px;
  background: rgba(125,125,125,0.5);
  h3 {

  }
  ul,li{
    list-style: none;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 50%;
  }
}
</style>
