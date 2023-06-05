import TaskPage from '../pages/TaskPage.vue'

const routes = [
    {
        path: '/tasks',
        name: 'index',
        component: TaskPage
    }
] as const

export default routes

