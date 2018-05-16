Page({
  data: {
    list: [
      {
        id: 'nav',
        name: '视图容器',
        open: false,
        pages: ['view', 'scroll-view', 'swiper', 'movable-view', 'cover-view']
      },
      {
        id: 'nav',
        name: '基础内容',
        open: false,
        pages: ['icon', 'text', 'rich-text', 'progress']
      },
      {
        id: 'nav',
        name: '表单组件',
        open: false,
        pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea']
      },
      {
        id: 'nav',
        name: '导航',
        open: false,
        pages: ['navigator']
      },
      {
        id: 'nav',
        name: '媒体组件',
        open: false,
        pages: ['audio', 'image', 'video', 'camera', 'live-player', 'live-pusher']
      },
      {
        id: 'nav',
        name: '地图',
        open: false,
        pages: ['map']
      },
      {
        id: 'nav',
        name: '画布',
        open: false,
        pages: ['canvas']
      },
      {
        id: 'nav',
        name: '开放能力',
        open: false,
        pages: ['open-data', 'web-view', 'ad']
      }
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
});
