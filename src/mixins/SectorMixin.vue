<script>
export default {
  props: {
    pId: {
      required: false,
      type: String
    },
    pType: {
      required: false,
      type: String
    }
  },
  data: function() {
    return {
      identify: null,
      type: null
    };
  },
  computed: {
    getData: function() {
      let data = this.$store.getters.getData(this.identify);
      return data != null ? data : null;
    }
  },
  methods: {
    getValue: function(key) {
      let data = this.getData;

      return data != null ? data[key] : null;
    }
  }
};
</script>
