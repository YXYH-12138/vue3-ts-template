<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<p>
			For a guide and recipes on how to configure / customize this project,<br />
			check out the
			<a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
		</p>
		<h3>Installed CLI Plugins</h3>
		<ul>
			<li>
				<el-link
					type="primary"
					href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
					target="_blank"
					rel="noopener"
					>babel</el-link
				>
			</li>
			<li>
				<el-link
					type="primary"
					href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
					target="_blank"
					rel="noopener"
					>router</el-link
				>
			</li>
			<li>
				<el-link
					type="primary"
					href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
					target="_blank"
					rel="noopener"
					>eslint</el-link
				>
			</li>
			<li>
				<el-link
					type="primary"
					href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
					target="_blank"
					rel="noopener"
					>typescript</el-link
				>
			</li>
		</ul>
		<h3>Essential Links</h3>
		<ul>
			<li>
				<el-link type="primary" href="https://vuejs.org" target="_blank" rel="noopener"
					>Core Docs</el-link
				>
			</li>
			<li>
				<el-link type="primary" href="https://forum.vuejs.org" target="_blank" rel="noopener"
					>Forum</el-link
				>
			</li>
			<li>
				<el-link type="primary" href="https://chat.vuejs.org" target="_blank" rel="noopener"
					>Community Chat</el-link
				>
			</li>
			<li>
				<el-link type="primary" href="https://twitter.com/vuejs" target="_blank" rel="noopener"
					>Twitter</el-link
				>
			</li>
			<li>
				<el-link type="primary" href="https://news.vuejs.org" target="_blank" rel="noopener"
					>News</el-link
				>
			</li>
		</ul>
		<h3>Ecosystem</h3>
		<ul>
			<li>
				<el-link type="primary" href="https://router.vuejs.org" target="_blank" rel="noopener"
					>vue-router</el-link
				>
			</li>
			<li>
				<el-link type="primary" href="https://vuex.vuejs.org" target="_blank" rel="noopener"
					>vuex</el-link
				>
			</li>
			<li>
				<el-link
					type="primary"
					href="https://github.com/vuejs/vue-devtools#vue-devtools"
					target="_blank"
					rel="noopener"
					>vue-devtools</el-link
				>
			</li>
			<li>
				<el-link type="primary" href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
					>vue-loader</el-link
				>
			</li>
			<li>
				<el-link
					type="primary"
					href="https://github.com/vuejs/awesome-vue"
					target="_blank"
					rel="noopener"
					>awesome-vue</el-link
				>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "HelloWorld",
	props: {
		msg: String
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
</style>
