<template> 
  <footer>
    {{msg}}
  </footer>
  
</template>

<script>
export default {
  data () {
    return {
      msg: '版权所有© 2017，保留所有权利'
    }
  }
}
</script>

<style scoped>
    footer {
        line-height:50px;
        color: #666;
        font-size: 16px;
    }
</style>
