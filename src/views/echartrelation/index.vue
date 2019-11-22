<template>
  <div>
    <div id="main">

    </div>

  </div>
</template>

<script>

import graph from './data';
export default {
  data() {
    return {
      msg: 'Hello w2222orld!',
      show:true,
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.hideLoading();
    console.log(graph);
    var categories = [];
    for (var i = 0; i < 9; i++) {
        categories[i] = {
            name: '类目' + i
        };
    }
    graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        // node.symbolSize = 10;
        node.value = node.symbolSize;
        node.category = node.attributes.modularity_class;
        // Use random x, y
        node.x = node.y = null;
        node.draggable = true;
    });
    const option = {
        title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        
        animation: false,
        series : [
            {
                name: 'nnnnananame',
                type: 'graph',
                layout: 'force',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                symbol:(value, params) => {
                    // console.log(value, params);
                },
                label: {
                  show:true,
                  // normal: {
                  //   show:true,
                  //   // position: 'right'
                  // }
                },
                force: {
                    repulsion: 100,
                    gravity:0.1,
                    edgeLength:30
                    
                }
            }
        ]
    };

    myChart.setOption(option);

  },
  
};
</script>

<style lang="less" scoped>
#main{
  width: 100%;
  height: 600px;
}

</style>
