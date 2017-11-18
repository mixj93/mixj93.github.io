<template>
  <div class="">
    <h3>{{ $route.params.course }}</h3>
    <h4>{{ $route.params.video }}</h4>
    <div>
      <video-player ref="videoPlayer" :options="playerOptions" @ready="playerReadied"></video-player>
    </div>
    <ul>
      <li v-for="v in videos[$route.params.course]">
        <a>{{ v }}</a>
        <span v-if="v === playing">PLAYING</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { VIDEOS } from '../data/videos.js'
import Vue from 'vue'
import VueVideoPlayer from 'vue-video-player'

Vue.use(VueVideoPlayer)

export default {
  name: 'Video',
  data () {
    return {
      videos: VIDEOS,
      playing: '',
      playerOptions: {

        // component options
        start: 0,
        playsinline: false,

        // videojs options
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }]
      }
    }
  }
}
</script>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
}

a {
  color: #42b983;
}
</style>
