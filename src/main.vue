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
.loginout{
  border: 1px solid #000;
  background: #ccc;
  border-radius: 20px;
  padding: 10px;
}
.cell1{
    height: 40px;
    vertical-align: middle;
    display: inline-block;
    line-height: 40px;
}
.cell2{
    height: 40px;
    vertical-align: middle;
    display: inline-block;
    line-height: 40px;
}
span.cell2 {
    margin: 0px 0px 0px 1050px;
}
</style>
<template>
<div>
  <div v-if="$route.name === 'login'">
    <router-view></router-view>
  </div>
  <div class="layout" v-if="$route.name !== 'login'">
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
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <!-- 此处仅是为了演示显示的标签跳转   后续需要更改 -->
        <div>
          <span class="cell1" style="font-size:20px;">Hi , {{username}} !</span>
          <span class="cell2"><Button type="warning" shape="circle" @click="logout()">注销</Button></span>
        </div>
      </Header>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem v-for="item in add_tab" :key="item">{{item}}</BreadcrumbItem>
        </Breadcrumb>
        <!-- 中间区域 -->
        <Card>
          <div style="height: 800px">
            <router-view  :key="this.$route.path"></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      theme2: "dark",
      tree: [],
      add_tab: [], //存放点击tab，标签栏切换
      // role_id:'',
      username:''
    };
  },
  created: function() {
    this.getRoleId();
    // this.getTree();
  },
  methods: {
    // getTree() {
    //   alert(this.role_id)
     
    // },
    getRoleId(){
      this.$http.get("power/getSessionRoleId").then(res => {
        // alert(JSON.stringify(res))
        if (res.status == 200&&res.body.code==200) {
          var role_id = res.body.data.role_id;
          this.username = res.body.data.user_name;
          this.$store.state.user = res.body.data;//存到vuex中
          this.$http.get("power/getPower",{ params: { role_id: role_id } }).then(res => {
            if (res.status == 200) {
              // alert(JSON.stringify(res.body))
              this.tree = res.body;
            } else {
              this.$Message.error("tree数据加载失败"); 
            }
          });
        } else {
          this.$router.push('/')
        }
      });
    },
    logout(){
      this.$http.get("power/logout").then(res => {
        // alert(JSON.stringify(res))
        if (res.status == 200&&res.body.code==200) {
          this.$router.push('/');
        } else {
          this.$router.push('/')
          this.$Message.error("注销失败"); 
        }
      });
    }
  },
  components: {},
  watch: {
    $route(to, from) {
      this.getRoleId();
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
