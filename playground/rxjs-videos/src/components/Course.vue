<template>
  <div class="">
    <h3>{{ $route.params.course }}</h3>
    <div>
      <video-player
        ref="videoPlayer"
        :options="playerOptions"
        @ready="playerReadied"></video-player>
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
  name: 'Course',
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
          src: `http://7xtej9.com1.z0.glb.clouddn.com/rxjs/${this.$route.params.course}/01-egghead-rxjs-reactive-programming-what-is-rxjs.mp4`
        }]
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  beforeCreate: function () {
    console.log('before created')
    console.log('this.videos', this.videos)
    console.log('this.$route', this.$route)
  },
  created: function () {
    console.log('created')
    console.log('this.videos', this.videos)
    console.log('this.$route', this.$route)
    this.playing = this.videos[this.$route.params.course][0]
  },
  methods: {
    playerReadied (player) {
      console.log('the player is readied', player, player.options().playerOptions.sources.src)
      // you can use it to do something...
      player.reset()
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
