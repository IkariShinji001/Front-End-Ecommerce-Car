<template>
    <v-container fluid="true" class="wrapper">
        <section class="content-container">
            <h1>Oops!</h1>
            <div class="content-body">
                <h2>404 - Không tìm thấy trang web</h2>
                <router-link to="/">
                    <v-btn 
                    variant="outlined"
                    elevation="4"
                    rounded="lg"
                    class="mt-5"
                    >
                    Về trang chủ</v-btn>
                </router-link>
            </div>
        </section>
    </v-container>
</template>

<script>

export default {
    name: "NotFound",
}
</script>


<style lang="scss" scoped>
    .wrapper{
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;

        h1{
            font-size: 200px;
            font-weight: bold;
            font-family: "Rubik", sans-serif;
            background-image: url("https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2020/05/02/23-buc-anh-tuyet-dep-gui-den-tu-vu-tru-docx-1588426523158.jpeg");
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-position: center;
        }
        .content-body{
            font-family: sans-serif;
            font-weight: 900;
            font-size: 16px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            width: 75%;
            justify-content: center;
            align-items: center;

            .return-homepage-btn{
                margin-top: 20px;
                color: blue;
            }
        }

    }
</style>