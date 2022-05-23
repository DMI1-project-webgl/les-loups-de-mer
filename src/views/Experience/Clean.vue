<script setup lang="ts">
import Nav from './../../components/Nav.vue';
import Canvas from './.././../components/Experience/Canvas.vue';
import Draggable from './../../components/Experience/Draggable.vue';
import Breadcrumb from './../../components/Experience/Breadcrumb.vue';
import Progress from './../../components/Experience/Progress.vue';
import Scoreboard from './../../components/Experience/Scoreboard.vue';
</script>

<template>
  <!-- <Scoreboard /> -->
  <section id="clean" class="page-experience clean no">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 h-100 px-0">
          <div class="clear--data-container ">
            <Scoreboard nbBottle="3" maxBottle="3" nbTrash="3" maxTrash="3" nbCan="0" maxCan="3" nbButt="0" maxButt="3" nbPlastic="3" maxPlastic="3"/>
            <div class="clean--img-container">
              <img src="" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.clear--data-container  {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 25%;
}
.clean--img-container {
  color: white;
  width: 100%;
  padding-right: 15%;
}
.clean--img-container img{ 
  aspect-ratio: 1/1;
  width: 100%;
  margin-right: 15%;
  border: 1px solid green;
}
</style>