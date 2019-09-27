<template>
  <div>
    <Modal v-model="modal6" title="用户添加框" :loading="loading" @on-ok="asyncOK">
      <p>弹出添加框</p>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal6: false,
      loading: true
    };
  },
  methods: {
    asyncOK() {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    },
    openDialog(bo){//父组件调用打开/关闭对话框
        this.modal6 = bo;
    }
  }
};
</script>
