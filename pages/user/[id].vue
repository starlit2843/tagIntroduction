<template>
 
              <div class="flex flex-col gap-4">
                <p class="text-4xl text-gray-600 font-semibold">陳乃嘉</p>
                <p class="text-xl text-gray-600 font-semibold">@{{ id }}</p>
              </div>

  </template>
  
  
    
  <script setup>
    const route = useRoute()
    const { id } = route.params
  </script>
  
  