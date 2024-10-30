<template>
  <div
    class="absolute z-20 flex h-full w-full items-center justify-center overflow-hidden bg-base transition-opacity duration-3000"
    @click="handleClick()"
    :class="translateOpacity"
  >
    <div
      class="logo-rotation relative flex aspect-square cursor-pointer items-center justify-center rounded-circle bg-base p-5 shadow-numo-icon"
      :class="props.isActiveAnimation ? 'active-logo-rotation' : ''"
    >
      <div
        class="icon-out-container relative flex aspect-square w-full items-center justify-center rounded-circle border-0 bg-base shadow-open-nccu-active-inset"
      >
        <div
          class="icon-container relative grid aspect-square grid-cols-2 grid-rows-2 p-0"
          :class="props.isActiveAnimation ? 'w-[720px]' : 'w-[240px]'"
        >
          <!-- <LogoStable class="absolute" :class="animationAdd" /> -->
          <LogoMinus
            class="logo"
            :class="props.isActiveAnimation ? 'gpa-logo-minus' : ''"
          />
          <LogoMultiply
            class="logo"
            :class="props.isActiveAnimation ? 'gpa-logo-multiply' : ''"
          />
          <LogoAdd
            class="logo"
            :class="props.isActiveAnimation ? 'gpa-logo-addition' : ''"
          />
          <LogoDivide
            class="logo"
            :class="props.isActiveAnimation ? 'gpa-logo-division' : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// components
// import LogoStable from '~/assets/icon/Gpa/logo_stable.svg?component'
import LogoAdd from "~/assets/icon/Gpa/logo_add.svg?component";
import LogoMinus from "~/assets/icon/Gpa/logo_minus.svg?component";
import LogoMultiply from "~/assets/icon/Gpa/logo_multiply.svg?component";
import LogoDivide from "~/assets/icon/Gpa/logo_divide.svg?component";

const props = defineProps({
  isActiveAnimation: Boolean,
});
const emits = defineEmits(["handleClick"]);

const handleClick = () => {
  emits("handleClick");
};

const translateOpacity = computed(() => {
  if (props.isActiveAnimation) return "opacity-0";
  else return "opacity-100";
});

const animationAdd = computed(() => {
  if (props.isActiveAnimation) return "logo-animation";
  else return "";
});
</script>

<style scoped>
.active-logo-rotation {
  animation: logo-rotation 5s;
  animation-iteration-count: 1;
}

@keyframes logo-rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(90deg);
  }
}

.icon-out-container {
  @apply transition-all;
  transition-duration: 3s;
}
.icon-container {
  transition-property: width;
  transition-duration: 3s;
}

.logo {
  @apply z-30 col-span-1 h-full w-full;
  background-color: transparent;
  /* border: 1px solid #000; */
}

.gpa-logo-minus {
  animation: gpa-logo-minus 4s;
  animation-iteration-count: 1;
}

@keyframes gpa-logo-minus {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-200%);
  }
}

.gpa-logo-multiply {
  animation: gpa-logo-multiply 4s;
  animation-iteration-count: 1;
}

@keyframes gpa-logo-multiply {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(200%);
  }
}

.gpa-logo-division {
  animation: gpa-logo-division 4s;
  animation-iteration-count: 1;
}

@keyframes gpa-logo-division {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(200%);
  }
}

.gpa-logo-addition {
  animation: gpa-logo-addition 4s;
  animation-iteration-count: 1;
}

@keyframes gpa-logo-addition {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-200%);
  }
}
</style>
