<template>
  <div class="app-settings">
  <nav id="navbar-example2" class="navbar navbar-light bg-light px-3">
    <a class="navbar-brand" href="#">Navbar</a>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#scrollspyHeading1" @click.prevent="goto">Main</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#scrollspyHeading2" @click.prevent="goto">Layout</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" @click.prevent="goto">Advanced</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#scrollspyHeading3" @click.prevent="goto">Custom Code</a></li>
          <li><a class="dropdown-item" href="#scrollspyHeading4" @click.prevent="goto">Debugging</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#scrollspyHeading5" @click.prevent="goto">Permissions</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0">
    <h4 id="scrollspyHeading1">Main settings</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
    <h4 id="scrollspyHeading2">Layout settings</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
    <h4 id="scrollspyHeading3">Custom Code settings</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
    <h4 id="scrollspyHeading4">Debugging settings</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
    <h4 id="scrollspyHeading5">Permission settings</h4>
    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
  </div>
  </div>
</template>

<script>
import { onMounted, defineComponent } from 'vue'

export default defineComponent({
  name: 'Settings',
  data () {
    return {
    };
  },
  methods: {
    goto() {
      document.querySelector('#scrollspyHeading2').scrollIntoView({behavior: 'smooth'});
    }
  }
});
</script>

<style lang="css" scoped>
.scrollspy-example {
  position: relative;
  height: 200px;
  margin-top: .5rem;
  overflow: auto;
}
</style>
