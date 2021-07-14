<template>
    <div>
        <h1>Hello World</h1>
        <p>
            This is a Vue.js component that has a parameter named 'foobar' with a value specified of {{foobar}}.
        </p>
    </div>
</template>

<script>
export default {
  props: {
    foobar: String
  }
}
</script>

<style>

</style>
