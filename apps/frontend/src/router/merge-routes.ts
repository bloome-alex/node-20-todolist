import { createRouter, createWebHistory } from 'vue-router'

import { routes as baseRoutes } from '../modules/base'
import { routes as taskRoutes } from '../modules/task'

const routes = [
    ...baseRoutes,
    ...taskRoutes
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})