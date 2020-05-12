<template>
  <div id="time-container">
    <span style="display:block;">
      <input type="range" multiple value="0,24" min="0" max="24" style="--size:50%"/>
    </span>
    <span style="display:block;">
      <span>||||||||||||||||||||||||</span>
    </span>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'TimeFilter',
};

$('.original').hover(() => {
  console.log($('.original').value);
  console.log('hello');
});
$('.ghost').hover(() => {
  console.log($('.original').value);
  console.log('hello');
});

$('.original').on('input change', () => {
  console.log('hello');
});
$('.ghost').on('input change', () => {
  console.log('hello');
});
</script>

<style lang="scss">
  @import '../styles/multirange.css';

body.darkmode--activated input.original {
  background: black;
}
</style>
