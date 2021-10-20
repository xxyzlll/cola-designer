<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {margin: 0;padding: 0;}
.hoverPointer:hover{cursor: pointer}
.formItemDiv{width: 100%;height: 30px;border-radius:4px;background-color: #fff;
  text-indent: 1em;font-size: 13px;cursor: pointer;color: #666}
*::-webkit-scrollbar {width: 5px;height: 5px;}
*::-webkit-scrollbar-thumb {border-radius: 6px;background: #5E708D;}
*::-webkit-scrollbar-track {border-radius: 6px;background: #ddd;}
</style>
