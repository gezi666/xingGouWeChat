<template>
    <div class="star">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" ></span>
    </div>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        props: ['score'],
        computed: {
            itemClasses () {
                let result = [];
                let score = Math.floor(this.score * 2) / 4;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }

                return result;
            }
        }
    };
</script>

<style scoped>
    .star{
        font-size:0;
    }
    .star-item{
        display:inline-block;
        background-repeat:no-repeat;
    }
    .star-item{
        width: 9px;
        height: 9px;
        margin-right:1px;
    }
    .star-item:last-child{
        margin-right:0;
    }
    .star-item.on{
        background:url(../../../static/img/star-on.png) no-repeat;
        background-size:100% 100%;
    }
    .star-item.half{
        background:url(../../../static/img/star-half.png) no-repeat;
        background-size:100% 100%;
    }
    .star-item.off{
        background:url(../../../static/img/star-off.png) no-repeat;
        background-size:100% 100%;
    }
</style>
