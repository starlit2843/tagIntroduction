<template>
    <div v-if="inner_button_amount === 0">
        <!--藍綠色按鈕-->
        <div class="flex justify-center" v-if="type == 'b'">
            <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="clicked">
                <span class="text-[2vw] text-white min-[300px]:text-xl">{{ content }}</span>
            </button>
        </div>

        <!--灰色按鈕-->
        <div class="flex justify-center" v-if="type == 'g'">
            <button class="bg-base-100 shadow-numo-modal place-self-center rounded-10 px-4 py-2" @click="clicked">
                <span class=" text-white text-sm">{{ content }}</span>
            </button>
        </div>
    </div>

    <div>

    </div>
</template>

<script setup>
    import { defineProps, ref, defineEmits } from 'vue';
    const emit = defineEmits();

    const props = defineProps({
        inner_button_amount: {
            type: Number,
            required: false,
            default: 0
        },
        inner_button_set: {
            type: Object,
            required: false,
        },
        type: {
            type: String,
            required: true,
            default: 0
        },
        content: {
            type: String,
            required: true
        },
        function: {
            type: String,
            required: true
        },
        changeto: {
            type: String,
            required: false
        }
    });

    function clicked(){
        if (props.function === "next_step") {
            emit("next_step");
        }else if(props.function === "change"){
            change();
        }
    }

    function change(){
        //
        //之後改成switch
        if(props.changeto === "checkRegister"){
            alert("您尚未註冊！");
        }else if(props.changeto === "endTutorial"){
            alert("移動到設置限時連結");
        }
    }
</script>