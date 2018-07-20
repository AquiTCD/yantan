<template lang="pug">
  section
    hero
    lead
    concepts
    features
    info
</template>

<script>
import Hero from '~/components/Hero.vue'
import Lead from '~/components/Lead.vue'
import Concepts from '~/components/Concepts.vue'
import Features from '~/components/Features.vue'
import Info from '~/components/Info.vue'

export default {
  components: {
    Hero,
    Lead,
    Concepts,
    Features,
    Info,
  },
}
</script>

<style lang="sass" scoped>

</style>
