import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue"
import GamePage from "../views/GamePage.vue"
import NotFound from "../views/NotFound.vue"

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage
    },
    {
        path: "/game",
        name: "GamePage",
        component: GamePage,
    },
    {
        path: "/:catchAll(.*)*",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL as string),
    routes
});

export default router;