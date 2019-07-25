//discovery.js
import {
  DBPost
} from '../../db/DBPost.js';
var dbPost = new DBPost();
Page({
  data: {
    navTab: ["推荐", "圆桌", "热门", "收藏"],
    currentNavtab: "0",
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    feed: [],
    feed_length: 0
  },
  onLoad: function() {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  //使用本地 fake 数据实现刷新效果
  refresh: function() {
    var feed = dbPost.getAllPostData();
    console.log("loaddata");
    this.setData({
      feed: feed,
      feed_length: feed.length
    });
  }
});