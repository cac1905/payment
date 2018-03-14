<template> 
  <header>
      <div class="main">
        <ul class="nav clearfix">
              <li v-for="item in gameNavs" :class="{ 'active': item === selected}" @click="choose(item)">
                  <router-link :to="item.gamePath">   
                    {{item.title}}
                  </router-link> 
              </li> 
          </ul>
      </div>
  </header>
  
</template>

<script>
export default {
  data () {
    return {
      nowGame: '北京PK10',
      selected: null,
      gameNavs: [{
          title: '',
          subtitle: '',
          gamePath: '/'
      },
      {
          title: '支付中心',
          subtitle: '',
          gamePath: '/'
      }]
    }
  },
  methods: {
    choose (index) {
      this.selected = index
    }
  }
}
</script>

<style scoped>
header { 
    width: 100%;  
    height: 80px;
    line-height: 80px;
    background: #414141;
    border-bottom: 1px solid #FEB015;
}
.nav li {
  float: left; 
  padding: 0 20px;
}
.nav  li:first-child {
    padding: 0 20px 0 0;
}
.nav  li a {
    display: block;
    height: 100%;
    font-size: 16px;
    color: #dadada;
}
.nav  li a:hover, .nav  li.active a {
    color: #f3c523;
} 
</style>
