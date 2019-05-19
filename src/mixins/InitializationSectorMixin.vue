<script>
import AsyncStoreMixin from "@/mixins/stores/AsyncStoreMixin.vue";
export default {
  mixins: [AsyncStoreMixin],
  methods: {
    initialization: function() {
      if (this.$route.params.id != null && this.$route.params.id != "Sectors") {
        this.identify =
          this.$route.params.id == null ? this.pId : this.$route.params.id;
        this.type =
          this.$route.params.type == null
            ? this.pType
            : this.$route.params.type;
      } else {
        this.identify = this.pId == null ? this.$route.params.id : this.pId;
        this.type = this.pType == null ? this.$route.params.type : this.pType;
      }

      if (this.identify == null || this.type == null) {
        throw "Error sector initialization";
      }
    },

    initLoad: async function() {
      this.initialization();
      return this.apull({key: "loadSector", val: this.identify});
    }
  },
  watch: {
    identify: {
      handler: function(to) {
        this.$emit("update:identify", to);
      },
      immediate: true
    }
  }
};
</script>
