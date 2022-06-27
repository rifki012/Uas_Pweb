<template>
  <main>
    <section class="section is-large">
      <div class="row">
          <div class="text">
            <div class="justify-content-center align-self-center">
              <h1>Ini Merupakan Website Project UAS </h1>
              <h1>Pemrograman WEB</h1>
            </div>
          </div>
        <div class="pic">
          <img src="@/assets/home.png" alt="" width="100%" class="img-fluid"/>
        </div>
      </div>
    </section>
  </main>
</template>


<style scoped>
main{
  background-size: cover;
  margin-left: -100px;
  margin-right: -100px;
  margin-top: -250px;
}
.pic{
  margin-left:  700px ;
  margin-top: 10px;
  margin-bottom: auto;
}
div.row {
  font-size: 50px;
}
</style>
<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
