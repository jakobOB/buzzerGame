import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: "/", redirect: "/team" },
    { path: '/host', component: () => import('@/components/host.vue'), meta: { requiresAuth: true } },
    { path: '/team', component: () => import('@/components/team.vue') },
    { path: '/dashboard', component: () => import('@/components/Dashboard.vue'), meta: { requiresAuth: true } },
    { path: '/login', component: () => import('@/components/login.vue') },
]


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("authToken") === "secure";
    try {
        if (to.meta.requiresAuth && !isAuthenticated) {
            next("/login"); // Redirect to login if not authenticated
        } else {
            next(); // Allow access
        }
    } catch (error) {
        next("/login");
    }
});

export default router;