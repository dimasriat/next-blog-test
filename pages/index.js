import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export default function HomePage(props) {
	const posts =
		props.posts &&
		props.posts.map((post) => (
			<div key={post.slug} style={{ borderTop: "1px solid black" }}>
				<h3>{post.frontmatter.title}</h3>
				<p>
					<ReactMarkdown source={post.markdownBody} />
				</p>
				<p style={{ color: "crimson" }}>{JSON.stringify(post)}</p>
			</div>
		));

	return (
		<div>
			<h1>Hello Cukk</h1>
			{posts}
		</div>
	);
}

export async function getStaticProps() {
	const context = require.context("../posts", true, /\.md$/);
	const keys = context.keys();
	const values = keys.map(context);
	const posts = keys.map((key, index) => {
		const slug = key
			.replace(/^.*[\\\/]/, "")
			.split(".")
			.slice(0, -1)
			.join(".");

		const value = values[index];
		const document = matter(value.default);
		return {
			frontmatter: document.data,
			markdownBody: document.content,
			slug,
		};
	});
	return { props: { posts } };
}
