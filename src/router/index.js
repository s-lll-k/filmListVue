import { createRouter, createWebHistory } from "vue-router";
import FilmList from "@/pages/FilmList.vue";
import FilmDetails from "@/pages/FilmDetails.vue";

const routes = [
    {
        path: "/",
        name: "film-list",
        component: FilmList
    },
    {
        path: "/film-:id",
        name: "film-details",
        component: FilmDetails,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
