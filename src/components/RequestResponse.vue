<template>
    <div class="result">
        <div class="error" v-if="error">
            <strong>Sorry, but we have some errors :c</strong>
            <span>{{error.message}}</span>
        </div>

        <div class="loading" v-if="loading">
            <span class="loader"><span class="loader-inner"></span></span>
        </div>
    </div>
</template>


<script>

export default {
  name: "request",
  props: {
    loading: true,
    error: false
  },
  watch: {
    error: function(){
      var self = this;
      setTimeout(function(){
          self.error = false;
      }, 2000);
    }
  }
}

</script>

<style lang="scss">
.result{
  position: fixed;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  z-index: 2;
}

.loading,
.error{
  padding: 10px;
  border-radius: 5px;
}

.error{
  background-color: #ff4343cc;
  color: #fff;
  & strong {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
