<template>
    <el-form label-width="120px">
        <el-form-item label="微信公众号名称">
            <el-input v-model="$store.state.incoming.we_chat_name"></el-input>
        </el-form-item>
        <el-form-item label="微信支付目录">
            <el-input v-model="$store.state.incoming.pay_dir"></el-input>
        </el-form-item>
        <el-form-item label="公众号APPID">
            <el-input v-model="$store.state.incoming.we_chat_app_id"></el-input>
        </el-form-item>
        <el-form-item label="小程序APPID">
            <el-input v-model="$store.state.incoming.we_chat_program_id"></el-input>
        </el-form-item>
        <el-form-item label="联系人微信号">
            <el-input v-model="$store.state.incoming.we_chat_link"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: 'WeChat',
  }
</script>

<style scoped>

</style>
