<template>
    <footer class="footer">
      <div class="pt-4 pb-3" style="background: #3d4a6e; color: #e0e2e8">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center" style="font-size: medium">
            <span>Created By Muhammad Rifki & Rizki Maulana Yusra | &#169; 2022 </span>
          </div>
        </div>
      </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer{
  text-align: center;

}

</style>
