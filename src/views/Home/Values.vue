<script setup lang="ts">
import Values from './../../components/Home/Values.vue';
import Header from './../../components/Header.vue';
</script>

<template>
    <section>
        <Header :display="true" :banner="true"/>
        <Values />
    </section>
</template>