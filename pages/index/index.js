//index.js

import {
  DBPost
} from '../../db/DBPost.js';

Page({
  data: {
    feed: [],
    feed_length: 0
  },
  onLoad: function() {
    this.dbPost = new DBPost();
    console.log('onLoad')
    this.refresh();
  },
  //事件处理函数
  bindItemTap: function(event) {
    var questionId = event.currentTarget.dataset.questionId;
    wx.navigateTo({
      url: '../answer/answer?id=' + questionId,
    })
  },
  //上拉刷新
  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  //获取本页数据
  refresh: function() {
    var feed_data = this.dbPost.getAllPostData();
    console.log("loaddata");
    //调用应用实例的方法获取全局数据
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  }

})