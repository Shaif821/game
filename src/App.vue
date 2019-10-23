<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                fixed
                right
                app
        >
            <v-list dense>
                <v-list-tile @click="" v-for="route in routeList">
                    <v-list-tile-action>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <router-link class="link" :to="route.path">{{route.name}}</router-link>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="cyan" dark fixed app>
            <v-spacer></v-spacer>
            <v-toolbar-title>Menu</v-toolbar-title>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex text-xs-center>
                        <!--<transition-group mode="out-in" enter-active-class="animated zoomIn"-->
                                          <!--leave-active-class="animated zoomOut">-->
                            <router-view :key="$route.fullPath"></router-view>
                        <!--</transition-group>-->
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="cyan" app>
            <v-spacer></v-spacer>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        props: {
            source: String
        },

        data: () => ({
            drawer: null,
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

<style>
    @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

    .link {
        text-decoration: none;
        color: black;
    }

</style>