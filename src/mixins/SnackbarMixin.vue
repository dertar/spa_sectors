<script>
export default {
  methods: {
    snack: function(msg, type = "is-danger", duration = 10000) {
      this.$snackbar.open({
        duration: duration,
        type: type,
        position: "is-bottom-right",
        queue: false,
        message: msg
      });
    },
    error: function(name, msg, duration = 10000) {
      this.snack(name + "->" + msg, "is-danger", duration);
    }
  }
};
</script>
