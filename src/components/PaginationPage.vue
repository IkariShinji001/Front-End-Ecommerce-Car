<template>
    <div class="text-center">
        <v-pagination v-model="localPage" :length="props.length" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"
            @update:modelValue="emitPage"></v-pagination>
    </div>
</template>
  

<script>
import { ref } from 'vue';
export default {
    name: "PaginationPage",
    props: {
        length: Number,
        page: {
            type: Number,
            default: 1,
        },
    },
    emits: ['update:page'],
    setup(props, { emit }) {
        const localPage = ref(props.page);
        const emitPage = () => {
            emit('update:page', localPage.value);
        };

        return {
            localPage,
            emitPage,
            props
        };



    }
}

</script>