export default {
  "nodes": [
    {
      name: '1',
      // x: 10,
      // y: 10,
      value: 70,
      text:'同学',
    },
    {
      name: '1_1',
      value: 50,
      text: '同学',
    },
    {
      name: '2',
      // x: '50%',
      // y: '50%',
      // fixed:true,
      value: 90,
      // symbolSize: 20,
      text: '2人',
      headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574512092900&di=d4da41e75e3819fbe4d75bc05fb41d2b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F17%2F20180117181801_KRYJQ.thumb.700_0.jpeg',
      itemStyle: {
        color: 'blue'
      }
    },
    {
      name: '3',
      value: 70,
      text: '下级',
    },
    {
      name: '3-1',
      value: 50,
      text: '下级',
    },
    {
      name: '3-2',
      value: 50,
      text: '下级',
    }
  ],
  "links": [
    {
      source: '1',
      target: '2'
    },
    {
      source: '1',
      target: '1_1'
    },
    {
      source: '2',
      target: '3'
    },
    {
      source: '3',
      target: '3-1'
    },
    {
      source: '3',
      target: '3-2'
    }
  ]


}