<template>
  <div class="">
    <h3>Courses List</h3>
    <ul>
      <li v-for="course in courses">
        <router-link :to="{ name: 'course', params: { course: course }}">{{ course }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { COURSES_LIST } from '../data/videos.js'
export default {
  name: 'CoursesList',
  data () {
    return {
      courses: COURSES_LIST
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 10px 0;
}

a {
  color: #42b983;
}
</style>
