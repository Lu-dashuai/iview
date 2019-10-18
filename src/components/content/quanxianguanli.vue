<template>
  <div>
    <h1>权限管理页面</h1>
    <br />
    <div class="outerbox">
      <div class="lf">
        <Button type="primary" shape="circle" @click="add(true,null)">添加</Button>&nbsp;&nbsp;&nbsp;
        <Button type="error" shape="circle" @click="del()">删除</Button>&nbsp;&nbsp;&nbsp;
      </div>
    </div>
    <br />
    <bdsTable ref="tableTab"></bdsTable>
    <dialogTab ref="dialogTab"></dialogTab>
    <power ref="power"></power>
  </div>
</template>
<script>
import bdsTable from "../table/table.vue";
import store from "../../store/index.js";
import dialogTab from "../dialog/roleDialog.vue";
import power from "../dialog/powerDialog.vue";
export default {
  data() {
    return {
      del_url:"role/deleteRole",
    };
  },
  components: {
    bdsTable,
    dialogTab,
    power
  },
  created: function() {
    //获取全部角色信息
    this.getUserInfo();
  },
  store,
  methods: {
    getUserInfo() {
      this.$store.state.data_url = "role/getRoleList"; //赋值
      // this.$store.state._if = this._if
    },
    del(){//点击删除按钮
      this.$store.state.del_url = this.del_url;
      this.$refs.tableTab.delByid(null);//调用table组件的delbyid方法
    },
    add(bo,row){//点击弹出对话框
      this.$refs.dialogTab.openDialog(bo,row);
    },
    reLoading(){
      this.$refs.tableTab.createGetTableInfo();
    },
    power(bo,row){
      this.$refs.power.openDialog(bo,row);
    }
  }
};
</script>
<style scoped>
</style>