<template>
    <div class="container">
        <h1 class="title">三眼鸭的消息墙</h1>
        <div class="posts">
            <Post
                v-for="post of posts"
                :postId="post.post_id"
                :content="post.content"
                :publishTime="post.publish_time"
            ></Post>
        </div>
    </div>
</template>

<script>
import Post from "./components/Post.vue"

export default {
    components: { Post },
    data() {
        return {
            posts: [],
        }
    },
    mounted() {
        // 我是test test
        this.getPosts()
    },
    methods: {
        async getPosts() {
            ;({ results: this.posts } = await this.$api.getPosts())

            console.log(this.posts)
        },
    },
}
</script>

<!-- scoped 会限制 sfc 文件 -->
<!-- 的样式只能作用于当前文件 -->
<style scoped>
.container {
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    padding: 0 20px;
}

.container .search-box {
    display: flex;
    gap: 10px;
}

.container .search-input {
    flex: 1;

    padding: 5px 10px;

    border: none;
    outline: none;

    /* 两端变圆 */
    border-radius: 999999px;
}

.container .input-dialog .bottom .buttons {
    opacity: 1;
}

.container .input-dialog .bottom {
    justify-content: flex-end;
}

.container .title {
    color: white;
}

.container .empty {
    color: #aaa;
    font-size: 20px;

    margin: 80px 0;

    text-align: center;
}
</style>
