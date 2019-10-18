<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <div class="layout">
    <!-- 左侧菜单栏 -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu :theme="theme2" width="220px">
        <Submenu v-for="item in tree" :key="item.id" :name="item.id">
          <template slot="title">
            <Icon :type="item.iconcls" />
            {{ item.title }}
          </template>
          <router-link v-for="it in item.children" :key="item.id+'-'+it.id" :to="it.url">
            <MenuItem :name="item.id +'-'+it.id">
              <Icon :type="it.iconcls" />
              {{ it.title }}
            </MenuItem>
          </router-link>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <!-- 头部 -->
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">注销</Header>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem v-for="item in add_tab" :key="item">{{item}}</BreadcrumbItem>
        </Breadcrumb>
        <!-- 中间区域 -->
        <Card>
          <div style="height: 600px">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme2: "dark",
      tree: [],
      add_tab: [] //存放点击tab，标签栏切换
    };
  },
  created: function() {
    this.getTree();
  },
  methods: {
    getTree() {
      this.$http.get("power/getPower",{ params: { role_id: null } }).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.tree = res.body;
        } else {
          alert("tree数据加载失败");
        }
      });
    }
  },
  components: {},
  watch: {
    $route(to, from) {
      this.add_tab = [];
      var path = to.path;
      var length = this.tree.length;
      //拼接tabbar
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < this.tree[i].children.length; j++) {
          if (this.tree[i].children[j].url == path) {
            this.add_tab.push(this.tree[i].title, this.tree[i].children[j].title);
          }
        }
      }
    }
  }
};
</script>
