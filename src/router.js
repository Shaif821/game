import Vue from "vue";
import Router from "vue-router";

import Home from "./components/Home";
import Shuffle from "./components/Shuffle";
import TicTac from "./components/TictTac";
import ColorBreak from "./components/ColorBreak";
import Connect from "./components/Connect";

Vue.use(Router);

export default new Router({
    mode: "history",
    linkExactActiveClass: "is-active",

    // scrollBehavior() {
    //     return { x: 0, y: 0 };
    // },

    routes: [
        {
            path: "/Game/",
            name: "Home",
            component: Home
        },
        {
            path: "/Game/shuffle",
            name: "Shuffle puzzle",
            component: Shuffle
        },
        {
            path: "/Game/tictac",
            name: "Tic Tac Toe",
            component: TicTac
        },
        // {
        //     path: "/Game/colorbreak",
        //     name: "Color Break",
        //     component: ColorBreak
        // },
        // {
        //     path: "/Game/connect",
        //     name: "Connect",
        //     component:Connect
        // }

    ]
});
