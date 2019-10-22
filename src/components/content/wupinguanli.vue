<template>
  <div>
    <h1>物品管理页面</h1>
    <br />
    <div class="outerbox">
      <div class="lf">
        <Button type="primary" shape="circle" @click="add(true,null)">添加</Button>&nbsp;&nbsp;&nbsp;
        <Button type="error" shape="circle" @click="del()">删除</Button>&nbsp;&nbsp;&nbsp;
      </div>
    </div>
    <br/>
    <bdsTable ref="tableTab"></bdsTable>
    <dialogTab ref="dialogTab"></dialogTab>
    <lixiang ref="lixiang"></lixiang>
  </div>
</template>
<script>
import bdsTable from "../table/table.vue";
import dialogTab from "../dialog/wupingDialog.vue";
import lixiang from "../dialog/lixiang.vue";
export default {
  data() {
    return {
      del_url:"order/deleteOrder",
    };
  },
  components: {
    bdsTable,
    dialogTab,
    lixiang
  },
  created: function() {
    //获取全部角色信息
    this.getCreate();
  },
   methods: {
    getCreate() {
      this.$store.state.data_url = "order/getData"; //赋值
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
    lixiang(bo,row){
      this.$refs.lixiang.openDialog(bo,row);
    }
  }
};
</script>
<style scoped>
</style>