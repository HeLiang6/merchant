<template>
    <div>
        <el-upload
                :limit="1"
                :action="baseURL+url"
                list-type="picture-card"
                :class="{disabled:disable}"
                name="image"
                :file-list="imageList"
                :on-success="success"
                :auto-upload="true"
                :headers="{token}"
                :on-remove="remove"
                :on-change="change"
                :on-preview="handlePictureCardPreview"
        >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">{{ tips }}</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl"/>
        </el-dialog>
    </div>
</template>

<script>
  import {
    getToken,
  } from '@/utils/auth'

  export default {
    name: 'Upload',
    model: {
      prop: 'value',
      event: 'change',
    },
    props: [
      'url',
      'value',
      'tips',
      'preview',
    ],
    data () {
      return {
        baseURL: process.env.VUE_APP_BASE_URL,
        token: getToken(),
        imageList: [],
        fileUrl: this.value,
        dialogVisible: false,
        dialogImageUrl: '',
      }
    },
    computed: {
      disable () {
        return this.imageList.length > 0
      },
    },
    watch: {
      url (value) {
        this.url = value
      },
      value (value) {
        this.fileUrl = value
        if (this.fileUrl !== undefined && this.fileUrl !== '') {
          this.imageList = [
            {
              name: this.tips,
              url: this.baseURL + this.fileUrl,
            },
          ]
        }
      },
    },
    mounted () {
      if (this.fileUrl !== undefined && this.fileUrl !== '') {
        this.imageList = [
          {
            name: this.tips,
            url: this.baseURL + this.fileUrl,
          },
        ]
      }
    },

    methods: {
      success (response) {
        // this.fileUrl = response.image_save_url
        this.$emit('resp', response)
        this.$emit('change', response.image_save_url)
      },
      remove (file, fileList) {
        this.imageList = []
        this.fileUrl = ''
        this.$emit('change', this.fileUrl)
      },
      change (file, fileList) {
        if (fileList.length > 0) {
          this.imageList = fileList
        } else {
          this.imageList = []
        }
      },
      handlePictureCardPreview (file) {
        console.log(file.url)
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
    },
  }
</script>

<style>
    .disabled .el-upload--picture-card {
        display: none;
    }
</style>
