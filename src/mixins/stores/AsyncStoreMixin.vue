<script>
import SnackbarMixin from "@/mixins/SnackbarMixin.vue"

export default {
  mixins: [SnackbarMixin],
  methods: {
    async apull(pair, success = null, error = null, then = null) {
      let self = this;

      await this.$store
        .dispatch(pair.key, pair.val)
        .then(function() {
          if (success != null) success();
          self.updateToken();
        })
        .catch(function(e) {
          if (error != null) error(e);
          self.error(self.type, e.toString());

          self.checkLogout(e.response.status);
        })
        .then(function() {
          if (then != null) then();
        });
    },
    async adelete(subpath, payload, success = null, error = null, then = null) {
      let self = this;
      await this.axios
        .delete(this.$store.state.api + subpath, {
          data: {
            token: this.$store.state.admin.token,
            ...payload
          }
        })
        .then(function(r) {
          if (success != null) success(r);
          if (r.status === 200) {
            self.updateToken();
            self.snack("Removed", "is-success", 2000);
          }
        })
        .catch(function(e) {
          if (error != null) error(e);
          self.error(self.type, e.toString());

          self.checkLogout(e.response.status);
        })
        .then(function() {
          if (then != null) then();
        });
    },
    async commit(
      subpath,
      payload,
      type = "post",
      success = null,
      error = null,
      then = null
    ) {
      if (typeof success == "function")
        success = { call: success, replace: true };

      let self = this;
      await this.axios({
        method: type,
        url: this.$store.state.api + subpath,
        data: {
          token: this.$store.state.admin.token,
          ...payload
        }
      })
        .then(function(r) {
          if (r.status == 200) {
            if (success != null) {
              success.call(r);
            }
            if (success != null && !success.replace) {
              self.snack("Saved", "is-success", 2000);
            }
          }
        })
        .catch(function(e) {
          if (error != null) error(e);
          else self.error(self.type, e.toString());
        })
        .then(function() {
          if (then != null) then();
        });
    }
  }
};
</script>
