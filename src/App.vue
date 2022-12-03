<template>
  <div id="app">
    <header>
      <Nav />
    </header>
    <main>
      <router-view />
    </main>
  </div>
  
</template>

<script>
// import component
import Nav from "@/components/Nav.vue";

// declaration
export default {
  name: "App",
  components: {
    Nav,
  },
  
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: x-large;
}

body {
  background: #fcfcfc;
  height: 100vh;
  /* overflow: hidden; */
}

header {
  margin-bottom: 50px;
}

section {
  margin-top:30px;
}

@media only screen and (max-width: 380px) {
 header {
  margin-bottom: 0;
 }
 section {
  margin-top:20px;
 }
}

</style>
