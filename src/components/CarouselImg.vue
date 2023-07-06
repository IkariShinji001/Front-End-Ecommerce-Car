<template>
    <v-carousel
      class="carousel"
      :height="height"
      hide-delimiters
      progress="blue"
    >
      <v-carousel-item
        v-for="(slide, i) in slidesInfor"
        :key="i"
        :src="slide.src"
      >
      </v-carousel-item>
    </v-carousel>
</template>


<script>
import { ref } from 'vue';

export default{
    name: "CarouselImg",
    props:{
        slides:{
            type: Array
        },
        height: String,
        width: String
    },
    setup(props){
        const slidesInfor = ref(props.slides);
        return{
          slidesInfor
        }
    }
}

</script>
  

<style scoped>
.carousel{
  margin: 0 auto;
  margin-top: 60px;
}
</style>