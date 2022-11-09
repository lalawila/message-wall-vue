<template>
    <div class="post">
        <template v-if="isEdit">
            <!-- 编辑状态 -->
            <textarea class="input-content" v-model="postContent"></textarea>
            <div class="bottom">
                <p class="time">{{ formatTime(publishTime) }}</p>
                <div class="buttons">
                    <el-button
                        type="primary"
                        round
                        size="small"
                        @click="confirmEdit"
                        >确认</el-button
                    >
                    <el-button type="info" round size="small" @click="cancel"
                        >取消</el-button
                    >
                </div>
            </div>
        </template>
        <template v-else>
            <!-- 正常状态 -->
            <div class="content">{{ postContent }}</div>
            <div class="bottom">
                <p class="time">{{ formatTime(publishTime) }}</p>
                <div class="buttons">
                    <el-button type="primary" round size="small" @click="edit"
                        >编辑</el-button
                    >

                    <el-popconfirm
                        title="确认删除消息吗？"
                        confirm-button-text="是"
                        cancel-button-text="否"
                        @confirm="remove"
                        width="180"
                    >
                        <template #reference>
                            <el-button type="danger" round size="small"
                                >删除</el-button
                            >
                        </template>
                    </el-popconfirm>
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
            // 防止去修改 props 的属性
            postContent: this.content,
        }
    },
    methods: {
        edit() {
            // 切换到编辑状态
            this.isEdit = true
        },
        async remove() {
            await this.$api.deletePost(this.postId)
            this.$el.remove()
            this.$MyAlert.alertSuccess("删除成功~")
        },
        async confirmEdit() {
            // 确认编辑
            await this.$api.updatePost(this.postId, this.postContent)

            this.isEdit = false

            this.$MyAlert.alertSuccess("修改成功~")
        },
        cancel() {
            // 取消编辑
            this.isEdit = false
        },
        formatTime(timestamp) {
            // 时间戳转成时间
            const time = new Date(timestamp * 1000)
            return `${time.getFullYear()}-${this.fillZero(
                time.getMonth() + 1
            )}-${time.getDate()} ${this.fillZero(
                time.getHours()
            )}:${this.fillZero(time.getMinutes())}`
        },
        fillZero(n) {
            return n < 10 ? `0${n}` : n
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
