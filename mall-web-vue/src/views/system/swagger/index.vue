<template>
    <div>
      <elFrame :src="url" />
    </div>
</template>

<script>
  import elFrame from '@/components/Iframe/index'
    export default {
        name: "swagger",
        components: { elFrame },
        data(){
          return{
            url : 'http://localhost:8888/swagger-ui.html',
            url2 : 'http://192.168.88.137:9999/swagger-ui.html'
          }
        }
    }
</script>

<style scoped>

</style>
