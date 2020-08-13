<template>
  <div>
    <button class='k-primary' @click="onClick">Add Critter</button>
    <div id="overlay"></div>
  </div>
</template>

<script>

export default {
  name: 'AddCritter',
  methods: {
    onClick: (ev) => {
      console.log('clicked!');
    },
  },

};
</script>

<style lang="scss">
#overlay {
  display:none;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>
