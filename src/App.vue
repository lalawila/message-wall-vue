<template>
    <div class="container">
        <h1 class="title">三眼鸭的消息墙</h1>
        <SearchBox v-model="search" @search="onsearch"></SearchBox>
        <PublishBox @published="getPosts(true)"></PublishBox>
        <div class="posts">
            <Post
                v-for="post of posts"
                :postId="post.post_id"
                :content="post.content"
                :publishTime="post.publish_time"
            ></Post>
        </div>
        <p v-show="isFinished" class="empty">已经没有更多消息了~</p>
    </div>
</template>

<script>
import Post from "./components/Post.vue"
import SearchBox from "./components/SearchBox.vue"
import PublishBox from "./components/PublishBox.vue"

export default {
    components: { Post, PublishBox, SearchBox },
    data() {
        return {
            isLoading: false, // 是否正在加载数据
            isFinished: false, // 是否完全加载数据
            page: 1, // 第几页
            limit: 5, // 每次拿的数据量
            search:
                new URL(window.location.href).searchParams.get("search") || "", // 搜索的关键字
            posts: [],
        }
    },
    mounted() {
        // 监听滚动事件
        window.addEventListener("scroll", this.onscroll)

        this.getPosts()
    },
    unmounted() {
        // 移除滚动事件
        window.removeEventListener("scroll", this.onscroll)
    },
    methods: {
        async getPosts(refresh = false) {
            if (refresh) {
                // 刷新页面
                this.isFinished = false
                this.page = 1

                this.posts = []
            }

            if (this.isLoading || this.isFinished) {
                // 如果在加载中，或没有数据了，则直接退出
                return
            }

            this.isLoading = true
            const { results } = await this.$api.getPosts({
                page: this.page,
                limit: this.limit,
                search: this.search,
            })

            this.isLoading = false

            if (results.length === 0) {
                // 已经没有更多了
                this.isFinished = true
                return
            }

            // this.posts = this.posts.concat(results)
            this.posts = [...this.posts, ...results]

            this.page++

            if (!this.isScroll()) {
                // 如果没出现滚动条
                // 则继续拿数据
                return this.getPosts()
            }
        },
        isScroll() {
            // 是否出现了滚动条
            return (
                document.documentElement.clientHeight !=
                document.documentElement.scrollHeight
            )
        },
        onscroll() {
            // 滚动距离页面底部的距离
            // HTML 元素内容的整体高度 - （HTML 元素顶部滚动出的高度 + ）
            // 参考 https://3yya.com/courseware/chapter/211
            const bottomOfWindowHeight =
                document.documentElement.offsetHeight -
                (document.documentElement.scrollTop +
                    document.documentElement.clientHeight)

            if (bottomOfWindowHeight < 100) {
                // 页面距离底部小于 100 像素
                // 加载数据
                this.getPosts()
            }
        },
        onsearch() {
            const url = new URL(window.location.href)
            url.searchParams.set("search", this.search)
            // 替换 url 同时页面不会刷新
            history.replaceState("", "", url)
            // 刷新页面搜索
            this.getPosts(true)
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
