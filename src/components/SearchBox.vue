<template>
    <div class="search-box">
        <input
            type="text"
            class="search-input"
            placeholder="输入你要搜索的内容"
            :value="modelValue"
            @input="oninput"
        />

        <el-button type="primary" round size="small" @click="confirm"
            >搜索</el-button
        >
        <el-button type="info" round size="small" @click="clear"
            >清除</el-button
        >
    </div>
</template>
<script>
export default {
    props: ["modelValue"],
    emits: ["update:modelValue", "search"],
    data() {
        return {
            searchContent: "",
        }
    },
    methods: {
        confirm() {
            this.$emit("search")
        },
        clear() {
            // 清除搜索框
            this.$emit("update:modelValue", "")
            this.$emit("search")
        },
        oninput(event) {
            this.$emit("update:modelValue", event.currentTarget.value)
        },
    },
}
</script>
<style scoped>
.search-box {
    display: flex;
    gap: 10px;
}

.search-input {
    flex: 1;

    padding: 5px 10px;

    border: none;
    outline: none;

    /* 两端变圆 */
    border-radius: 999999px;
}
</style>
