import Vue from 'vue'
import Router from 'vue-router'
import CoursesList from '@/components/CoursesList'
import Course from '@/components/Course'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'courses-list',
      component: CoursesList
    },
    {
      path: '/courses/:course',
      name: 'course',
      component: Course
    }
  ]
})
