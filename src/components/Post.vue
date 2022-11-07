<template>
    <div class="post">
        <template v-if="isEdit">
            <!-- 编辑状态 -->
            <textarea class="input-content" v-model="content"></textarea>
            <div class="bottom">
                <p class="time">{{ publishTime }}</p>
                <div class="buttons">
                    <div class="button edit" @click="confirmEdit">确认</div>
                    <div class="button cancel" @click="cancel">取消</div>
                </div>
            </div>
        </template>
        <template v-else>
            <!-- 正常状态 -->
            <div class="content">{{ content }}</div>
            <div class="bottom">
                <p class="time">{{ publishTime }}</p>
                <div class="buttons">
                    <div class="button edit" @click="edit">编辑</div>
                    <div class="button delete" @click="remove">删除</div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: ["postId", "content", "publishTime"],
    data() {
        return {
            isEdit: false,
        }
    },
    methods: {
        edit() {
            // 切换到编辑状态
            this.isEdit = true
        },
        async remove() {
            if (confirm("确认删除消息吗？")) {
                await this.$api.deletePost(this.postId)
                this.$el.remove()
            }
        },
        confirmEdit() {
            // 确认编辑
        },
        cancel() {
            // 取消编辑
            this.isEdit = false
        },
    },
}
</script>
<style scoped>
p {
    margin: 0;
}

.post {
    background-color: #0f0f0f;
    padding: 20px;
    border-radius: 16px;

    margin: 20px 0;
}

.button {
    cursor: pointer;

    padding: 5px 10px;
    /* 两端变圆 */
    border-radius: 999999px;

    user-select: none;
}

.post .content {
    color: white;

    margin-bottom: 20px;
}

.post .bottom {
    color: white;
    font-size: 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post .bottom .buttons {
    display: flex;
    /* 子项的间距 */
    gap: 10px;

    opacity: 0;

    transition: opacity 0.5s;
}

.post:hover .bottom .buttons {
    opacity: 1;
}

@media (max-width: 768px) {
    /* 手机模式下常驻显示 */
    .post .bottom .buttons {
        opacity: 0.5;
    }
}

.post .bottom .buttons .edit {
    background-color: teal;
}

.post .bottom .buttons .delete {
    background-color: orangered;
}

.post .bottom .buttons .confirm {
    background-color: teal;
}

.cancel {
    background-color: gray;
}

.publish {
    width: 60px;
    height: 60px;

    background-color: teal;
    color: white;

    font-weight: bold;
    border-radius: 50%;

    /* 方法一 */
    /* text-align: center; */
    /* 字会在一行居中 */
    /* line-height: 60px; */

    /* 方法二 */
    display: flex;
    /* 水平 */
    justify-content: center;
    /* 垂直 */
    align-items: center;

    position: fixed;
    bottom: 20px;
    right: 20px;

    cursor: pointer;

    /* 禁止选中文本 */
    user-select: none;
}

.post .time {
    color: #aaa;
}

.post .input-content {
    width: 100%;
    height: 100px;

    margin-bottom: 20px;

    outline: none;
    border: none;
    background-color: #aaa;

    padding: 10px;

    border-radius: 6px;
}
</style>
