<template>
  <section>
    <div class="logo">
      <img src="../assets/icon-above-font.png" alt="groupomania_logo">
    </div>
    <div class="mission-text">
      <h1>Internal social network for Groupomania's employees</h1>
    </div>
  </section>
</template>


<script>
export default {
name:"Home-page"
}
</script>

<style scoped>
.logo{
display:flex;
justify-content: center;
align-items: center;
}

img{
max-height: 500px;
}

.mission-text {
color:black;
display: flex;
justify-content: center;
text-align: center;
padding: 15px;
}

@media only screen and (max-width: 480px) {
  .logo img{
    width: 90%;
  }
}
</style>