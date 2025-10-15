import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/note',
      name: 'note',
      component: () => import('../views/Note.vue'),
      meta: { requiresAuth: true }, // Uniquement pour les utilisateurs connectés
    },
    {
      path: '/registernote',
      name: 'registernote',
      component: () => import('../views/RegisterNote.vue'),
      meta: { requiresAuth: false }, // Uniquement pour les utilisateurs connectés
    },

  ],
});

// Middleware de protection des routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
  const userRole = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur

  // Si la route nécessite une authentification et l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  }
  // Si la route nécessite un rôle spécifique et l'utilisateur n'a pas ce rôle
  else if (to.meta.requiredRole && to.meta.requiredRole !== userRole) {
    next('/404'); // Redirige vers une page d'erreur 404 si le rôle ne correspond pas
  }
  else {
    next(); // Permet d'accéder à la route si tout est ok
  }
});




export default router;
