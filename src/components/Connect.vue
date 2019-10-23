<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex v-for="i in 36" :key="`2${i}`" xs2>
                <v-card>
                    <v-card-text class="px-0">2</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Connect",

        data() {
            return {
            }
        },

        methods: {

        }
    }
</script>

<style scoped>

</style>