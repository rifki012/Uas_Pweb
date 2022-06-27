<script>
import TopNavView from "./views/Nav.vue";
import FooterView from "./views/Footer.vue";
export default {
  components: {TopNavView,FooterView}
}
</script>

<template>
  <TopNavView/>
  <main>
    <div class="atas"></div>
    <div class="container">
      <RouterView/>
    </div>
  </main>
  <FooterView/>
</template>
