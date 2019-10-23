<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex class="dashboard" xs12 >
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Shuffle</v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                            <router-link to="/Game/shuffle">
                                <v-btn color="primary">Play</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>

                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Tic Tac Toe</v-toolbar-title>
                        </v-toolbar>
                        <v-card-actions>
                            <router-link to="/Game/tictac">
                                <v-btn color="primary">Play</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                    <br>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Home",

        data: () => ({
            routeList: [],
        }),

        mounted() {
            //Loop through all the routes and save the name & path to the routeList array
            for (let i = 0; i < this.$router.options.routes.length; i++) {
                this.routeList.push({
                    name: this.$router.options.routes[i]['name'],
                    path: this.$router.options.routes[i]['path']
                });
            }
        }
    }
</script>

<style scoped>

    .dashboard {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .dashboard > *{
        flex: 1;
        margin: 10px;
        min-width: 200px;
    }

</style>