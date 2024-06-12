import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    redirect: '/home',
    children: [
        {
            path: '/home',
            component: () => import('@/views/Index.vue'),
            meta: {
              title: 'Home page'
            }
        },
        {
            path: '/todo',
            component: () => import('@/views/Todo.vue'),
            meta: {
              title: 'Todo List'
            }
        }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const title = (to.meta.title as string) || 'My Todo'
  document.title = title

  next()
})

export default router
