
class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  /*初始化缓存数据*/
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }
  /*得到全部文章信息*/
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data_post.js').post;
      this.execSetStorageSync(res);
    }
    return res;
  }

  //获取指定id号的文章数据
  getPostItemById() {
    var allPostData = this.getAllPostData();
    var len = allPostData.length;
    for (var i = 0; i < len; i++) {
      if (allPostData[i].question_id == this.postId) {
        return {
          index: i,
          data: allPostData[i]
        }
      }
    }
  }
  collect() {
    return this.updatePostData('collect');
  }
  up() {
    return this.updatePostData('up');
  }
  //更新本地的点赞、评论信息、收藏、阅读量
  updatePostData(category, newComment) {
    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData();
    switch (category) {
      case 'collect':
        //处理收藏
        if (!postData.collect) {
          //如果当前状态是未收藏
          postData.collect = true;
        } else {
          // 如果当前状态是收藏
          postData.collect = false;
        }
        break;
      case 'up':
        if (!postData.upStatus) {
          postData.upNum++;
          postData.upStatus = true;
        } else {
          postData.upNum--;
          postData.upStatus = false;
        }
        break;
      case 'comment':
        postData.comments.push(newComment);
        postData.commentNum++;
        break;
      case 'reading':
        postData.readingNum++;
        break;
      default:
        break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }
};

export {
  DBPost
}