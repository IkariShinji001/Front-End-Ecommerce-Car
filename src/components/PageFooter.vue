<template>
    <v-footer
      absolute
      class="text-center d-flex flex-column footer"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
          color="white"
        ></v-btn>
      </div>
  
      <v-divider></v-divider>
  
      <div class="title">
        {{ new Date().getFullYear() }} — <strong >Thanh Duy Luxury</strong>
      </div>
    </v-footer>
  </template>


<script>

export default{
    name: "PageFooter",
    setup(){
        const icons = [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ];
      return{ icons};
    }
}

</script>


<style scoped>
  .footer{
    height: 150px;
    background-color: #001C44;
    padding: 20px 0;
    margin-top: 20px;
    bottom: 0;
    
  }
  .title{
    color: white;
  }

</style>
  