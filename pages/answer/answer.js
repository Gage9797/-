//answer.js
import {DBPost} from '../../db/DBPost.js';
Page({
  data: {
  },
  onLoad: function(options) {
    console.log('onLoad')
    var questionId = options.id;
    this.dbPost = new DBPost(questionId);
    this.postsData = this.dbPost.getPostItemById();
    console.log(this.postsData)
    this.setData({
      answer: this.postsData.data,
    });
    this.setAniation();
  },
  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },

  OnCollectionTap: function (event) {
    var newData = this.dbPost.collect();

    // 重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    // 应当有选择的更新部分数据

    this.setData({
      'answer.collect': newData.collect,
    })
    // 交互反馈
    wx.showToast({
      title: newData.collect ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },
  onThanksTap: function (event) {
    var newData = this.dbPost.up();
    this.setData({
      'answer.upStatus': newData.upStatus,
      'answer.upNum': newData.upNum
    }),

      this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
  },

})