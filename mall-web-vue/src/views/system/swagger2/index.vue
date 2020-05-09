<template>
    <div>
      <elFrame :src="url" />
    </div>
</template>

<script>
  import elFrame from '@/components/Iframe/index'
    export default {
        name: "swagger2",
        components: { elFrame },
        data(){
          return{
            url : 'http://localhost:8888/doc.html',
            url2 : 'http://192.168.88.137:9999/doc.html'
          }
        }
    }
</script>

<style scoped>

</style>
