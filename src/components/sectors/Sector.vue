<template>
  <div :id="hashtag" class="hero is-white" :class="[{'is-fullheight' : isFullHeight}, styles]">
    <div class="hero-head">
      <slot name="head"></slot>
    </div>
    <div class="hero-body">
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false" class="on-top"></b-loading>
      <slot name="body"></slot>
    </div>

    <div class="hero-foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
import SectorMixin from "@/mixins/SectorMixin.vue";
import InitializationSectorMixin from "@/mixins/InitializationSectorMixin.vue";
import SnackbarMixin from "@/mixins/SnackbarMixin.vue";

export default {
  name: "Sector",
  props: {
    isFullHeight: {
      type: Boolean,
      required: false,
      default: false
    },
    styles: {
      type: String,
      required: false
    }
  },
  mixins: [SectorMixin, InitializationSectorMixin, SnackbarMixin],
  methods: {
    load: async function() {
      let self = this;
      self.isLoading = true;

      await this.initLoad()
        .catch(function(e) {
          self.error(self.type + "," + self.identify, e.toString());
        })
        .then(function() {
          self.isLoading = false;
        });
    }
  },
  data: function() {
    return {
      isLoading: true
    };
  },
  computed: {
    hashtag: function() {
      return this.type != null ? this.type.concat(this.identify) : null;
    }
  },
  created: function() {
    this.load();
  },
  watch: {
    $route(/*to, from*/) {
      this.load();
    }
  }
};
</script>

<style>
.on-top {
  z-index: 9999;
}
</style>
