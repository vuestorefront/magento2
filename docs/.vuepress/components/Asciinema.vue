<template>
  <div ref="container">
    <a :href="'https://asciinema.org/a/' + id" target="_blank">
      <img :src="'https://asciinema.org/a/' + id + '.svg'" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'Asciinema',
  props: {
    id: String,
  },
  mounted() {
    const container = this.$refs.container;

    if (!container) return;

    container.removeChild(container.firstChild);

    const script = window.document.createElement('script');

    script.id = 'asciicast-' + this.id;
    script.src = 'https://asciinema.org/a/' + this.id + '.js';
    script.async = true;

    container.appendChild(script);
  },
};
</script>
